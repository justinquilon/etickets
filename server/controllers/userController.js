import User from '../models/userModel.js';
import Account from '../models/accountModel.js';

//Register / Create a new user
export const register = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      response.status(400).send({
        message: 'User already exists.',
      });
    } else {
      const newAccount = new Account({
        load: 0,
      });
      await newAccount.save();
      const accountId = newAccount._id;

      const newUser = new User({
        name,
        email,
        password,
        accountId: accountId,
      });

      await newUser.save();

      response.status(201).send({
        message: 'registration_success',
        data: newUser,
      });
    }
  } catch (error) {
    return {
      error: 'operation_failed',
      message: error.message,
    };
  }
};

//Login
export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      response.status(404).send({
        message: 'User not found.',
      });
    } else {
      const passwordMatched = await user.comparePassword(password);

      if (!passwordMatched) {
        response.status(400).send({
          message: 'Invalid email/password.',
        });
      } else {
        response.status(200).send({
          message: 'login_success',
          data: user,
        });
      }
    }
  } catch (error) {
    return {
      error: 'operation_failed',
      message: error.message,
    };
  }
};

//Get all users
export const getUsers = async (request, response) => {
  const users = await User.find({});

  if (!users) {
    response.status(404).send({
      message: `No users found.`,
    });
  } else {
    response.status(200).send({
      message: `All Users`,
      data: users,
    });
  }
};

//Get 1 user
export const getUser = async (request, response) => {
  const { userId } = request.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    response.status(404).send({
      message: `User with ID ${id} not found.`,
    });
  } else {
    response.status(200).send({
      message: `Info of User with ID ${userId}`,
      data: user,
    });
  }
};

//Update user's details
export const updateUser = async (request, response) => {
  const { userId } = request.params;
  const { name, admin, password } = request.body;

  const user = await User.updateOne({ _id: userId }, { name, admin, password });

  if (!user) {
    response.status(404).send({
      message: `User with ID ${userId} not found.`,
    });
  } else {
    response.status(204).send({
      message: `User with ID ${userId} has been updated.`,
    });
  }
};
