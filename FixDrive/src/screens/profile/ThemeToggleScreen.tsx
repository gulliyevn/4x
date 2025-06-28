import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggleScreen = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        {theme === 'dark' ? 'Тёмная тема' : 'Светлая тема'}
      </Text>
      <Switch
        value={theme === 'dark'}
        onValueChange={toggleTheme}
      />
    </View>
  );
};

export default ThemeToggleScreen; 