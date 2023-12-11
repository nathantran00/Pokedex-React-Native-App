// Neccesary components + libraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screen components
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailsScreen from './screens/PokemonDetailsScreen';

// Create a Stack navigator
const Stack = createStackNavigator();

// Define the main app component
const App = () => {
  return (

    // Wrap the app in a NavigationContainer to hold the Stack navigator
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PokemonList">
        
        {/* Define the 1st screen in the stack */}
        <Stack.Screen name="PokemonList" component={PokemonListScreen} options={{ title: 'Starter Pokémon' }} />
          
        {/* Define the 2nd screen in the stack */}
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} options={{ title: 'Pokémon Details' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Export the main app component
export default App;
