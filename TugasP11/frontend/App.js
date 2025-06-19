import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://localhost:3000/materials'; 

export default function App() {
  const [materials, setMaterials] = useState([]);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(API_URL);
      setMaterials(res.data);
    } catch (error) {
      console.error("Gagal mengambil daftar barang:", error);
    }
  };

  const addMaterial = async () => {
    if (productName && category && price && stock) {
      try {
        await axios.post(API_URL, { 
          name: productName, 
          category, 
          price: parseFloat(price), 
          stock: parseInt(stock)    
        });
        setProductName('');
        setCategory('');
        setPrice('');
        setStock('');
        fetchMaterials();
      } catch (error) {
        console.error("Gagal menambahkan barang:", error);
      }
    }
  };

  const editMaterial = async (id, newName, newCategory, newPrice, newStock) => {
    if (newName && newCategory && newPrice && newStock) {
      try {
        await axios.put(`${API_URL}/${id}`, {
          name: newName,
          category: newCategory,
          price: parseFloat(newPrice),
          stock: parseInt(newStock),
        });
        fetchMaterials();
      } catch (error) {
        console.error("Gagal memperbarui barang:", error);
      }
    }
  };

  const deleteMaterial = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMaterials();
    } catch (error) {
      console.error("Gagal menghapus barang:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const [editingMaterial, setEditingMaterial] = useState(null);
  const [editProductName, setEditProductName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');

  const startEdit = (material) => {
    setEditingMaterial(material);
    setEditProductName(material.name);
    setEditCategory(material.category);
    setEditPrice(material.price.toString()); 
    setEditStock(material.stock.toString());   
  };

  const cancelEdit = () => {
    setEditingMaterial(null);
    setEditProductName('');
    setEditCategory('');
    setEditPrice('');
    setEditStock('');
  };

  const saveEdit = async () => {
    if (editingMaterial && editProductName && editCategory && editPrice && editStock) {
      await editMaterial(
        editingMaterial._id, 
        editProductName, 
        editCategory, 
        editPrice, 
        editStock
      );
      cancelEdit();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Tambah Barang Baru" titleStyle={styles.cardTitle} />
        <Card.Content>
          <TextInput
            placeholder="Nama Barang"
            value={productName}
            onChangeText={setProductName}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Kategori (misal: Semen, Kayu, Cat)"
            value={category}
            onChangeText={setCategory}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Harga"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric" 
            style={styles.textInput}
          />
          <TextInput
            placeholder="Stok"
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric" 
            style={styles.textInput}
          />
          <Button title="Tambah Barang" onPress={addMaterial} color="#4CAF50" />
        </Card.Content>
      </Card>

      {editingMaterial && (
        <Card style={[styles.card, styles.editingCard]}>
          <Card.Title title="Edit Barang" titleStyle={styles.cardTitle} />
          <Card.Content>
            <TextInput
              placeholder="Nama Barang"
              value={editProductName}
              onChangeText={setEditProductName}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Kategori"
              value={editCategory}
              onChangeText={setEditCategory}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Harga"
              value={editPrice}
              onChangeText={setEditPrice}
              keyboardType="numeric"
              style={styles.textInput}
            />
            <TextInput
              placeholder="Stok"
              value={editStock}
              onChangeText={setEditStock}
              keyboardType="numeric"
              style={styles.textInput}
            />
            <Button title="Simpan" onPress={saveEdit} color="#2196F3" />
            <View style={{ height: 10 }} />
            <Button title="Batal" color="#9E9E9E" onPress={cancelEdit} />
          </Card.Content>
        </Card>
      )}

      {materials.map((material) => (
        <Card key={material._id} style={styles.materialCard}>
          <Card.Content>
            <Title style={styles.materialName}>{material.name}</Title>
            <Paragraph><Text style={styles.materialDetailLabel}>Kategori:</Text> {material.category}</Paragraph>
            <Paragraph><Text style={styles.materialDetailLabel}>Harga:</Text> Rp{material.price.toLocaleString('id-ID')}</Paragraph>
            <Paragraph><Text style={styles.materialDetailLabel}>Stok:</Text> {material.stock}</Paragraph>
            <View style={styles.buttonContainer}>
              <Button
                title="Edit"
                onPress={() => startEdit(material)}
                color="#FFC107"
              />
              <Button
                title="Hapus"
                onPress={() => deleteMaterial(material._id)}
                color="#F44336"
              />
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: '#eceff1', 
  },
  card: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: '#ffffff',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#424242', 
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: '#e0f2f7', 
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderColor: '#b2ebf2',
    borderWidth: 1,
  },
  editingCard: {
    backgroundColor: '#fff3e0', 
    borderColor: '#ffcc80',
    borderWidth: 1,
  },
  materialCard: {
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: '#ffffff',
  },
  materialName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  materialDetailLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});
