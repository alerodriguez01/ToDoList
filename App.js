/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,

} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Creacion from './screens/Creacion';

import Listado from './screens/Listado';

import CruzImagen from './images/close.png';
import CheckImagen from './images/done.png';

import { Button } from 'react-native';
import { Image } from 'react-native';
import SeccionContextProvider from './context/SeccionContextProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <SeccionContextProvider>
          <Stack.Navigator>
            {/* Otra manera de personalizar el titulo:
          options={{ headerTitle: () => <Text style={styles.title}>Secciones</Text> }} 
          */}
            <Stack.Screen
              name="Secciones"
              component={Listado}
              options={{
                title: "Secciones",
                headerStyle: {
                  backgroundColor: 'orange',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'normal',
                },
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Creacion"
              component={Creacion}
              options={{
                title: "Crear sección",
                headerStyle: {
                  backgroundColor: 'orange',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'normal',
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                  // Este componente se reemplaza apenas se navegue a la pantalla 'Creacion' por uno especificado en ella
                  <Image source={CruzImagen} />
                ),
                headerRight: () => (
                  // Este componente se reemplaza apenas se navegue a la pantalla 'Creacion' por uno especificado en ella
                  <Image source={CheckImagen} />
                ),
              }}
            />
          </Stack.Navigator>
        </SeccionContextProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});

export default App;

