import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { lightColors, darkColors } from '../../constants/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const MapScreen = () => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call" size={24} color={'#fff'} />
          <Text style={styles.callText}>Позвонить водителю</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.map, { backgroundColor: colors.card }]}> 
        <MaterialIcons name="map" size={80} color={colors.primary} style={{ opacity: 0.2 }} />
        <Text style={[styles.eta, { color: colors.text }]}>ETA: 12 мин</Text>
        <Text style={[styles.route, { color: colors.text }]}>ул. Ленина, 10 → ул. Гагарина, 25</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  iconBtn: {
    padding: 8,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  callText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  map: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  eta: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  route: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default MapScreen; 