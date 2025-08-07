const mongoose = require('mongoose');
require('dotenv').config();

const CONNECTION_STRING = process.env.CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

const Usuario = mongoose.model('Usuario', {
  nombre: String
});

const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// "Base de datos" simulada
let usuarios = [
  { id: 1, nombre: 'Edwin' },
  { id: 2, nombre: 'Ana' }
];

// GET - Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.status(200).json(usuarios);
});

// GET - Obtener un usuario por ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
});
// POST - Crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  const nuevoUsuario = new Usuario({ nombre: req.body.nombre });
  await nuevoUsuario.save();
  res.status(201).json(nuevoUsuario);
});

// PUT - Actualizar un usuario
app.put('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    usuario.nombre = req.body.nombre || usuario.nombre;
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

// DELETE - Eliminar un usuario
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const resultado = await Usuario.findByIdAndDelete(req.params.id);
    if (!resultado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
