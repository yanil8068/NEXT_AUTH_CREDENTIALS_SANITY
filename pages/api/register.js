// pages/api/createUser.js

import bcrypt from "bcryptjs";

import { client } from "../../lib/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { password, name, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await client.create({
        _type: "user",
        name,

        email,
        password: hashedPassword,
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
