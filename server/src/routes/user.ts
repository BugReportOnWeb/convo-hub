import { Router } from "express";
import { getUser } from "../controllers/user";

const router = Router();

router.get('/:username', getUser);

export { router as userRouter };
