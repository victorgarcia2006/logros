import React, { useState } from "react";
import { Input, Card, Button } from "@mantine/core";
import classes from "@/styles/demo.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useUserContext } from "@/context/UserContext";

function Register() {
  const router = useRouter();
  const { setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      contrasena: "",
    },
  });

  const onSubmit: SubmitHandler<{
    nombre: string;
    correo: string;
    contrasena: string;
  }> = (data) => {
    console.log(data);
    // Aquí puedes manejar el registro del usuario, por ejemplo, enviando los datos a una API
    setLoading(true);
    fetch("/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        // Redirigir o mostrar un mensaje de éxito
        if (res.mensaje == "ok") {
          setLoading(false);
          setUser(data.correo);
          router.push("/achievements"); // Redirige a la página de logros
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        alert(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card
        shadow="sm"
        radius="md"
        padding="lg"
        className="w-full max-w-md flex flex-col gap-6 bg-white"
      >
        <h1 className="text-[#840846] text-2xl font-bold text-center">
          ¡Bienvenido! <br /> Crea una cuenta
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nombre completo"
                className="mt-4"
                classNames={classes}
              />
            )}
          />
          <Controller
            name="correo"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Correo electrónico"
                className="mt-4"
                classNames={classes}
              />
            )}
          />
          <Controller
            name="contrasena"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Contraseña"
                type="password"
                className="mt-4"
                classNames={classes}
              />
            )}
          />
          <Button type="submit" variant="filled" color="var(--mantine-color-guinda-9)" loading={loading}>
            <p>Crear cuenta</p>
          </Button>
        </form>
        <p className="text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/" className="text-[#840846]">
            Iniciar sesión
          </Link>
        </p>
      </Card>
    </main>
  );
}

export default Register;
