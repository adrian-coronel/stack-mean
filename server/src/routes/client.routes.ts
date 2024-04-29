import * as express from "express"
import * as clientController from "../controller/client.controller";

export const clientRouter = express.Router();

clientRouter.use(express.json());

clientRouter.get("/", clientController.getClients);

clientRouter.get("/:id", clientController.getClientById);

clientRouter.post("/", clientController.saveClient);

clientRouter.put("/:id", clientController.updateClient);

clientRouter.delete("/:id", clientController.deleteClient);