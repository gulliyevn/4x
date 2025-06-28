import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

const AppCard: React.FC<AppCardProps> = ({ children, style, padding = 16 }) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      padding,
    },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AppCard; 