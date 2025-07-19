import { useState } from "react";
import { Input, Card, Button } from "@mantine/core";
import classes from "@/styles/demo.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useUserContext } from "@/context/UserContext";

function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      correo: "",
      contrasena: "",
    },
  });
  const onSubmit: SubmitHandler<{
    correo: string;
    contrasena: string;
  }> = (data) => {
    console.log(data);
    // Aquí puedes manejar el inicio de sesión del usuario, por ejemplo, enviando los datos a una API
    setLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        // Redirigir o mostrar un mensaje de éxito
        console.log(res);
        if (res.mensaje == "ok") {
          setLoading(false);
          setUser(data.correo); // Actualiza el contexto del usuario
          router.push("/achievements"); // Redirige a la página de logros
        }
        else {
          setLoading(false);
          alert("Correo o contraseña incorrectos");
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
          ¡Bienvenido! <br /> Inicia sesión por favor
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Controller
            name="correo"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Correo electrónico"
                type="email"
                required
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
                required
                classNames={classes}
              />
            )}
          />
          <Button
            type="submit"
            variant="filled"
            color="var(--mantine-color-guinda-9)"
            loading={loading}
          >
            Iniciar sesión
          </Button>
        </form>
        <p className="text-center">
          ¿No tienes una cuenta?{" "}
          <Link href="register" className="text-[#840846]">
            Regístrate
          </Link>
        </p>
      </Card>
    </main>
  );
}

export default Index;
