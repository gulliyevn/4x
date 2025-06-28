import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { lightColors, darkColors } from '../../constants/colors';
import AppCard from '../../components/AppCard';
import AppAvatar from '../../components/AppAvatar';
import Button from '../../components/Button';
import SwitchRoleButton from '../../components/SwitchRoleButton';
import RatingStars from '../../components/RatingStars';

const ClientProfileScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const colors = theme === 'dark' ? darkColors : lightColors;
  
  const [userRole, setUserRole] = useState<'client' | 'driver'>('client');
  const [userData] = useState({
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    rating: 4.8,
    children: [
      { name: 'Анна', age: 12 },
      { name: 'Михаил', age: 8 },
    ],
  });

  const handleSwitchRole = () => {
    setUserRole(userRole === 'client' ? 'driver' : 'client');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <AppAvatar name={userData.name} size={80} />
        <Text style={[styles.name, { color: colors.text }]}>{userData.name}</Text>
        <RatingStars rating={userData.rating} />
        <SwitchRoleButton currentRole={userRole} onSwitch={handleSwitchRole} />
      </View>

      <AppCard style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Личная информация
        </Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.text }]}>Email:</Text>
          <Text style={[styles.value, { color: colors.text }]}>{userData.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.text }]}>Телефон:</Text>
          <Text style={[styles.value, { color: colors.text }]}>{userData.phone}</Text>
        </View>
      </AppCard>

      <AppCard style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Дети под опекой
        </Text>
        {userData.children.map((child, index) => (
          <View key={index} style={styles.childRow}>
            <Text style={[styles.childName, { color: colors.text }]}>
              {child.name}, {child.age} лет
            </Text>
          </View>
        ))}
        <Button title="Добавить ребёнка" onPress={() => {}} variant="outline" />
      </AppCard>

      <AppCard style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Платёжные методы
        </Text>
        <Button title="Добавить карту" onPress={() => {}} variant="outline" />
      </AppCard>

      <AppCard style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Настройки
        </Text>
        <Button title="Тёмная тема" onPress={() => {}} variant="outline" />
        <Button title="Язык" onPress={() => {}} variant="outline" />
      </AppCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
  },
  childRow: {
    marginBottom: 8,
  },
  childName: {
    fontSize: 16,
  },
});

export default ClientProfileScreen; 