import { Router } from "express";
import { createUserSchema, userTable, loginSchema } from "../../db/userSchema.js";
import { validateData } from "../../middleware/validation.js";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { bytes } from "drizzle-orm/gel-core";

const router = Router();
router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);
    const [user] = await db.insert(userTable).values(data).returning();
    // @ts-ignore
    delete user.password;
    res.status(201).json({ user });
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    // if (user.password !== hashedPassword) {
    //   res.status(401).json({ error: "Authentication failed" });
    //   return;
    // }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // jwt token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "your_super_secret_key_here",
      { expiresIn: "30d" }
    );
    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

export default router;
