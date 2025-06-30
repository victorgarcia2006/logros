// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Usuario } from '@/models/Usuario';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  const usuario = await Usuario.findOne({ correo });

  if (!usuario || usuario.contrasena !== contrasena) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  return res.status(200).json({ mensaje: 'ok' });
}
