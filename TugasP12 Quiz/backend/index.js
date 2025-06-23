const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/TokoKu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB - Database: TokoKu');
});

const itemSchema = new mongoose.Schema({
  nama_barang: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  stok: {
    type: Number,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model('Toko', itemSchema);


app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message,
    });
  }
});

app.post('/items', async (req, res) => {
  try {
    const { nama_barang, harga, stok, kategori } = req.body;
    
    const newItem = new Item({
      nama_barang,
      harga,
      stok,
      kategori,
    });

    const savedItem = await newItem.save();
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: savedItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating item',
      error: error.message,
    });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_barang, harga, stok, kategori } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        nama_barang,
        harga,
        stok,
        kategori,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating item',
      error: error.message,
    });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully',
      data: deletedItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting item',
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});