import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import PopulerSongScreen from './components/PopulerSongScreen';
import GenZSongScreen from './components/GenZSongScreen';
import DaerahSongScreen from './components/DaerahSongScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('Populer');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Populer':
        return <PopulerSongScreen />;
      case 'GenZSong':
        return <GenZSongScreen />;
      case 'Daerah':
        return <DaerahSongScreen />;
      default:
        return <PopulerSongScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lirik lagu</Text>
      </View>
      
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Populer' && styles.activeTab]} 
          onPress={() => setActiveTab('Populer')}
        >
          <Text style={styles.tabText}>Lagu Populer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'GenZSong' && styles.activeTab]} 
          onPress={() => setActiveTab('GenZSong')}
        >
          <Text style={styles.tabText}>Lagu Gen Z</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Daerah' && styles.activeTab]} 
          onPress={() => setActiveTab('Daerah')}
        >
          <Text style={styles.tabText}>Lagu Daerah</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#6200ee',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: '#6200ee',
    backgroundColor: '#f0e6ff',
  },
  tabText: {
    color: '#444',
    fontWeight: '500',
  },
});