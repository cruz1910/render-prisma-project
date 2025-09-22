import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/user", async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({ data: { name, email } });

    res.json(user);
});

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();

    res.json(users);
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário", details: error.message });
  }
});

app.listen(3000, () => {
    console.log("Server run on localhost:3000")
});