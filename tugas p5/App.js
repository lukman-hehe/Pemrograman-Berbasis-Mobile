import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput,
TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [idBarang, setIdBarang] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [alamatTujuan, setAlamatTujuan] = useState('');
  const [pengirim, setPengirim] = useState('');
  const [jumlahBarang, setJumlahBarang] = useState(1);
  const [tanggalKirim, setTanggalKirim] = useState(new Date());
  const [penerima, setPenerima] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [savedDataList, setSavedDataList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const pengirimOptions = ['Dimas Tralalelo', 'Faisal Bombardino', 'Putri Balerinna'];

  useEffect(() => {
    const loadData = async () => {
      try {
        const allData = await AsyncStorage.getItem('shippingData');
        if (allData !== null) {
          const parsedData = JSON.parse(allData);
          const dataWithDates = parsedData.map(item => ({
            ...item,
            tanggalKirim: new Date(item.tanggalKirim)
          }));
          setSavedDataList(dataWithDates);
        }
      } catch (e) {
        console.log('Gagal memuat data', e);
      }
    };
    loadData();
  }, []);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTanggalKirim(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const submitData = async () => {
    if (!idBarang || !namaBarang || !alamatTujuan || !pengirim || !penerima) {
      Alert.alert('Error', 'Semua data harus diisi');
      return;
    }

    const idExists = savedDataList.some((item, index) => item.idBarang === idBarang && index !== editingIndex);
    if (idExists) {
      Alert.alert('Error', 'ID Barang sudah digunakan');
      return;
    }

    const data = {
      idBarang,
      namaBarang,
      alamatTujuan,
      pengirim,
      jumlahBarang,
      tanggalKirim,
      penerima,
    };

    try {
      let updatedList;
      if (editingIndex !== null) {
        updatedList = [...savedDataList];
        updatedList[editingIndex] = data;
      } else {
        updatedList = [...savedDataList, data];
      }

      const listForStorage = updatedList.map(item => ({
        ...item,
        tanggalKirim: item.tanggalKirim instanceof Date ? item.tanggalKirim.toISOString() : item.tanggalKirim
      }));
      await AsyncStorage.setItem('shippingData', JSON.stringify(listForStorage));
      setSavedDataList(updatedList);

      // Reset form
      setIdBarang('');
      setNamaBarang('');
      setAlamatTujuan('');
      setPengirim('');
      setJumlahBarang(1);
      setTanggalKirim(new Date());
      setPenerima('');
      setEditingIndex(null);

      Alert.alert('Sukses', editingIndex !== null ? 'Data pengiriman berhasil diubah!' : 'Data pengiriman berhasil disimpan!');
    } catch (e) {
      Alert.alert('Gagal menyimpan data!');
    }
  };

  const deleteData = async (index) => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus data ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            const updatedList = savedDataList.filter((_, i) => i !== index);
            const listForStorage = updatedList.map(item => ({
              ...item,
              tanggalKirim: item.tanggalKirim instanceof Date ? item.tanggalKirim.toISOString() : item.tanggalKirim
            }));
            await AsyncStorage.setItem('shippingData', JSON.stringify(listForStorage));
            setSavedDataList(updatedList);
            Alert.alert('Sukses', 'Data berhasil dihapus!');
          },
          style: 'destructive',
        },
      ],
    );
  };

  const editData = (index) => {
    const item = savedDataList[index];
    setIdBarang(item.idBarang);
    setNamaBarang(item.namaBarang);
    setAlamatTujuan(item.alamatTujuan);
    setPengirim(item.pengirim);
    setJumlahBarang(item.jumlahBarang);
    setTanggalKirim(item.tanggalKirim instanceof Date ? item.tanggalKirim : new Date(item.tanggalKirim));
    setPenerima(item.penerima);
    setEditingIndex(index);
  };

  const CustomButton = ({ title, onPress, color = 'primary' }) => (
    <TouchableOpacity 
      style={[
        styles.customButton, 
        color === 'primary' ? styles.primaryButton : styles.dangerButton
      ]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Form Pengiriman Barang</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>ID Barang:</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan ID barang"
            value={idBarang}
            onChangeText={setIdBarang}
            placeholderTextColor="#8A9BB8"
          />
          
          <Text style={styles.label}>Nama Barang:</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nama barang"
            value={namaBarang}
            onChangeText={setNamaBarang}
            placeholderTextColor="#8A9BB8"
          />

          <Text style={styles.label}>Alamat Tujuan:</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Masukkan alamat tujuan"
            value={alamatTujuan}
            onChangeText={setAlamatTujuan}
            placeholderTextColor="#8A9BB8"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Pengirim:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={pengirim}
              onValueChange={(itemValue) => setPengirim(itemValue)}
              style={styles.picker}
              dropdownIconColor="#4B6CB7"
            >
              <Picker.Item label="Pilih Pengirim" value="" color="#8A9BB8" />
              {pengirimOptions.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Jumlah Barang: <Text style={styles.valueText}>{jumlahBarang}</Text></Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={jumlahBarang}
            onValueChange={(value) => setJumlahBarang(value)}
            minimumTrackTintColor="#4B6CB7"
            maximumTrackTintColor="#2E3A59"
            thumbTintColor="#B3C7E6"
          />

          <Text style={styles.label}>Tanggal Kirim:</Text>
          <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{formatDate(tanggalKirim)}</Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={tanggalKirim}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          
          <Text style={styles.label}>Penerima:</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nama penerima"
            value={penerima}
            onChangeText={setPenerima}
            placeholderTextColor="#8A9BB8"
          />

          <View style={styles.buttonContainer}>
            <CustomButton 
              title={editingIndex !== null ? "Simpan Perubahan" : "Simpan Data"} 
              onPress={submitData} 
            />
            {editingIndex !== null && (
              <CustomButton 
                title="Batal Edit" 
                onPress={() => {
                  setIdBarang('');
                  setNamaBarang('');
                  setAlamatTujuan('');
                  setPengirim('');
                  setJumlahBarang(1);
                  setTanggalKirim(new Date());
                  setPenerima('');
                  setEditingIndex(null);
                }} 
                color="danger"
              />
            )}
          </View>
        </View>

        <View style={styles.savedDataSection}>
          <View style={styles.savedDataHeader}>
            <Text style={styles.savedDataTitle}>Daftar Barang Terkirim</Text>
            <View style={styles.headerLine} />
          </View>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>ID</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Nama Barang</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Alamat</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Tanggal</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Pengirim</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Penerima</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Jumlah</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Aksi</Text>
          </View>
          
          {savedDataList.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Belum ada data pengiriman</Text>
            </View>
          ) : (
            savedDataList.map((item, index) => {
              const itemDate = item.tanggalKirim instanceof Date ? item.tanggalKirim : new Date(item.tanggalKirim);
              return (
                <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.idBarang}</Text>
                  <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.namaBarang}</Text>
                  <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.alamatTujuan.substring(0, 20) + (item.alamatTujuan.length > 20 ? '...' : '')}</Text>
                  <View style={[styles.dateCell, { flex: 1.5 }]}>
                    <TouchableOpacity 
                      onPress={() => {
                        setShowDatePicker(true);
                        setTimeout(() => {
                          const handleEditDate = (event, selectedDate) => {
                            setShowDatePicker(Platform.OS === 'ios');
                            if (selectedDate) {
                              const updatedList = [...savedDataList];
                              updatedList[index].tanggalKirim = selectedDate;
                              setSavedDataList(updatedList);
                              const listForStorage = updatedList.map(item => ({
                                ...item,
                                tanggalKirim: item.tanggalKirim instanceof Date ? item.tanggalKirim.toISOString() : item.tanggalKirim
                              }));
                              AsyncStorage.setItem('shippingData', JSON.stringify(listForStorage));
                              Alert.alert('Sukses', 'Tanggal kirim berhasil diubah!');
                            }
                          };
                          setShowDatePicker(true);
                          return (
                            <DateTimePicker
                              value={itemDate}
                              mode="date"
                              display="default"
                              onChange={handleEditDate}
                            />
                          );
                        }, 0);
                      }}
                    >
                      <Text style={styles.dateCellText}>{formatDate(itemDate)}</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.pengirim.split(' ')[0]}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.penerima}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.jumlahBarang}</Text>
                  <View style={[styles.actionCell, { flex: 1 }]}>
                    <TouchableOpacity 
                      style={styles.detailButton} 
                      onPress={() => editData(index)}
                    >
                      <Text style={styles.detailButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.deleteButton} 
                      onPress={() => deleteData(index)}
                    >
                      <Text style={styles.deleteButtonText}>Hapus</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#E6ECF5', // Soft blue-gray background
  },
  container: {
    padding: 20,
    paddingTop: 50,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E3A59', // Dark blue text
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerLine: {
    height: 2,
    width: 150,
    backgroundColor: '#4B6CB7', // Rich blue accent
    marginTop: 8,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#B3C7E6', // Light blue border
  },
  label: {
    marginTop: 15,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#2E3A59', // Dark blue text
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B3C7E6', // Light blue border
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F9FBFF', // Very light blue input background
    color: '#2E3A59', // Dark blue text
    fontSize: 15,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#B3C7E6', // Light blue border
    borderRadius: 8,
    backgroundColor: '#F9FBFF', // Very light blue background
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    color: '#2E3A59', // Dark blue text
  },
  valueText: {
    color: '#4B6CB7', // Rich blue accent
    fontWeight: 'bold',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#B3C7E6', // Light blue border
    borderRadius: 8,
    backgroundColor: '#F9FBFF', // Very light blue background
    padding: 12,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#2E3A59', // Dark blue text
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 25,
    alignItems: 'center',
    gap: 10,
  },
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#4B6CB7', // Rich blue primary button
    borderWidth: 1,
    borderColor: '#3A5A9A', // Slightly darker blue border
  },
  dangerButton: {
    backgroundColor: '#D9534F', // Red for danger (unchanged for contrast)
    borderWidth: 1,
    borderColor: '#C9302C', // Darker red border
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  savedDataSection: {
    marginTop: 35,
  },
  savedDataHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  savedDataTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E3A59', // Dark blue text
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2E3A59', // Dark blue table header
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: {
    color: '#E6ECF5', // Light blue-gray text
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#B3C7E6', // Light blue border
  },
  tableRowEven: {
    backgroundColor: '#F9FBFF', // Very light blue background
  },
  tableRowOdd: {
    backgroundColor: '#FFFFFF',
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 13,
    color: '#2E3A59', // Dark blue text
    padding: 5,
  },
  dateCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCellText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#2E3A59', // Dark blue text
    padding: 5,
  },
  actionCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  detailButton: {
    backgroundColor: '#6B84C7', // Medium blue for edit button
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: '#D9534F', // Red for delete (unchanged for contrast)
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B3C7E6', // Light blue border
    backgroundColor: '#F9FBFF', // Very light blue background
  },
  emptyStateText: {
    color: '#8A9BB8', // Muted blue-gray text
    fontStyle: 'italic',
  },
});
