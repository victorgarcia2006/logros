// pages/api/usuarios.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Usuario } from '@/models/Usuario';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const usuarios = await Usuario.find();
    return res.status(200).json(usuarios);
  }

  if (req.method === 'POST') {
    const nuevoUsuario = await Usuario.create(req.body);
    return res.status(201).json(nuevoUsuario);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Método ${req.method} no permitido`);
}
