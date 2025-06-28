import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { lightColors, darkColors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const initialMessages = [
  { id: '1', text: 'Здравствуйте! Я уже на месте.', fromMe: false },
  { id: '2', text: 'Спасибо, выезжаю!', fromMe: true },
];

const ChatScreen = () => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: input, fromMe: true }]);
      setInput('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.fromMe ? styles.myMessage : styles.otherMessage, { backgroundColor: item.fromMe ? colors.primary : colors.card }]}> 
            <Text style={{ color: item.fromMe ? '#fff' : colors.text }}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
        inverted
      />
      <View style={[styles.inputRow, { backgroundColor: colors.card }]}> 
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Сообщение..."
          placeholderTextColor={colors.text + '80'}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  sendBtn: {
    marginLeft: 8,
    padding: 8,
  },
});

export default ChatScreen; 