const Product = require("../models/Product");
const boom = require("@hapi/boom");

async function getAll(req, res) {
  try {
    return Product.find({
      user_id: req.user._id,
    }).exec();
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function get(req, res) {
  try {
    return Product.findById(req.params._id).exec();
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function save(req, res) {
  try {
    const data = req.body;
    data.user_id = req.user._id;

    const product = new Product(data);

    return product.save();
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function update(req, res) {
  try {
    // filtrar por id y user_id
    // evitando que otro token solicite
    // actualizar recursos de otro usuario
    const filter = { _id: req.params._id, user_id: req.user._id };

    const update = req.body;
    // setear user_id del token, evitando la
    // modificación de user id por la solicitud
    update.user_id = req.user._id;

    return Product.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function remove(req, res) {
  try {
    // filtrar por id y user_id
    // evitando que otro token solicite
    // remover recursos de otro usuario
    const filter = { _id: req.params._id, user_id: req.user._id };

    return Product.deleteOne(filter);
  } catch (err) {
    throw boom.boomify(err);
  }
}

module.exports = {
  save,
  update,
  remove,
  get,
  getAll,
};
