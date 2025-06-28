import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface AppAvatarProps {
  source?: string;
  name?: string;
  size?: number;
  style?: ViewStyle;
}

const AppAvatar: React.FC<AppAvatarProps> = ({
  source,
  name,
  size = 40,
  style,
}) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const avatarStyle = [
    styles.avatar,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.primary,
    },
    style,
  ];

  const textStyle = [
    styles.text,
    {
      fontSize: size * 0.4,
      color: '#fff',
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        style={avatarStyle}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={avatarStyle}>
      <Text style={textStyle}>
        {name ? getInitials(name) : 'U'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});

export default AppAvatar; 