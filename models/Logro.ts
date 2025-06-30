import mongoose, { Schema, model, models } from "mongoose";

const LogroSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  usuario: { type: String, required: true }
});

// Evita redefinir el modelo si ya existe (en dev)
export const Logro = models.Logro || model("Logro", LogroSchema);