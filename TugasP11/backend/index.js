const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/buildingstore')
  .then(() => console.log('Terhubung ke MongoDB untuk Toko Bangunan'))
  .catch(err => console.error('Kesalahan koneksi MongoDB:', err));

const BuildingMaterial = mongoose.model('BuildingMaterial', {
    name: String,     
    category: String,  
    price: Number,    
    stock: Number      
  });
  

  app.get('/materials', async (_req, res) => {
    try {
      const materials = await BuildingMaterial.find();
      res.json(materials);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/materials/:id', async (req, res) => {
    try {
      const material = await BuildingMaterial.findById(req.params.id);
      if (!material) {
        return res.status(404).json({ error: 'Barang tidak ditemukan' });
      }
      res.json(material);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.post('/materials', async (req, res) => {
    try {
      const newMaterial = new BuildingMaterial(req.body);
      const saved = await newMaterial.save();
      res.json(saved);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.put('/materials/:id', async (req, res) => {
    const updated = await BuildingMaterial.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  });
  
app.delete('/materials/:id', async (req, res) => {
    await BuildingMaterial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Barang berhasil dihapus' });
  });
  
  app.listen(port, () => {
    console.log(`Server toko bangunan berjalan di http://localhost:${port}`);
  });
