const User = require('../Models/user');
const logger = require('../Helpers/config-log');
const mongoose = require('mongoose');

const getUsers = async (req, resp) => {

  try {
    const users = await User.find();
    resp.json({
      ok : true,
      msg : 'list of users',
      data: users
    });
  }catch (e) {
    logger.error(e);
    resp.status(500).json({
      ok: false,
      msg: 'Unexpected error when trying to get a list of users, contact support',
      error: e
    });
  }
}

const getUsersByCat = async (id) => {

  try {
    return users = await User.find({ categories: { _id: mongoose.Types.ObjectId(id) } }, '_id channels');
  }catch (e) {
    logger.error(e);
    return [];
  }
}

const createUser = async(req, resp) => {

  try {

    user = new User(req.body);
    await user.save();

    resp.json({
      ok : true,
      msg : 'User created successfully',
      data: user,

    });

  } catch (e) {
    logger.error(e);
    resp.status(500).json({
      ok: false,
      msg: 'Unexpected error when trying to create a user record, contact support',
      error: e
    });
  }
}

const updateUser = async(req, resp) => {

  const id = req.params.id;

  try {

    const userAsIs = await User.findById(uid);

    if(!userAsIs){
      return resp.status(404).json({
        ok: false,
        msg: 'There are no records associated with the id'
      });
    }

    const userToBe =  await User.findByIdAndUpdate(id, req.body, {new:true});

    resp.json({
      ok : true,
      msg : 'User updated successfully',
      usuario : userToBe,
      uid : req.uid

    });

  } catch (e) {
    logger.error(e);
    resp.status(500).json({
      ok: false,
      msg: 'Unexpected error when trying to update a user record',
      error: e
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  getUsersByCat
};
