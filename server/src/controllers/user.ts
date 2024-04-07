import { Request, Response } from "express";
import { createUserTable, getUserQuery } from "../db/query";

const getUser = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        await createUserTable();
        const user = await getUserQuery(username);

        if (!user) {
            const error = 'User doesn\'t exist';
            return res.status(404).json({ error });
        }

        return res.json({ user });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

export { getUser };
