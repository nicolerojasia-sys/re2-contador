const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const FILE = './data.json';

function getData() {
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({ z: 0, s: 0 }));
  return JSON.parse(fs.readFileSync(FILE));
}

function save(data) {
  fs.writeFileSync(FILE, JSON.stringify(data));
}

app.get('/zombies', (req, res) => {
  const d = getData(); d.z++;
  save(d);
  res.send(`🧟 Bando Zombie suma un punto! Zombies: ${d.z} | Sobrevivientes: ${d.s}`);
});

app.get('/sobrevivientes', (req, res) => {
  const d = getData(); d.s++;
  save(d);
  res.send(`🔫 Bando Sobrevivientes suma un punto! Zombies: ${d.z} | Sobrevivientes: ${d.s}`);
});

app.get('/puntaje', (req, res) => {
  const d = getData();
  res.send(`🧟 Zombies: ${d.z} puntos | 🔫 Sobrevivientes: ${d.s} puntos`);
});

app.get('/reset', (req, res) => {
  if (req.query.key !== process.env.CLAVE) return res.send('Clave incorrecta.');
  save({ z: 0, s: 0 });
  res.send('Puntaje reseteado! 🔄');
});

app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
