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
import productQueries from '../../../graphql/resolvers/product/queries';
import productMutations from '../../../graphql/resolvers/product/mutations';

// Import relevant models
import { Product, Brand, Category, City, User, Vendor } from '../../../db/models';

// Import relevant seeders
import products from '../../../db/seeds/products.json';
import brands from '../../../db/seeds/brands.json';
import categories from '../../../db/seeds/categories.json';
import cities from '../../../db/seeds/cities.json';
import users from '../../../db/seeds/users.json';
import vendors from '../../../db/seeds/vendors.json';

describe('Testing products resolvers', () => {
  // Actions to take before all tests
  // No need to change it
  beforeAll(async () => {
    await createDBConnection();
  });

  // Actions to take before each test
  beforeEach(async () => {
    await Product.insertMany(products);
  });

  // Actions to take after each test
  afterEach(async () => {
    await Product.deleteMany({});
  });

  // Actions to take after all tests
  // No need to change it
  afterAll(async () => {
    await stopDBConnection();
  });

  it('Testing products query', async () => {
    // This query will return only active products because it's a public query
    let expectedProducts = products.filter(product => product.isActive);
    // Test query without filters
    let [results, count] = await productQueries.products(null, {});
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    });

    // Test query with vendorId
    let [{ _id: vendorId }] = vendors;
    expectedProducts = products.filter(product => product.isActive && product.vendor === vendorId);
    ([results, count] = await productQueries.products(null, { vendorId }));
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    });

    // Test query with minPrice
    const minPrice = 100;
    expectedProducts = products.filter(product => product.isActive && product.price >= minPrice);
    ([results, count] = await productQueries.products(null, { minPrice }));
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    });

    // Test query with maxPrice
    const maxPrice = 100;
    expectedProducts = products.filter(product => product.isActive && product.price <= maxPrice);
    ([results, count] = await productQueries.products(null, { maxPrice }));
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    });

    // Test query with nameSearch
    const nameSearch = 'Car';
    expectedProducts = products.filter(product => product.isActive && product.name.toLowerCase().includes(nameSearch.toLowerCase()));
    ([results, count] = await productQueries.products(null, { nameSearch }));
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    }); 

    // Test query with categoryId
    const [{ _id: categoryId }] = categories;
    expectedProducts = products.filter(product => product.isActive && product.category === categoryId);
    ([results, count] = await productQueries.products(null, { categoryId }));
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    }); 

    // Test query with brandId
    const [{ _id: brandId }] = brands;
    expectedProducts = products.filter(product => product.isActive && product.brand === brandId);
    ([results, count] = await productQueries.products(null, { brandId }));
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    });

    // Test query with cityIds
    const [{ _id: cityId1 }, { _id: cityId2 }] = cities;
    const cityIds = [cityId1, cityId2];
    expectedProducts = products.filter(product => product.isActive && (cityIds.includes(product.city)));
    ([results, count] = await productQueries.products(null, { cityIds }));
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    });    

    // Test empty results
    vendorId = '000000000000000000000000';
    ([results, count] = await productQueries.products(null, { vendorId }));
    expect(count).toEqual(0);
    expect(results.length).toEqual(0);
  });

  it('Testing productsByVendorForAdmins query', async () => {
    await Vendor.insertMany(vendors);

    let [{ _id: vendorId, admins: [userId] }] = vendors;
    // Test successful query without isActive filter
    let expectedProducts = products.filter(product => product.vendor === vendorId);
    let [results, count] = await productQueries.productsByVendorForAdmins(null, { vendorId }, { userId });
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    });

    // Test successful query, only active products
    expectedProducts = products.filter(product => product.vendor === vendorId && product.isActive);
    [results, count] = await productQueries.productsByVendorForAdmins(null, { vendorId, isActive: true }, { userId });
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    });    

    // Test successful query, only inactive products
    expectedProducts = products.filter(product => product.vendor === vendorId && !product.isActive);
    [results, count] = await productQueries.productsByVendorForAdmins(null, { vendorId, isActive: false }, { userId });
    expect(count).toEqual(expectedProducts.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedProducts[index]._id);
    });

    // Test if user is not an admin
    userId = '000000000000000000000000';
    try {
      await productQueries.productsByVendorForAdmins(null, { vendorId }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('unauthorized');
    }

    await Vendor.deleteMany();
  });

  it('Testing productsRandom query', async () => {
    await Brand.insertMany(brands);
    await Category.insertMany(categories);
    await City.insertMany(cities);
    await Vendor.insertMany(vendors);

    // Test query with 3 defined courses to return and default size
    const productIds = products.slice(0, 3).map(product => product._id);
    let productsRandom = await productQueries.productsRandom('', { productIds });
    expect(productsRandom.length).toEqual(productIds.length);
    productsRandom.forEach((product, index) => {
      expect(product._id.toString()).toEqual(productIds[index]);
    });

    // Test query with 3 defined courses to return and size = 5
    const size = 5;
    productsRandom = await productQueries.productsRandom('', { productIds, size });
    expect(productsRandom.length).toEqual(size);
    // Check if defined courses were returned only once
    let filteredProducts = productsRandom.filter(product => productIds.includes(product._id.toString()));
    expect(filteredProducts.length).toEqual(productIds.length);
    filteredProducts.forEach((product, index) => {
      expect(product._id.toString()).toEqual(productIds[index]);
    });

    // Test query with 3 random courses to return and default size
    productsRandom = await productQueries.productsRandom('', {});
    expect(productsRandom.length).toEqual(3);
    // Check if there are any duplicates
    const resultIds = productsRandom.map(product => product._id.toString());
    filteredProducts = resultIds.filter((productId, index) => resultIds.indexOf(productId) === index);
    expect(filteredProducts.length).toEqual(productsRandom.length);

    // Test query with 3 random courses to return and default size and cityIds filter
    const [{ _id: cityId1 }, { _id: cityId2 }] = cities;
    const cityIds = [cityId1, cityId2];
    productsRandom = await productQueries.productsRandom('', { cityIds });
    expect(productsRandom.length).toEqual(3);
    // Check if all products are from the specified city
    productsRandom.forEach(product => {
      expect(cityIds.includes(product.city._id.toString())).toEqual(true);
    });

    await Brand.deleteMany();
    await Category.deleteMany();
    await City.deleteMany();
    await Vendor.deleteMany();
  });

  it('Testing productAdd mutation', async () => {
    await City.insertMany(cities);
    await User.insertMany(users);
    await Vendor.insertMany(vendors);

    // Test if user is not an admin
    const [vendor] = vendors;
    const [{ _id: brandId }] = brands;
    const [{ _id: categoryId }] = categories;
    let [{ _id: userId }] = users.filter(user => !vendor.admins.includes(user._id));
    const productToAdd = {
      name: 'New product',
      description: 'New test product',
      price: 1000,
      gallery: ['image.png', 'image2.png'],
      vendor: vendor._id,
      stock: 10,
      brand: brandId,
      category: categoryId
    };

    try {
      await productMutations.productAdd(null, { productToAdd }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('unauthorized');
    }

    // Test successful request
    ([{ _id: userId }] = users.filter(user => vendor.admins.includes(user._id)));
    const product = await productMutations.productAdd(null, { productToAdd }, { userId });

    expect(product.name).toEqual(productToAdd.name);
    // Test default values
    expect(product.isActive).toEqual(true);
    expect(product.type).toEqual('Good');
    // Test city inheritance
    expect(product.city.id.toString()).toEqual(vendor.city);

    await City.deleteMany();
    await User.deleteMany();
    await Vendor.deleteMany();
  });

  it('Testing productEdit mutation', async () => {
    await User.insertMany(users);
    await Vendor.insertMany(vendors);

    // Try if user is not admin
    const [{ _id: productId, vendor: vendorId }] = products;
    const [{ admins }] = vendors.filter(vendor => vendor._id === vendorId);
    let [{ _id: userId }] = users.filter(user => !admins.includes(user._id));
    const productToEdit = {
      name: 'Edited name',
      description: 'Edited product'
    }
    try {
      await productMutations.productEdit(null, { productId, productToEdit }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('unauthorized');
    }

    // Test successful request
    ([{ _id: userId }] = users.filter(user => admins.includes(user._id)));
    const product = await productMutations.productEdit(null, { productId, productToEdit }, { userId });
    expect(product.id.toString()).toEqual(productId);
    expect(product.name).toEqual(productToEdit.name);
    expect(product.description).toEqual(productToEdit.description);

    await User.deleteMany();
    await Vendor.deleteMany();
  });

  it('Testing productToggleActivation mutation', async () => {
    await User.insertMany(users);
    await Vendor.insertMany(vendors);

    // Test if user is not admin
    const [{ _id: productId, vendor: vendorId, isActive }] = products;
    const [{ admins }] = vendors.filter(vendor => vendor._id === vendorId);
    let [{ _id: userId }] = users.filter(user => !admins.includes(user._id));
    try {
      await productMutations.productToggleActivation(null, { productId }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('unauthorized');
    }

    // Test successful request back and forth
    ([{ _id: userId }] = users.filter(user => admins.includes(user._id)));
    let product = await productMutations.productToggleActivation(null, { productId }, { userId });
    expect(product.isActive).toEqual(!isActive);

    product = await productMutations.productToggleActivation(null, { productId }, { userId });
    expect(product.isActive).toEqual(isActive);

    await User.deleteMany();
    await Vendor.deleteMany();
  });

  it('Testing productEditPrice mutation', async () => {
    await User.insertMany(users);
    await Vendor.insertMany(vendors);

    const [{ _id: productId, vendor: vendorId, price }] = products;
    const [{ admins }] = vendors.filter(vendor => vendor._id === vendorId);
    let [{ _id: userId }] = users.filter(user => admins.includes(user._id));

    // Update product for the first time
    let updatedProduct = await productMutations.productUpdatePrice(null, { productId, price: price * 2 }, { userId });
    expect(updatedProduct.id.toString()).not.toEqual(productId);
    expect(updatedProduct.price).toEqual(2 * price);
    expect(updatedProduct.isActive).toEqual(true);
    expect(updatedProduct.isDeprecated).toEqual(false);
    expect(updatedProduct.rootProduct.toString()).toEqual(productId);

    let oldProduct = await Product.findById(productId);
    expect(oldProduct.price).toEqual(price);
    expect(oldProduct.isDeprecated).toEqual(true);

    // Update product for the second time
    // Root product should point to the original product, not to the previously updated
    const { id: updatedProductId } = updatedProduct;
    updatedProduct = await productMutations.productUpdatePrice(null, { productId: updatedProductId, price: price * 4 }, { userId });
    expect(updatedProduct.id.toString()).not.toEqual(productId);
    expect(updatedProduct.price).toEqual(4 * price);
    expect(updatedProduct.isActive).toEqual(true);
    expect(updatedProduct.isDeprecated).toEqual(false);
    expect(updatedProduct.rootProduct.toString()).toEqual(productId);

    oldProduct = await Product.findById(updatedProductId);
    expect(oldProduct.price).toEqual(price * 2);
    expect(oldProduct.isDeprecated).toEqual(true);

    // Try to update price for an already deprecated product
    try {
      await productMutations.productUpdatePrice(null, { productId, price: price * 3 }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('productIsDeprecated');
    }

    await User.deleteMany();
    await Vendor.deleteMany();
  })
});
