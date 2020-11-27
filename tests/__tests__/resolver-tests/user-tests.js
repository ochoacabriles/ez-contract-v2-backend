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
import userMutations from '../../../graphql/resolvers/user/mutations';

// Import relevant models
import { User, Product } from '../../../db/models';

// Import relevant seeders
import users from '../../../db/seeds/users.json';
import products from '../../../db/seeds/products.json';

describe('Testing users resolvers', () => {
  // Actions to take before all tests
  // No need to change it
  beforeAll(async () => {
    await createDBConnection();
  });

  // Actions to take before each test
  beforeEach(async () => {
    await User.insertMany(users);
  });

  // Actions to take after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Actions to take after all tests
  // No need to change it
  afterAll(async () => {
    await stopDBConnection();
  });

  it('Testing userAddProductToCart mutation', async () => {
    await Product.insertMany(products);

    // Test successful request
    const [{ _id: userId, cart }] = users;
    const [{ _id: productId }] = products;
    const quantity = 2;

    const cartProductToAdd = {
      product: productId,
      quantity
    };

    const user = await userMutations.userAddProductToCart(null, { cartProductToAdd }, { userId });
    const expectedLenght = cart ? cart.length + 1 : 1;
    expect(user.cart.length).toEqual(expectedLenght);
    const cartProduct = user.cart[user.cart.length - 1];
    expect(cartProduct.product.id.toString()).toEqual(productId);
    expect(cartProduct.quantity).toEqual(quantity);

    // Should throw if there is a try to add product which is already in the cart
    try {
      await userMutations.userAddProductToCart(null, { cartProductToAdd }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('productIsAlreadyInCart');
    }

    await Product.deleteMany();
  });

  it('Testing userRemoveProductFromCart mutation', async () => {
    await Product.insertMany(products);

    // Add a product to remove it then
    // Test successful request
    const [{ _id: userId, cart }] = users;
    const [{ _id: productId }] = products;
    const quantity = 2;

    const cartProductToAdd = {
      product: productId,
      quantity
    };

    await userMutations.userAddProductToCart(null, { cartProductToAdd }, { userId });

    const user = await userMutations.userRemoveProductFromCart(null, { productId }, { userId });
    const expectedLenght = cart ? cart.length : 0;
    expect(user.cart.length).toEqual(expectedLenght);
    const cartProducts = user.cart?.map(cartProduct => cartProduct.product);
    expect(cartProducts.includes(productId)).toEqual(false);

    // Should throw is product is not in cart
    try {
      await userMutations.userRemoveProductFromCart(null, { productId }, { userId });
    } catch (err) {
      expect(err.message).toEqual('productIsNotInCart');
    }

    await Product.deleteMany();
  });

  it('Testing userUpdateCartProductQuantity mutation', async () => {
    await Product.insertMany(products);

    // Add a product to remove it then
    // Test successful request
    const [{ _id: userId, cart }] = users;
    let [{ _id: productId }] = products;

    const cartProductToAdd = {
      product: productId
    };

    await userMutations.userAddProductToCart(null, { cartProductToAdd }, { userId });

    // Test successful request
    const quantity = 5;
    const cartProductToUpdate = {
      product: productId,
      quantity
    };

    const user = await userMutations.userUpdateCartProductQuantity(null, { cartProductToUpdate }, { userId });
    const expectedLength = cart ? cart.length + 1 : 1;
    expect(user.cart.length).toEqual(expectedLength);
    const cartProduct = user.cart[user.cart.length - 1];
    expect(cartProduct.product.id.toString()).toEqual(productId);
    expect(cartProduct.quantity).toEqual(quantity);

    // Should throw if product is not in cart
    productId = '000000000000000000000000';
    cartProductToUpdate.product = productId;
    try {
      await userMutations.userUpdateCartProductQuantity(null, { cartProductToUpdate }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('productIsNotInCart');
    }

    await Product.deleteMany();
  })

});
