const httpStatus = require('http-status');
const authService = require('./auth.service');
const tokenService = require('./token.service');
const {
  Vender,
  Organization
} = require('../models');
const ApiError = require('../utils/ApiError');
const { password } = require('../validations/custom.validation');

/**
 * Create an organization
 * @param {Object} orgBody
 * @returns {Promise<User>}
 */
const createOrg = async (orgBody) => {
  if (await Organization.isEmailTaken(orgBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Organization already exists with this email');
  }
  return Organization.create({ ...orgBody, name: orgBody.company });
};

/**
 * Create a user
 * @param {Object} venderBody
 * @returns {Promise<User>}
 */
const createVender = async (venderBody) => {
  if (await Vender.isEmailTaken(venderBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists with this email');
  }
  return Vender.create(venderBody);
};


const createGoogleVender = async (venderBody) => {
  const vender = await User.isEmailTaken(venderBody.email)
  if (vender) {
    const vender = await getUserByEmail(venderBody.email);
    return vender;
  } else {
    return Vender.create(venderBody);
  }
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryVender = async (filter, options) => {
  const venders = await Vender.paginate(filter, options);
  return venders;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Vender>}
 */
const getVenderById = async (id) => {
  return Vender.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<Vender>}
 */
const getVenderByEmail = async (email) => {
  return Vender.findOne({
    email
  });
};

/**
 * Update user by id
 * @param {ObjectId} venderId
 * @param {Object} updateBody
 * @returns {Promise<Vender>}
 */
const updateVenderById = async (venderId, updateBody) => {
  const vender = await getUserById(venderId);
  if (!vender) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Vender not found'); 
  }
  if (updateBody.email && (await Vender.isEmailTaken(updateBody.email, venderId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists with this email');
  }


  Object.assign(vender, updateBody);
  await vender.save();
  return vender;
};
/**
 * Update user by id
  * @param {ObjectId} venderId
 * @param {Object} updateBody
 * @returns {Promise<Vender>}
 */
const changePassword = async (venderId, updateBody) => {
  const vender =  await getUserById(venderId);
  if (!vender) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
 
 
  if (!(await vender.isPasswordMatch(updateBody.password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password INCORRECT');

  }

  if (updateBody.password == updateBody.newPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is same as previous Password');
  }



  Object.assign(vender, { password: updateBody.newPassword });
  await vender.save();
  return vender;
};

/**
 * Update organization by id
 * @param {ObjectId} orgId
 * @param {Object} updateBody
 * @returns {Promise<Organization>}
 */
const updateOrgById = async (orgId, updateBody) => {
  const org = await Organization.findById(orgId);
  if (!org) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Organization not found');
  }
  if (updateBody.email && (await Organization.isEmailTaken(updateBody.email, orgId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Organization already exists with this email');
  }
  Object.assign(org, updateBody);
  await org.save();
  return org;
};

/**
 * Delete user by id
 * @param {ObjectId} venderId
 * @returns {Promise<User>}
 */
const deleteVenderById = async (venderId) => {
  const vender = await getVenderById(venderId);
  if (!vender) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vender not found');
  }
  await vender.delete();
  return vender;
};

const savePost = async (venderId, productBody) => {
  const vender = await getUserById(venderId);
  if (!vender) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  vender.saved = vender.saved.filter((obj) => JSON.stringify(obj._productId) === JSON.stringify(productBody.productId)).length > 0 ? vender.saved.filter((obj) => JSON.stringify(obj._productId) !== JSON.stringify(productBody.productId)) : [...vender.saved, { _productId: productBody.productId }]


  Object.assign(vender);
  await vender.save();
  return vender;
};


module.exports = {
  createVender,
  createOrg,
  queryVender,
  getVenderById,
  getVenderByEmail,
  updateVenderById,
  updateOrgById,
  deleteVenderById,
  changePassword,
  createGoogleVender,
  savePost
};
