const Product = require("../controllers/ProductController");
const User = require("../controllers/UserController");

const AuthMiddleware = require("../middlewares/AuthMiddleware");

module.exports = [
  {
    method: "POST",
    url: "/user/auth",
    handler: User.auth,
    schema: {
      description:
        "Este endpoint es utilizado para identificar un usuario con email y contraseña",
      tags: ["User Auth"],
      body: {
        description: "Credenciales",
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Response success",
          type: "object",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                _id: { type: "string" },
                email: { type: "string" },
                firstname: { type: "string" },
                lastname: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  {
    method: "POST",
    url: "/user/register",
    handler: User.register,
    schema: {
      description:
        "Este endpoint es utilizado para registrar un nuevo usuario que no exista anteriormente",
      tags: ["User Auth"],
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
          firstname: { type: "string" },
          lastname: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Response success",
          type: "object",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                _id: { type: "string" },
                email: { type: "string" },
                firstname: { type: "string" },
                lastname: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  {
    method: "PUT",
    url: "/user/password",
    handler: User.changePassword,
    preValidation: AuthMiddleware,
    schema: {
      description:
        "Este endpoint se utiliza para modificar la contraseña del usuario",
      tags: ["User"],
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Response success",
          type: "object",
          properties: {
            _id: { type: "string" },
            email: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
            created_at: { type: "string" },
            updated_at: { type: "string" },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  {
    method: "PUT",
    url: "/user",
    handler: User.update,
    preValidation: AuthMiddleware,
    schema: {
      description:
        "Este endpoint se utiliza para modificar los datos del usuario",
      tags: ["User"],
      body: {
        type: "object",
        properties: {
          firstname: { type: "string" },
          lastname: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Response success",
          type: "object",
          properties: {
            _id: { type: "string" },
            email: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
            created_at: { type: "string" },
            updated_at: { type: "string" },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  // products
  {
    method: "GET",
    url: "/product",
    handler: Product.getAll,
    preValidation: AuthMiddleware,
    schema: {
      description:
        "Este endpoint se utiliza para obtener todos los productos del usuario",
      tags: ["Product"],
      response: {
        200: {
          description: "Response success",
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              code: { type: "string" },
              title: { type: "string" },
              description: { type: "string" },
              price: { type: "number" },
              quantity: { type: "number" },
              user_id: { type: "string" },
            },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  {
    method: "GET",
    url: "/product/:_id",
    handler: Product.get,
    preValidation: AuthMiddleware,
    schema: {
      params: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "product id",
          },
        },
      },
      description: "Este endpoint se utiliza para obtener un producto por id",
      tags: ["Product"],
      response: {
        200: {
          description: "Response success",
          type: "object",
          properties: {
            _id: { type: "string" },
            code: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            quantity: { type: "number" },
            user_id: { type: "string" },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  {
    method: "POST",
    url: "/product",
    handler: Product.save,
    preValidation: AuthMiddleware,
    schema: {
      description: "Este endpoint se utiliza para crear un nuevo producto",
      tags: ["Product"],
      body: {
        type: "object",
        properties: {
          code: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          quantity: { type: "number" },
        },
      },
      response: {
        200: {
          description: "Response success",
          type: "object",
          properties: {
            _id: { type: "string" },
            code: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            quantity: { type: "number" },
            user_id: { type: "string" },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  {
    method: "PUT",
    url: "/product/:_id",
    handler: Product.update,
    preValidation: AuthMiddleware,
    schema: {
      params: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "product id",
          },
        },
      },
      description: "Este endpoint se utiliza para modificar un producto por id",
      tags: ["Product"],
      body: {
        type: "object",
        properties: {
          code: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          quantity: { type: "number" },
        },
      },
      response: {
        200: {
          description: "Response success",
          type: "object",
          properties: {
            _id: { type: "string" },
            code: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            quantity: { type: "number" },
            user_id: { type: "string" },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  {
    method: "DELETE",
    url: "/product/:_id",
    handler: Product.remove,
    preValidation: AuthMiddleware,
    schema: {
      params: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "product id",
          },
        },
      },
      description: "Este endpoint se utiliza para eliminar un producto por id",
      tags: ["Product"],
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
];
