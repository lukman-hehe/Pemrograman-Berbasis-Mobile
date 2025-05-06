import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function PopulerSongScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>About You</Text>
          <Text style={styles.artist}>The 1975</Text>
        </View>
        
        <View style={styles.lyricsContainer}>
          <Text style={styles.lyrics}>
            I know a place{'\n'}
            It's somewhere I go when I need to remember your face{'\n'}
            We get married in our heads{'\n'}
            Something to do while we try to recall how we met{'\n\n'}
            
            Do you think I have forgotten?{'\n'}
            Do you think I have forgotten?{'\n'}
            Do you think I have forgotten about you?{'\n\n'}
            
            You and I (don't let go), we're alive (don't let go){'\n'}
            With nothing to do, I could lay and just look in your eyes{'\n'}
            Wait (don't let go) and pretend (don't let go){'\n'}
            Hold on and hope that we'll find our way back in the end (in the end){'\n\n'}
            
            Do you think I have forgotten?{'\n'}
            Do you think I have forgotten?{'\n'}
            Do you think I have forgotten about you?{'\n\n'}
            
            Do you think I have forgotten?{'\n'}
            Do you think I have forgotten?{'\n'}
            Do you think I have forgotten about you?{'\n\n'}
            
            And there was something 'bout you that now I can't remember{'\n'}
            It's the same damn thing that made my heart surrender{'\n'}
            And I miss you on a train, I miss you in the morning{'\n'}
            I never know what to think about{'\n\n'}
            
            I think about you (so don't let go){'\n'}
            About you (so don't let go){'\n'}
            Do you think I have forgotten about you? (Don't let go){'\n'}
            About you{'\n'}
            About you{'\n'}
            Do you think I have forgotten about you? (Don't let go)
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>Bagikan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 4,
  },
  artist: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  lyricsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lyrics: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  controlButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  controlText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});