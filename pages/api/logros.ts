import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import { Logro } from "@/models/Logro";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "GET") {
    const email = (req.query.usuario || "").toString().trim();

    if (!email) {
      return res.status(400).json({ message: "Email de usuario no especificado" });
    }

    const logrosUsuario = await Logro.find({ usuario: email });
    return res.status(200).json(logrosUsuario);
  }

  if (req.method === "POST") {
    const nuevoLogro = await Logro.create(req.body);
    return res.status(201).json(nuevoLogro);
  }
  
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Método ${req.method} no permitido`);
}
