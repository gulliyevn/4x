import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface SwitchRoleButtonProps {
  currentRole: 'client' | 'driver';
  onSwitch: () => void;
}

const SwitchRoleButton: React.FC<SwitchRoleButtonProps> = ({
  currentRole,
  onSwitch,
}) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: colors.card,
      borderColor: colors.primary,
    },
  ];

  const textStyle = [
    styles.text,
    {
      color: colors.primary,
    },
  ];

  const newRole = currentRole === 'client' ? 'driver' : 'client';
  const roleText = currentRole === 'client' ? 'Стать водителем' : 'Вернуться к клиенту';

  return (
    <TouchableOpacity style={buttonStyle} onPress={onSwitch} activeOpacity={0.8}>
      <Text style={textStyle}>{roleText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SwitchRoleButton; 