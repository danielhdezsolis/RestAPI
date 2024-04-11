import { dbMethods } from "./../database/database";

const { getConnection } = dbMethods;

const getCarreras = async (request, response) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query("SELECT idCarrera, Nombre, Especialidad, Campus, Materias FROM carreras");
    connection.release();
    response.json(rows);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const getEspecialidad = async (request, response) => {
  try {
    const { idCarrera } = request.params;
    const connection = await getConnection();
    const [rows] = await connection.query("SELECT idCarrera, Especialidad, Campus FROM carreras WHERE idCarrera = ?", idCarrera);
    connection.release();
    response.json(rows);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const getMaterias = async (request, response) => {
  try {
    const { idCarrera, Especialidad } = request.params;
    const connection = await getConnection();
    const [rows] = await connection.query("SELECT idCarrera, Especialidad, Materias FROM carreras WHERE idCarrera = ? AND Especialidad = ?", [idCarrera, Especialidad]);
    connection.release();
    response.json(rows);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const addCarreras = async (request, response) => {
  try {
    const { idCarrera, Nombre, Especialidad, Campus, Materias } = request.body;

    if (idCarrera == undefined || Nombre == undefined || Especialidad == undefined || Campus == undefined || Materias == undefined) {
      response.status(400).json({ message: "Bad request. Please fill all fields" });
      return;
    }

    const carrera = { idCarrera, Nombre, Especialidad, Campus, Materias };
    const connection = await getConnection();
    await connection.query("INSERT INTO carreras SET ?", carrera);
    connection.release();
    response.json("Carrera added");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const deleteCarrera = async (request, response) => {
  try {
    const { idCarrera } = request.params;
    const connection = await getConnection();
    await connection.query("DELETE FROM carreras WHERE idCarrera = ?", idCarrera);
    connection.release();
    response.json("Carrera deleted");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const updateCarrera = async (request, response) => {
  try {
    const { idCarrera } = request.params;
    const { Nombre, Especialidad, Campus, Materias } = request.body;

    if (idCarrera == undefined || Nombre == undefined || Especialidad == undefined || Campus == undefined || Materias == undefined) {
      response.status(400).json({ message: "Bad request. Please fill all fields" });
      return;
    }

    const carrera = { Nombre, Especialidad, Campus, Materias };
    const connection = await getConnection();
    await connection.query("UPDATE carreras SET ? WHERE idCarrera = ?", [carrera, idCarrera]);
    connection.release();
    response.json("Carrera updated");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

export const methods = {
  getCarreras,
  getEspecialidad,
  getMaterias,
  addCarreras,
  deleteCarrera,
  updateCarrera
};
