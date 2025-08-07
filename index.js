const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get('/saludo', (req, res) => {
  res.send('Hola, Edwin');
});

app.get('/usuario/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Usuario con ID: ${userId}`);
});
