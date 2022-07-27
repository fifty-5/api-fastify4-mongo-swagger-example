const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true },
      validate: [
        function (email) {
          return email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          );
        },
        "email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// generando hash de la contraseña
UserSchema.pre("save", function (next) {
  const user = this;

  // si no es cambio de contraseña, modificar
  if (!user.isModified("password")) return next();

  const saltFact = parseInt(process.env.AUTH_SALT_FACTOR);

  // generar salt
  bcrypt.genSalt(saltFact, function (err, salt) {
    if (err) return next(err);

    // hash usando salt generada
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override
      user.password = hash;
      next();
    });
  });
});

// remover password
UserSchema.set("toJSON", {
  transform: function (doc, user, opt) {
    delete user.password;
    return user;
  },
});

module.exports = mongoose.model("User", UserSchema);
