import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  placeholder?: string;
  style?: ViewStyle;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  placeholder,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = [
    styles.input,
    {
      backgroundColor: colors.card,
      borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
      color: colors.text,
    },
    isFocused && styles.focused,
    style,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor={colors.text + '80'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && (
        <Text style={[styles.error, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  focused: {
    borderWidth: 2,
  },
  error: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default InputField; 