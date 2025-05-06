import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function GenZSongScreen() {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };
  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolBar}>
        <TouchableOpacity onPress={decreaseFontSize} style={styles.toolButton}>
          <Text style={styles.toolButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.toolText}>Atur Ukuran Teks</Text>
        <TouchableOpacity onPress={increaseFontSize} style={styles.toolButton}>
          <Text style={styles.toolButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.songHeader}>
          <View style={styles.songInfo}>
            <Text style={styles.title}>Garam Dan Madu</Text>
            <Text style={styles.artist}>Tenxi, Naykilla & Jemsii</Text>
          </View>
          <View style={styles.rating}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
          </View>
        </View>
        
        <View style={styles.lyricsCard}>
          <Text style={[styles.lyrics, { fontSize: fontSize }]}>
            Tanpa ku sadar, ku mulai bertanya{'\n'}
            Jika terulang, akankah sama?{'\n'}
            Merah bibir kamu, kau pun lirik aku{'\n'}
            Tepat di bawah lampu, kubisikkan kamu{'\n'}
            Apa yang kaumau? Dia atau aku?{'\n'}
            Garam atau madu?{'\n\n'}

            Hold my hands, don't, don't tell your friends{'\n'}
            Cerita kemaren, kuingat permanen{'\n'}
            Manismu kaya permen, I hope this never end{'\n'}
            Oh, can you be my Gwen? And I'll be the Spiderman{'\n\n'}

            Sakit dadaku, ku mulai merindu{'\n'}
            Kubayangkan jika kamu tidur di sampingku{'\n'}
            Di malam yang semu, pejamkan mataku{'\n'}
            Kubayangkan tubuhmu jika di pelukanku{'\n\n'}

            Sakit dadaku, ku mulai merindu{'\n'}
            Kubayangkan jika kamu tidur di sampingku{'\n'}
            Di malam yang semu dan kupejamkan mataku{'\n'}
            Kubayangkan tubuhmu jika di pelukanku{'\n\n'}

            Malam chaos ini, ku terasa sepi{'\n'}
            Ku tak mau sendiri, I need you here with me{'\n'}
            Aku pilih madu, manis kayak kamu{'\n'}
            Ji, ro, lu{'\n\n'}

            Wanna tell my friends 'bout you{'\n'}
            Tapi tunggu dulu, ku masih meragu{'\n'}
            Kamu menggebu, wanna be with you{'\n'}
            But jalani dulu, oh{'\n'}
            Wanna be with you{'\n\n'}

            Sakit dadaku, ku mulai merindu{'\n'}
            Kubayangkan jika kamu tidur di sampingku{'\n'}
            Di malam yang semu, pejamkan mataku{'\n'}
            Kubayangkan tubuhmu jika di pelukanku{'\n\n'}

            Sakit dadaku, ku mulai merindu{'\n'}
            Kubayangkan jika kamu tidur di sampingku{'\n'}
            Di malam yang semu dan kupejamkan mataku{'\n'}
            Kubayangkan tubuhmu jika di pelukanku{'\n\n'}

            Yang kumau cuma kamu{'\n'}
            Yang kaumau cuma aku{'\n'}
            Yang kumau cuma kamu{'\n'}
            Yang kaumau cuma aku
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.playerControls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>◀◀</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.playButton]}>
          <Text style={styles.controlText}>▶</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>▶▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#333',
  },
  toolButton: {
    padding: 8,
    backgroundColor: '#444',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toolText: {
    color: '#fff',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  songHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
  songInfo: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  artist: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 4,
  },
  rating: {
    flexDirection: 'row',
  },
  star: {
    color: '#FFD700',
    fontSize: 20,
  },
  lyricsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  lyrics: {
    color: '#fff',
    lineHeight: 26,
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#222',
  },
  controlButton: {
    padding: 12,
    backgroundColor: '#444',
    borderRadius: 30,
    marginHorizontal: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playButton: {
    padding: 16,
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
  },
});