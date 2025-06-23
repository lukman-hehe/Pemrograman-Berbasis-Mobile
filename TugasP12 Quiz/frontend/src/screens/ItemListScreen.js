import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, RefreshControl, } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Text, ActivityIndicator, useTheme, Portal, Dialog, } from 'react-native-paper';
import { itemService } from '../services/api';

const ItemListScreen = ({ navigation }) => { 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadItems();
    });
    return unsubscribe;
  }, [navigation]);

  const loadItems = async () => {
    try {
      if (!refreshing) setLoading(true);
      const response = await itemService.getAllItems();
      if (response.success) {
        setItems(response.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data barang');
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadItems();
  };

  const showDeleteDialog = (item) => {
    setItemToDelete(item);
    setDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogVisible(false);
    setItemToDelete(null);
  };

  const deleteItem = async () => {
    if (!itemToDelete) return;

    try {
      const response = await itemService.deleteItem(itemToDelete._id);
      if (response.success) {
        loadItems();
      } else {
        Alert.alert('Gagal', response.message || 'Server tidak merespons sukses.');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal menghapus barang');
      console.error('Error deleting item:', error);
    } finally {
      hideDeleteDialog();
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={styles.itemName} numberOfLines={2}>{item.nama_barang}</Title>
          <Chip style={styles.categoryChip} textStyle={styles.chipText}>
            {item.kategori}
          </Chip>
        </View>
        <Paragraph style={styles.price}>
          Harga: Rp {item.harga.toLocaleString('id-ID')}
        </Paragraph>
        <Paragraph style={styles.stock}>Stok: {item.stok} unit</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('EditItem', { item })}>
          Edit
        </Button>
        <Button color={colors.error} onPress={() => showDeleteDialog(item)}>
          Hapus
        </Button>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" animating={true} color={colors.primary} />
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDeleteDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>Konfirmasi Hapus</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogParagraph}>
              Apakah Anda yakin ingin menghapus barang "{itemToDelete?.nama_barang}"?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDeleteDialog}>Batal</Button>
            <Button textColor={colors.error} onPress={deleteItem}>Hapus</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.headerContainer}>
        <Button 
          mode="contained" 
          style={styles.addButton} 
          labelStyle={styles.addButtonLabel} 
          icon="plus" 
          onPress={() => navigation.navigate('AddItem')}
        >
          Tambah Barang Baru
        </Button>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada barang</Text>
          <Text style={styles.emptySubText}>
            Tekan tombol "Tambah Barang Baru" di atas untuk memulai
          </Text>
        </View>
      ) : (
        <FlatList 
          data={items} 
          renderItem={renderItem} 
          keyExtractor={(item) => item._id} 
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
          contentContainerStyle={styles.listContainer} 
          style={styles.listWrapper} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' 
  },
  headerContainer: { 
    width: '100%', 
    maxWidth: 800, 
    padding: 16, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0' 
  },
  addButton: { 
    paddingVertical: 8,
  },
  addButtonLabel: { 
    fontSize: 16, 
    fontWeight: 'bold',
  },
  listWrapper: { 
    width: '100%', 
    maxWidth: 800 
  },
  listContainer: { 
    padding: 16,
    paddingBottom: 80, 
  },
  card: { 
    marginBottom: 16, 
    elevation: 2 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  itemName: { 
    flex: 1, 
    fontSize: 18, 
    fontWeight: 'bold', 
    lineHeight: 24
  },
  categoryChip: { 
    backgroundColor: '#e3f2fd', 
    marginLeft: 8
  },
  chipText: { 
    fontSize: 12, 
    color: '#1976d2' 
  },
  price: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#2e7d32', 
    marginBottom: 4 
  },
  stock: { 
    fontSize: 14, 
    color: '#666' 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loadingText: { 
    marginTop: 16, 
    fontSize: 16, 
    color: '#666' 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 32, 
    textAlign: 'center' 
  },
  emptyText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#666', 
    marginBottom: 8 
  },
  emptySubText: { 
    fontSize: 14, 
    color: '#999', 
    textAlign: 'center' 
  },
  dialog: {
    maxWidth: 450,
    width: '90%',
    alignSelf: 'center',
  },
  dialogTitle: {
    fontWeight: 'bold',
  },
  dialogParagraph: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ItemListScreen;