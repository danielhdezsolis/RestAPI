import express  from "express";
import morgan from "morgan";

//Routes
import carrerasRoutes from "./routes/carreras.routes"

const app=express();

//Settings
app.set("port",4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Rutas
app.use("/api/carreras",carrerasRoutes);

export default app;