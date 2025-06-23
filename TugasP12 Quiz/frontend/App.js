import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import ItemListScreen from './src/screens/ItemListScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import EditItemScreen from './src/screens/EditItemScreen';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f5f5',
    surface: '#ffffff',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ItemList"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="ItemList"
            component={ItemListScreen}
            options={{ title: 'TokoKu - Daftar Barang' }}
          />
          <Stack.Screen
            name="AddItem"
            component={AddItemScreen}
            options={{ title: 'Tambah Barang' }}
          />
          <Stack.Screen
            name="EditItem"
            component={EditItemScreen}
            options={{ title: 'Edit Barang' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}