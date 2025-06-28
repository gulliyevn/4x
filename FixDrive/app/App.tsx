import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';
import '../src/i18n';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

function Placeholder({ label }: { label: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>{label}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" children={() => <Placeholder label="Profile" />} />
      <Tab.Screen name="Chat" children={() => <Placeholder label="Chat" />} />
      <Tab.Screen name="Map" children={() => <Placeholder label="Map" />} />
      <Tab.Screen name="Drivers" children={() => <Placeholder label="Drivers" />} />
      <Tab.Screen name="Schedule" children={() => <Placeholder label="Schedule" />} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
} 