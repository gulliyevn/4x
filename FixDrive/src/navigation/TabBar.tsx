import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const tabIcons = [
  { name: 'Profile', icon: (color: string) => <Ionicons name="person-circle" size={28} color={color} /> },
  { name: 'Chat', icon: (color: string) => <Ionicons name="chatbubble-ellipses" size={26} color={color} /> },
  { name: 'Map', icon: (color: string) => <MaterialIcons name="map" size={28} color={color} /> },
  { name: 'Drivers', icon: (color: string) => <FontAwesome5 name="car" size={24} color={color} /> },
  { name: 'Schedule', icon: (color: string) => <Ionicons name="calendar" size={26} color={color} /> },
];

export default function TabBar({ state, descriptors, navigation }: any) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.tabBar, borderTopColor: colors.border }]}> 
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const color = isFocused ? colors.primary : colors.text;
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
            activeOpacity={0.8}
          >
            {tabIcons[index] && tabIcons[index].icon(color)}
            <Text style={[styles.label, { color, fontWeight: isFocused ? '700' : '500' }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
}); 