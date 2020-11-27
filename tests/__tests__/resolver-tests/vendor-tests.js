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
import vendorQueries from '../../../graphql/resolvers/vendor/queries';
import vendorMutations from '../../../graphql/resolvers/vendor/mutations';

// Import relevant models
import { Vendor, User } from '../../../db/models';

// Import relevant seeders
import vendors from '../../../db/seeds/vendors.json';
import cities from '../../../db/seeds/cities.json';
import users from '../../../db/seeds/users.json';

describe('Testing vendors resolvers', () => {
  // Actions to take before all tests
  // No need to change it
  beforeAll(async () => {
    await createDBConnection();
  });

  // Actions to take before each test
  beforeEach(async () => {
    await Vendor.insertMany(vendors);
  });

  // Actions to take after each test
  afterEach(async () => {
    await Vendor.deleteMany({});
  });

  // Actions to take after all tests
  // No need to change it
  afterAll(async () => {
    await stopDBConnection();
  });

  it('Testing vendors query', async () => {
    // This query will return only active vendors because it's a public query
    let expectedVendors = vendors.filter(vendor => vendor.isActive);
    // Test query without filters
    let [results, count] = await vendorQueries.vendors(null, {});
    expect(count).toEqual(expectedVendors.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedVendors[index]._id);
    });

    // Test query with city filter
    let [{ _id: cityId }] = cities;
    expectedVendors = vendors.filter(vendor => vendor.isActive && vendor.city === cityId);
    ([results, count] = await vendorQueries.vendors(null, { cityId }));
    expect(count).toEqual(expectedVendors.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedVendors[index]._id);
    });

    // Test query with nameSearch filter
    const nameSearch = 'gui';
    expectedVendors = vendors.filter(vendor => vendor.isActive && vendor.name.toLowerCase().includes(nameSearch.toLowerCase()));
    ([results, count] = await vendorQueries.vendors(null, { nameSearch }));
    expect(count).toEqual(expectedVendors.length);
    results.forEach((result, index) => {
      expect(result.id.toString()).toEqual(expectedVendors[index]._id);
    });

    // Test query with empty results
    cityId = '000000000000000000000000';
    ([results, count] = await vendorQueries.vendors(null, { cityId }));
    expect(count).toEqual(0);
    expect(results.length).toEqual(0);
  });

  it('Testing vendorsByToken query', async () => {
    const vendorIndex = 0;
    const [userId] = vendors[vendorIndex].admins;

    const [results, count] = await vendorQueries.vendorsByToken(null, {}, { userId });
    const expectedVendors = vendors.filter(vendor => vendor.admins.includes(userId));
    expect(count).toEqual(expectedVendors.length);
    results.forEach((vendor, index) => {
      expect(vendor.id.toString()).toEqual(expectedVendors[index]._id);
      expect(vendor.name).toEqual(expectedVendors[index].name);
    });
  });

  it('Testing vendorsForGlobalAdmins query', async () => {
    await User.insertMany(users);

    // Should throw if user is not a global admin
    let userIndex = users.findIndex(user => !user.isGlobalAdmin);
    let userId = users[userIndex]._id;

    try {
      await vendorQueries.vendorsForGlobalAdmins(null, {}, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('unauthorized');
    }

    // Try successful request without filters
    userIndex = users.findIndex(user => user.isGlobalAdmin);
    userId = users[userIndex]._id;

    // Use a high number as pageSize to get all results
    const params = { page: 1, pageSize: 1000 };

    const [results, count] = await vendorQueries.vendorsForGlobalAdmins(null, {}, { userId });
    // Should return all results
    expect(count).toEqual(vendors.length);
    results.forEach((vendor, index) => {
      expect(vendor.id.toString()).toEqual(vendors[index]._id);
    });

    await User.deleteMany();
  });

  it('Testing vendorAdd mutation', async () => {
    await User.insertMany(users);

    const vendorToAdd = {
      name: 'Test vendor',
      city: '000000000000000000000000',
      profileImg: 'profileImg',
      address: 'address',
      phone: '5555555555'
    };

    const [{ _id: userId }] = users;

    const vendor = await vendorMutations.vendorAdd(null, { vendorToAdd }, { userId });
    expect(vendor.name).toEqual(vendorToAdd.name);
    expect(vendor.admins[0].id.toString()).toEqual(userId);
    expect(vendor.isActive).toEqual(false);

    await User.deleteMany();
  });

  it('Testing vendorEdit mutation', async () => {
    await User.insertMany(users);

    const vendorIndex = 0;
    const vendorId = vendors[vendorIndex]._id;
    const vendorToEdit = {
      profileImg: 'editedProfileImg',
      address: 'editedAddress'
    };

    // Test if user is not an admin
    let userId = '000000000000000000000000';
    try {
      await vendorMutations.vendorEdit(null, { vendorId, vendorToEdit }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('unauthorized');
    }

    // Test if user is admin
    ([userId] = vendors[vendorIndex].admins);
    const vendor = await vendorMutations.vendorEdit(null, { vendorId, vendorToEdit }, { userId });
    expect(vendor.name).toEqual(vendors[0].name);
    expect(vendor.profileImg).toEqual(vendorToEdit.profileImg);
    expect(vendor.address).toEqual(vendorToEdit.address);

    await User.deleteMany();
  });

  it('Testing vendorAddAdmin and vendorRemoveAdmin mutations', async () => {
    await User.insertMany(users);

    const vendorIndex = 0;
    const vendorId = vendors[vendorIndex]._id;

    // vendorAddAdmin mutation
    // Test if user is not an admin
    let userId = '000000000000000000000000';
    let adminId = '000000000000000000000001';
    try {
      await vendorMutations.vendorAddAdmin(null, { vendorId, adminId }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('unauthorized');
    }

    // Test if user is already an admin
    ([userId] = vendors[vendorIndex].admins);
    adminId = userId;
    try { 
      await vendorMutations.vendorAddAdmin(null, { vendorId, adminId }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('userIsAlreadyAdmin');
    }

    // Test successful request
    const [{ admins }] = vendors.filter(vendor => !vendor.admins.includes(userId));
    ([adminId] = admins);
    let vendor = await vendorMutations.vendorAddAdmin(null, { vendorId, adminId }, { userId });
    let adminsIds = vendor.admins.map(admin => admin.id.toString());
    expect(adminsIds.length).toEqual(vendors[vendorIndex].admins.length + 1);
    expect(adminsIds.includes(adminId)).toEqual(true);

    // vendorRemoveAdmin mutation
    // Test if user is not an admin
    userId = '000000000000000000000000';
    try {
      await vendorMutations.vendorRemoveAdmin(null, { vendorId, adminId }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('unauthorized');
    }

    // Test if user to remove is not an admin
    userId = adminsIds[0];
    adminId = '000000000000000000000000';
    try {
      await vendorMutations.vendorRemoveAdmin(null, { vendorId, adminId }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('userIsNotAnAdmin');      
    }

    // Test successful request
    adminId = adminsIds[1];
    vendor = await vendorMutations.vendorRemoveAdmin(null, { vendorId, adminId }, { userId });
    adminsIds = vendor.admins.map(admin => admin.id.toString());
    expect(adminsIds.length).toEqual(vendors[vendorIndex].admins.length);
    expect(adminsIds.includes(adminId)).toEqual(false);

    // Test if there won't be remaining admins
    adminId = userId;
    try {
      await vendorMutations.vendorRemoveAdmin(null, { vendorId, adminId }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('shouldRemainAnAdmin');
    }

    await User.deleteMany();
  });

  it('Testing vendorToggleActivation mutation', async () => {
    await User.insertMany(users);

    // Test if user is not globalAdmin
    let [{ _id: userId }] = users.filter(user => !user.isGlobalAdmin);
    const [{ _id: vendorId, isActive }] = vendors;
    try {
      await vendorMutations.vendorToggleActivation(null, { vendorId }, { userId });
      throw new Error('Should throw');
    } catch (err) {
      expect(err.message).toEqual('unauthorized');
    }

    // Test successful request forth and back
    ([{ _id: userId }] = users.filter(user => user.isGlobalAdmin));
    let vendor = await vendorMutations.vendorToggleActivation(null, { vendorId }, { userId });
    expect(vendor.isActive).toEqual(!isActive);

    vendor = await vendorMutations.vendorToggleActivation(null, { vendorId }, { userId });
    expect(vendor.isActive).toEqual(isActive);
  });
});
