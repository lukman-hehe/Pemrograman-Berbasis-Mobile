import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';

export default function DaerahSongScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showChords, setShowChords] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(previousMode => !previousMode);
  };

  const toggleChords = () => {
    setShowChords(previousValue => !previousValue);
  };

  return (
    <View style={[
      styles.container, 
      isDarkMode ? styles.darkContainer : styles.lightContainer
    ]}>
      <View style={[
        styles.settingsBar,
        isDarkMode ? styles.darkSettingsBar : styles.lightSettingsBar
      ]}>
        <View style={styles.settingOption}>
          <Text style={[
            styles.settingText,
            isDarkMode ? styles.darkText : styles.lightText
          ]}>Mode Gelap</Text>
          <Switch
            trackColor={{ false: "#ccc", true: "#6200ee" }}
            thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
        
        <View style={styles.settingOption}>
          <Text style={[
            styles.settingText,
            isDarkMode ? styles.darkText : styles.lightText
          ]}>Tampilkan Chord</Text>
          <Switch
            trackColor={{ false: "#ccc", true: "#6200ee" }}
            thumbColor={showChords ? "#fff" : "#f4f3f4"}
            onValueChange={toggleChords}
            value={showChords}
          />
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.songContainer}>
          <Text style={[
            styles.title,
            isDarkMode ? styles.darkTitle : styles.lightTitle
          ]}>Rek Ayo Rek</Text>
          
          <Text style={[
            styles.artist,
            isDarkMode ? styles.darkText : styles.lightText
          ]}>Lagu Daerah Jawa Timur</Text>
          
          <View style={[
            styles.infoBox,
            isDarkMode ? styles.darkInfoBox : styles.lightInfoBox
          ]}>
            <Text style={[
              styles.infoText,
              isDarkMode ? styles.darkInfoText : styles.lightInfoText
            ]}>Lagu tradisional dari Surabaya, Jawa Timur</Text>
          </View>
          
          <View style={styles.lyricsSection}>
            <View style={styles.verse}>
              {showChords && (
                <Text style={[
                  styles.chords,
                  isDarkMode ? styles.darkChords : styles.lightChords
                ]}>C                  G</Text>
              )}
              <Text style={[
                styles.lyrics,
                isDarkMode ? styles.darkText : styles.lightText
              ]}>Rek ayo rek, mlaku nang Tunjungan</Text>
              
              {showChords && (
                <Text style={[
                  styles.chords,
                  isDarkMode ? styles.darkChords : styles.lightChords
                ]}>G7                C</Text>
              )}
              <Text style={[
                styles.lyrics,
                isDarkMode ? styles.darkText : styles.lightText
              ]}>Rek ayo rek, rame-rame bebarengan</Text>
            </View>
            
            <View style={styles.verse}>
              {showChords && (
                <Text style={[
                  styles.chords,
                  isDarkMode ? styles.darkChords : styles.lightChords
                ]}>F                C</Text>
              )}
              <Text style={[
                styles.lyrics,
                isDarkMode ? styles.darkText : styles.lightText
              ]}>Ngalor ngidul bersama-sama</Text>
              
              {showChords && (
                <Text style={[
                  styles.chords,
                  isDarkMode ? styles.darkChords : styles.lightChords
                ]}>G7                 C</Text>
              )}
              <Text style={[
                styles.lyrics,
                isDarkMode ? styles.darkText : styles.lightText
              ]}>Selalu riang di dalam hati</Text>
            </View>
            
            <View style={styles.verse}>
              {showChords && (
                <Text style={[
                  styles.chords,
                  isDarkMode ? styles.darkChords : styles.lightChords
                ]}>F               C</Text>
              )}
              <Text style={[
                styles.lyrics,
                isDarkMode ? styles.darkText : styles.lightText
              ]}>Sapa ngerti nasibe awakmu</Text>
              
              {showChords && (
                <Text style={[
                  styles.chords,
                  isDarkMode ? styles.darkChords : styles.lightChords
                ]}>D7                G</Text>
              )}
              <Text style={[
                styles.lyrics,
                isDarkMode ? styles.darkText : styles.lightText
              ]}>Yen wis mulih nang omahmu dewe</Text>
            </View>
            
            <View style={styles.chorus}>
              {showChords && (
                <Text style={[
                  styles.chords,
                  isDarkMode ? styles.darkChords : styles.lightChords
                ]}>C                  G</Text>
              )}
              <Text style={[
                styles.lyrics,
                isDarkMode ? styles.darkText : styles.lightText,
                styles.chorusText
              ]}>Rek ayo rek, mlaku nang Tunjungan</Text>
              
              {showChords && (
                <Text style={[
                  styles.chords,
                  isDarkMode ? styles.darkChords : styles.lightChords
                ]}>G7                C</Text>
              )}
              <Text style={[
                styles.lyrics,
                isDarkMode ? styles.darkText : styles.lightText,
                styles.chorusText
              ]}>Rek ayo rek, rame-rame bebarengan</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={[
        styles.footer,
        isDarkMode ? styles.darkFooter : styles.lightFooter
      ]}>
        <TouchableOpacity 
          style={[
            styles.footerButton,
            isDarkMode ? styles.darkButton : styles.lightButton
          ]}
        >
          <Text style={styles.footerButtonText}>Cetak</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.footerButton,
            isDarkMode ? styles.darkButton : styles.lightButton
          ]}
        >
          <Text style={styles.footerButtonText}>Unduh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  settingsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderBottomWidth: 1,
  },
  lightSettingsBar: {
    borderBottomColor: '#ddd',
    backgroundColor: '#eee',
  },
  darkSettingsBar: {
    borderBottomColor: '#333',
    backgroundColor: '#222',
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginRight: 8,
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  songContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  lightTitle: {
    color: '#333',
  },
  darkTitle: {
    color: '#fff',
  },
  artist: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  infoBox: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  lightInfoBox: {
    backgroundColor: '#e3f2fd',
  },
  darkInfoBox: {
    backgroundColor: '#263238',
  },
  infoText: {
    fontSize: 14,
  },
  lightInfoText: {
    color: '#0d47a1',
  },
  darkInfoText: {
    color: '#90caf9',
  },
  lyricsSection: {
    marginTop: 16,
  },
  verse: {
    marginBottom: 20,
  },
  chorus: {
    marginTop: 8,
    marginBottom: 20,
  },
  chords: {
    fontFamily: 'monospace',
    fontSize: 14,
    marginBottom: 4,
  },
  lightChords: {
    color: '#6200ee',
  },
  darkChords: {
    color: '#bb86fc',
  },
  lyrics: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  chorusText: {
    fontWeight: 'bold',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
  },
  lightFooter: {
    borderTopColor: '#ddd',
    backgroundColor: '#eee',
  },
  darkFooter: {
    borderTopColor: '#333',
    backgroundColor: '#222',
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  lightButton: {
    backgroundColor: '#6200ee',
  },
  darkButton: {
    backgroundColor: '#bb86fc',
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});