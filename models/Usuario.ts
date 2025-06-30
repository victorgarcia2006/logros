// models/Usuario.ts
import mongoose, { Schema, model, models } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: String,
  correo: String,
  contrasena: String,
});

// Evita redefinir el modelo si ya existe (en dev)
export const Usuario = models.Usuario || model("Usuario", UsuarioSchema);
