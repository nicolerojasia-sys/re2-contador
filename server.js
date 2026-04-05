const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const FILE = './data.json';

const zombies = [
  "Licker 👅 te huele desde lejos",
  "Zombie 🧟 letal en manada",
  "Mr. X 🕴️ no para de perseguirte",
  "Ivy 🌿 escupe ácido",
  "G-Mutant 👾 mutación de Birkin",
  "Zombie Cop 👮 antes protegía"
];

const sobrevivientes = [
  "Leon 👮 rookie del apocalipsis",
  "Claire 🏍️ busca a su hermano",
  "Ada Wong 🔴 espía misteriosa",
  "Sherry 👧 hija del creador del virus",
  "Marvin 🎖️ aguanta hasta el final",
  "Kendo 🔫 resistió solo"
];

function getData() {
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({ z: 0, s: 0 }));
  return JSON.parse(fs.readFileSync(FILE));
}

function save(data) {
  fs.writeFileSync(FILE, JSON.stringify(data));
}

app.get('/re2', (req, res) => {
  const d = getData();
  const esZombie = Math.random() < 0.5;
  const bando = esZombie ? zombies : sobrevivientes;
  const personaje = bando[Math.floor(Math.random() * bando.length)];
  if (esZombie) d.z++; else d.s++;
  save(d);
  const tag = esZombie
    ? `🧟 BANDO ZOMBIE (Zombies: ${d.z} | Sobrevivientes: ${d.s})`
    : `🔫 BANDO SOBREVIVIENTES (Zombies: ${d.z} | Sobrevivientes: ${d.s})`;
  res.send(`Sos: ${personaje} | ${tag}`);
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
