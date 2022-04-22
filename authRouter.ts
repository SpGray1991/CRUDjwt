import { Router } from "express";
import controller from "./authController";
import checkMiddleware from "./middleware/checkUserNameMiddleware";

/* import authMiddleware from "./middleware/authMiddleware.js"; */
import roleMiddleware from "./middleware/roleMiddleware";

const router = Router();

router.post("/registration", checkMiddleware, controller.registration);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);
router.put("/users", controller.update);
router.delete("/users/:id", controller.delete);

export default router;
