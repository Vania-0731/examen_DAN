const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb+srv://admin:admin123@proyecto-cloud.lgbwxut.mongodb.net/alumnosdb?retryWrites=true&w=majority&appName=proyecto-cloud")
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));


const AlumnoSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    codigo: String,
    correo: String
});
const Alumno = mongoose.model("Alumno", AlumnoSchema);

app.get('/', (req, res) => {
    res.send("API de alumnos funcionando 🚀");
});

app.post('/alumnos', async (req, res) => {
    try {
        console.log("📩 Datos recibidos:", req.body);
        const nuevoAlumno = new Alumno(req.body);
        await nuevoAlumno.save();
        res.status(201).send("Alumno registrado correctamente");
    } catch (error) {
        console.error("❌ Error en POST /alumnos:", error);
        res.status(500).send("Error al registrar alumno");
    }
});


app.get('/alumnos', async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        res.status(500).send("Error al obtener alumnos");
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
