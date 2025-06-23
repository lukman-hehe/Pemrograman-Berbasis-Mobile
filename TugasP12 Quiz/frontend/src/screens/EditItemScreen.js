import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, } from 'react-native';
import { TextInput, Button, Card, Title, Text, useTheme, } from 'react-native-paper';
import { itemService } from '../services/api';

const EditItemScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    nama_barang: '',
    harga: '',
    stok: '',
    kategori: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) {
      setFormData({
        nama_barang: item.nama_barang,
        harga: item.harga.toString(),
        stok: item.stok.toString(),
        kategori: item.kategori,
      });
    }
  }, [item]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nama_barang.trim()) newErrors.nama_barang = 'Nama barang harus diisi';
    if (!formData.harga || isNaN(formData.harga) || parseFloat(formData.harga) <= 0) newErrors.harga = 'Harga harus berupa angka positif';
    if (!formData.stok || isNaN(formData.stok) || parseInt(formData.stok) < 0) newErrors.stok = 'Stok harus berupa angka tidak negatif';
    if (!formData.kategori.trim()) newErrors.kategori = 'Kategori harus diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const itemData = {
        nama_barang: formData.nama_barang.trim(),
        harga: parseFloat(formData.harga),
        stok: parseInt(formData.stok),
        kategori: formData.kategori.trim(),
      };
      
      const response = await itemService.updateItem(item._id, itemData);

      if (response.success) {
        navigation.goBack();
      } else {
        Alert.alert('Error', response.message || 'Gagal memperbarui barang');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui barang. Periksa koneksi Anda.');
      console.error('Error updating item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={[styles.title, { color: colors.primary }]}>
              Edit Barang
            </Title>
            
            <TextInput
              label="Nama Barang"
              value={formData.nama_barang}
              onChangeText={(text) => handleInputChange('nama_barang', text)}
              mode="outlined"
              style={styles.input}
              error={!!errors.nama_barang}
            />
            {errors.nama_barang && <Text style={styles.errorText}>{errors.nama_barang}</Text>}

            <TextInput
              label="Harga"
              value={formData.harga}
              onChangeText={(text) => handleInputChange('harga', text)}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              error={!!errors.harga}
              left={<TextInput.Affix text="Rp " />}
            />
            {errors.harga && <Text style={styles.errorText}>{errors.harga}</Text>}

            <TextInput
              label="Stok"
              value={formData.stok}
              onChangeText={(text) => handleInputChange('stok', text)}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              error={!!errors.stok}
              right={<TextInput.Affix text="unit" />}
            />
            {errors.stok && <Text style={styles.errorText}>{errors.stok}</Text>}

            <TextInput
              label="Kategori"
              value={formData.kategori}
              onChangeText={(text) => handleInputChange('kategori', text)}
              mode="outlined"
              style={styles.input}
              error={!!errors.kategori}
            />
            {errors.kategori && <Text style={styles.errorText}>{errors.kategori}</Text>}
          </Card.Content>
          <Card.Actions style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              disabled={loading}
              loading={loading}
            >
              Simpan Perubahan
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  card: {
    width: '100%',
    maxWidth: 500,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 22,
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 8,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default EditItemScreen;