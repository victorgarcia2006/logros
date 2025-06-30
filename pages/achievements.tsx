import React, { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { Card, Modal, Input, Textarea, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import classes from "@/styles/demo.module.css";

function Achievements() {
  const { user } = useUserContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [logros, setLogros] = useState([]);
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  useEffect(() => {
    const fetchLogros = async () => {
        try {
            const response = await fetch(`/api/logros?usuario=${user}`);
            const data = await response.json();
            console.log("Logros del usuario:", data);
            setLogros(data);
        } catch (error) {
            console.error("Error fetching achievements:", error);
        }
    }

    if (!user) {
      router.push("/"); // Redirect to home if user is not logged in
    } else {
        fetchLogros(); // Fetch achievements if user is logged in
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<{ nombre: string; descripcion: string }> = (data) => {
    // Handle form submission
    console.log("Form data:", data);
    setLoading(true);
    fetch("/api/logros", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...data,
            usuario: user, // Assuming user is a string representing the user's email or ID
        }),
        })
        .then((response) => response.json())
        .then(() => {
            setLoading(false);
            reset();
            close();
            router.push("/achievements"); // Redirect to achievements page after adding
        })  
        .catch((error) => {
            console.error("Error:", error);
            setLoading(false);
    })
  };

  console.log("User:", user);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
      <h1 className="text-[#FF6F04] text-2xl font-bold text-center">
        Mis logros
      </h1>
      { logros ? logros.map((logro: {nombre: string, descripcion: string, fecha: Date}) => (
        <Card key={logro.nombre} radius="md" padding="sm" shadow="sm" className="w-1/2 mt-4 bg-gray-100">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-semibold">{logro.nombre}</h2>
            <span className="text-sm text-gray-500">
              {new Date(logro.fecha).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600">{logro.descripcion}</p>
        </Card>
      )) : (
        <p className="text-center mt-4">
          Aun no tienes logros registrados. ¡Empieza a completar tareas y gana
          logros!
        </p>
      )}
      <Card
        onClick={open}
        radius="md"
        padding="sm"
        className="w-1/2 cursor-pointer mt-4 bg-gray-100 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center"
      >
        <h2 className="text-lg text-gray-400 font-semibold text-center">
          Agregar logro
        </h2>
      </Card>
      {/* Add more content or components related to achievements here */}
      <Modal opened={opened} onClose={close} title="Agregar logro" centered>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-1">
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nombre del logro"
                className=""
                classNames={classes}
                required
              />
            )}
          />
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Descripción del logro"
                className=""
                required
                classNames={classes}
              />
            )}
          />
          <Button type="submit" variant="filled" color="orange" loading={loading}>
            Agregar
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default Achievements;
