const User = require("../models/User");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

async function auth(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    // si no existe user
    if (!user) {
      return res.code(401).send("user email not found");
    }

    // comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    // si es contraseña incorrecta
    if (!isMatch) {
      return res.code(401).send("password not match");
    }

    // get token
    const token = await res.jwtSign({ _id: user._id });

    return {
      token: token,
      user: user,
    };
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function register(req, res) {
  try {
    const body = req.body;

    // register user
    const user = await User.create(body);

    // set token
    const token = await res.jwtSign({ _id: user._id });

    // response user and toker
    return {
      token: token,
      user: user,
    };
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function update(req, res) {
  try {
    const user = await User.findById(req.user._id).exec();
    const update = req.body;

    if (update.firstname) {
      user.firstname = update.firstname;
    }

    if (update.lastname) {
      user.lastname = update.lastname;
    }

    await user.validate();

    return user.save();
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function changePassword(req, res) {
  try {
    const user = await User.findById(req.user._id).exec();

    user.password = req.body.password;

    await user.validate();

    return user.save();
  } catch (err) {
    throw boom.boomify(err);
  }
}

module.exports = {
  auth,
  register,
  changePassword,
  update,
};
