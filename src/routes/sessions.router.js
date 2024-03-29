import { Router } from "express";
import userModel from "../daos/mongo/models/user.model.js";
import { isValidPassword } from "../utils.js";
import * as UserController from "../controllers/user.controller.js";
import { createHash } from "../utils.js";

const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.saveUser);
router.get("/current", UserController.currentUser);

//Register
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  console.log("Registrando usuario:");
  console.log(req.body);

  //Validamos si el user existe en la DB
  const exist = await userModel.findOne({ email });
  if (exist) {
    return res
      .status(400)
      .send({ status: "error", message: "Usuario ya existe!" });
  }
  const user = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
  };

  const result = await userModel.create(user);
  res.send({
    status: "success",
    message: "Usuario creado con extito con ID: " + result.id,
  });
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Encuentra al usuario por email primero
  const user = await userModel.findOne({ email });

  if (!user) {
    // Si no se encuentra el usuario, enviar una respuesta de error.
    return res.status(401).send({ status: "error", error: "User not found" });
  }

  // Utiliza isValidPassword para verificar la contraseña
  if (!isValidPassword(user, password)) {
    // Si la contraseña no coincide, enviar una respuesta de error.
    return res
      .status(401)
      .send({ status: "error", error: "Incorrect credentials" });
  }

  // Si el usuario se autentica correctamente, procede con la sesión o lo que necesites hacer a continuación
  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    id: user.id,
    role: user.role,
  };

  // Redirecciona o envía la respuesta que consideres apropiada
  res.redirect("/products");
});

export default router;
