import { Router } from "express";
import createProductEntryController from "../../controller/productEntry/createProductEntry.controller";
import listOneProductEntryController from "../../controller/productEntry/listOneProductEntry.controller";
import listProductEntriesController from "../../controller/productEntry/listProductEntries.controller";

const productEntryRouter = Router();

productEntryRouter.post("", createProductEntryController);

productEntryRouter.get("", listProductEntriesController);

productEntryRouter.get("/:id", listOneProductEntryController);

export default productEntryRouter;
