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
app.get('/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

// GET - Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.status(200).json(usuario);
});

// POST - Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const nombre = req.body.nombre;
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: nombre
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// PUT - Actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const nombre = req.body.nombre;
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  usuario.nombre = nombre;
  res.status(200).json(usuario);
});

// DELETE - Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  usuarios.splice(index, 1);
  res.status(204).send(); // 204: No Content
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
