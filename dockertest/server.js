const express = require('express');
const app = express();
const fake_db = "fake db";
const port = 9000;

app.use(express.json());

// Base de données temporaire (tableau)
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" }
];
let nextId = 3;

app.get('/', (req, res) => {
  res.send('serveur node js');
});

// GET - Récupérer tous les items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// POST - Créer un nouvel item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT - Mettre à jour un item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const item = items.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).json({ error: "Item non trouvé" });
  }
  
  item.name = name;
  res.json(item);
});

// DELETE - Supprimer un item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Item non trouvé" });
  }
  
  items.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});