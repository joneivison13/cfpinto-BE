import express from "express";
import HelloWorldController from "../../controllers/HelloWorld";
import HelloWorldUseCase from "../../use_cases/HelloWorld";
import PersonController from "../../controllers/PersonController";
import upload from "./middlewares/file_upload";
import DocumentsController from "../../controllers/DocumentsController";
import AddressController from "../../controllers/AddressController";
import AuthMiddeleware from "./middlewares/auth";

const router = express.Router();

/* ------------ USE CASES ------------ */
const helloWorldUseCase = new HelloWorldUseCase();

/* ----------- CONTROLLERS ----------- */
const helloWorld = new HelloWorldController(helloWorldUseCase);

router.get("/", helloWorld.handle);
router.post("/login", new PersonController().login);
router.post(
  "/person/create",
  new AuthMiddeleware().handle,
  new PersonController().create
);
router.get("/person", new AuthMiddeleware().handle, new PersonController().get);
router.get(
  "/person/:id",
  new AuthMiddeleware().handle,
  new PersonController().getById
);

router.put(
  "/person/:id",
  new AuthMiddeleware().handle,
  new PersonController().update
);

router.delete(
  "/person/:id",
  new AuthMiddeleware().handle,
  new PersonController().delete
);

router.post(
  "/document/create",
  new AuthMiddeleware().handle,
  upload.single("file"),
  new DocumentsController().create
);

router.put(
  "/document/:id",
  new AuthMiddeleware().handle,
  upload.single("file"),
  new DocumentsController().update
);

router.delete(
  "/document/:id",
  new AuthMiddeleware().handle,
  new DocumentsController().delete
);

router.post(
  "/address/create",
  new AuthMiddeleware().handle,
  new AddressController().create
);

router.delete(
  "/address/:id",
  new AuthMiddeleware().handle,
  new AddressController().delete
);

export { router };
