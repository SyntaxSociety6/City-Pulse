import React, { useEffect, useRef, useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE || 'http://localhost:4000';

export default function App() {
  const [region, setRegion] = useState({ latitude: 28.6139, longitude: 77.2090, latitudeDelta: 0.2, longitudeDelta: 0.2 });
  const [pin, setPin] = useState(null);
  const [desc, setDesc] = useState('');
  const [kind, setKind] = useState('other');
  const loadingRef = useRef(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setRegion(r => ({ ...r, latitude: loc.coords.latitude, longitude: loc.coords.longitude }));
      setPin({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    })();
  }, []);

  async function submitReport() {
    if (!pin || !desc.trim() || loadingRef.current) return;
    loadingRef.current = true;
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: desc, kind, location: { lat: pin.lat, lng: pin.lng } })
      });
      if (!res.ok) throw new Error('Failed');
      setDesc('');
    } finally {
      loadingRef.current = false;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        onRegionChangeComplete={(r) => setRegion(r)}
        onPress={(e) => setPin({ lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude })}
      >
        {pin && <Marker coordinate={{ latitude: pin.lat, longitude: pin.lng }} />}
      </MapView>
      <View style={{ padding: 12, backgroundColor: '#fff' }}>
        <Text style={{ fontWeight: '600' }}>Report</Text>
        <TextInput placeholder="Describe the issue" value={desc} onChangeText={setDesc} style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginTop: 8 }} />
        <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
          <Button title="Pothole" onPress={() => setKind('pothole')} />
          <Button title="Water" onPress={() => setKind('waterlogging')} />
          <Button title="Accident" onPress={() => setKind('accident')} />
          <Button title="Other" onPress={() => setKind('other')} />
        </View>
        <View style={{ marginTop: 8 }}>
          <Button title="Submit report" onPress={submitReport} disabled={!pin || !desc.trim()} />
        </View>
        <Text style={{ marginTop: 6, fontSize: 12 }}>API: {API_BASE}</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


