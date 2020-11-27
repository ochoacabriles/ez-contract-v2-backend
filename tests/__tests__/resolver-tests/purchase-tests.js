// It's required to fill seeders to be able to run tests

/*
  Test file for one resolver.
  Should include tests for any resolvers with related to a specific collection,
  specially if they are complicated queries.

  If a resolver has queries related to two or more collections,
  its test should be related to the main collection involved.

  The name of the file should be collectionName-tests.js

  If there are new queries or mutations in an existent resolver,
  the tests should be added to its already defined test file
  to avoid redundancy.
*/

// Import MongoDB memory server handler
import { createDBConnection, stopDBConnection } from '../../memory-db-server';

// Import resolvers to test
import purchaseQueries from '../../../graphql/resolvers/purchase/queries';
import purchaseMutations from '../../../graphql/resolvers/purchase/mutations';

// Import relevant models
import { Purchase, Product, User, Vendor } from '../../../db/models';

// Import relevant seeders
import purchases from '../../../db/seeds/purchases.json';
import products from '../../../db/seeds/products.json';
import users from '../../../db/seeds/users.json';
import vendors from '../../../db/seeds/vendors.json';

// Mock relevant functions
jest.mock('../../../utils/braintree');

describe('Testing purchases resolvers', () => {
  // Actions to take before all tests
  // No need to change it
  beforeAll(async () => {
    await createDBConnection();
  });

  // Actions to take before each test
  beforeEach(async () => {
    await Purchase.insertMany(purchases);
  });

  // Actions to take after each test
  afterEach(async () => {
    await Purchase.deleteMany({});
  });


  // Actions to take after all tests
  // No need to change it
  afterAll(async () => {
    await stopDBConnection();
  });

  it('Testing purchaseAdd mutation', async () => {
    await Product.insertMany(products);
    await User.insertMany(users);

    // Should throw if cart is empty
    const [{ _id: userId }] = users; 
    try {
      await purchaseMutations.purchaseAdd(null, {}, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('cartIsEmpty');
    }

    // Test out of stock error
    const [{ _id: product, stock }] = products;
    const quantity = stock + 1;

    let cart = [
      {
        product,
        quantity
      }
    ];

    await User.findByIdAndUpdate(userId, { $set: { cart } });

    try {
      await purchaseMutations.purchaseAdd(null, {}, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('emptyPurchase');
    }

    // Test successful request
    const [
      { _id: productId_1, price: price_1, stock: stock_1 }, 
      { _id: productId_2, price: price_2, stock: stock_2 },
      { _id: productId_3, price: price_3, stock: stock_3 }
    ] = products;
    
    const quantity_1 = stock_1 > 2 ? 2 : stock_1;
    const quantity_2 = stock_2 > 3 ? 3 : stock_2;
    // product_3 will be out of stock
    const quantity_3 = stock_3 + 1;

    cart = [
      {
        product: productId_1,
        quantity: quantity_1
      },
      {
        product: productId_2,
        quantity: quantity_2
      },
      {
        product: productId_3,
        quantity: quantity_3
      }
    ];

    await User.findByIdAndUpdate(userId, { $set: { cart } });

    const purchase = await purchaseMutations.purchaseAdd(null, {}, { userId });
    const expectedBasePrice = quantity_1 * price_1 + quantity_2 * price_2;
    expect(purchase.status).toEqual('created');
    expect(purchase.basePrice).toEqual(expectedBasePrice);
    // product_3 shouldn't be in products as it's out of stock
    expect(purchase.products.length).toEqual(cart.length - 1);
    expect(purchase.outOfStockProducts.length).toEqual(1);
    expect(purchase.outOfStockProducts[0].id.toString()).toEqual(productId_3);
    // Check if cart is empty
    const user = await User.findById(userId);
    expect(user.cart.length).toEqual(0);
    // Check if stocks were properly updated
    const [{ stock: updatedStock_1 }, { stock: updatedStock_2 }] =
      await Product.find({ _id: { $in: [productId_1, productId_2]}}).sort({ _id: 1 });
    expect(updatedStock_1).toEqual(stock_1 - quantity_1);
    expect(updatedStock_2).toEqual(stock_2 - quantity_2);
    
    await Product.deleteMany();
    await User.deleteMany();
  });

  it('Testing purchasePaymentProcess mutation', async () => {
    await Product.insertMany(products);
    await User.insertMany(users);

    const res = {
      app: {
        get: (key) => key
      }
    };

    // Should not create confirmationCodes if payment is not settled
    // Braintree mock has been implemented to only return settled if nonce is 'settled'
    const [{ _id: purchaseId }] = purchases;
    let nonce = 'nonce';
    let purchase = await purchaseMutations.purchasePaymentProcess(null, { purchaseId, nonce }, { res });
    expect(purchase.payment.method).toEqual('credit_card');
    expect(purchase.payment.status).toEqual('processor_declined');
    purchase.products.forEach(product => {
      expect(product.confirmationCode).toBeUndefined();
    });

    // Should create confirmationCodes if payment is settled
    nonce = 'settled';
    purchase = await purchaseMutations.purchasePaymentProcess(null, { purchaseId, nonce }, { res });
    expect(purchase.payment.method).toEqual('credit_card');
    expect(purchase.payment.status).toEqual('settled');
    purchase.products.forEach(product => {
      expect(product.confirmationCode).toBeTruthy();
    });

    await Product.deleteMany();
    await User.deleteMany();
  });

  it('Testing purchasesOfUser query', async () => {
    await Product.insertMany(products);
    await User.insertMany(users);

    const [{ user: userId }] = purchases;
    let status = 'created';
    let [results, count] = await purchaseQueries.purchasesOfUser(null, { status }, { userId });
    let expectedResults = purchases.filter(purchase => purchase.user === userId && purchase.status === status);
    expect(count).toEqual(expectedResults.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedResults[index]._id);
    });

    status = 'paid';
    ([results, count] = await purchaseQueries.purchasesOfUser(null, { status }, { userId }));
    expectedResults = purchases.filter(purchase => purchase.user === userId && purchase.status === status);
    expect(count).toEqual(expectedResults.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedResults[index]._id);
    });

    await Product.deleteMany();
    await User.deleteMany();
  });

  it('Testing productDelivery mutation', async () => {
    await Product.insertMany(products);
    await User.insertMany(users);
    await Vendor.insertMany(vendors);

    // Select a paid purchase with an undelivered product
    const [purchase] = purchases.filter(item => item.status === 'paid');
    const { _id: purchaseId, products: [{ confirmationCode, vendor }] } = purchase;
    const [{ admins }] = vendors.filter(item => item._id === vendor);

    // Select a user who is admin for this vendor
    const [{ _id: userId }] = users.filter(user => admins.includes(user._id));

    // Test successful request
    const updatedPurchase = await purchaseMutations.purchaseProductDeliver(null, { purchaseId, confirmationCode }, { userId });
    expect(updatedPurchase.products[0].isDelivered).toEqual(true);

    // Test invalid code
    const wrongConfirmationCode = '000000000000000000000000';
    try {
      await purchaseMutations.purchaseProductDeliver(null, { purchaseId, confirmationCode: wrongConfirmationCode }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('invalidCode');
    }

    // Test already delivered product
    try {
      await purchaseMutations.purchaseProductDeliver(null, { purchaseId, confirmationCode }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('alreadyDelivered');
    }

    await Product.deleteMany();
    await User.deleteMany();
    await Vendor.deleteMany();
  })
});
