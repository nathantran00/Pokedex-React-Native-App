// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';

// Import axios to make HTTP requests
import axios from 'axios';

// Function for capitalizing the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// Defining the PokemonDetailsScreen component
const PokemonDetailsScreen = ({ route }) => {
  const { pokemon } = route.params;

  // Define state variables
  const [description, setDescription] = useState(''); // Stores Pokemon's description
  const [isLoading, setLoading] = useState(true); // Used for displauing loading indicator
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0'); // Default background color
  const [textColor, setTextColor] = useState('#000000'); // Default text color

  useEffect(() => {
    // Fetch the description of the pokemon from the API
    const fetchDescription = async () => {
      try {
        // Get the species URL from the pokemon object
        const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`;
        // Make a GET request to the species URL
        const response = await axios.get(speciesUrl);

        // Find the description in English
        const englishDescription = response.data.flavor_text_entries.find((flavor) => flavor.language.name === 'en');
        // Set the fallback description if no English description is found
        setDescription(englishDescription ? englishDescription.flavor_text : 'No description available.');
      } catch (error) {
        // Handle any errors during the request
        setDescription('Failed to load description.');
      } finally {
        // Set loading to false when the request is finished
        setLoading(false);
      }
    };

    // Set colors based on type
    if (pokemon.types.some(type => type.type.name === 'grass')) {
      setBackgroundColor('#5F9E3F'); // green for grass type
      setTextColor('white');
    } else if (pokemon.types.some(type => type.type.name === 'fire')) {
      setBackgroundColor('#D1702A'); // orange for fire type
      setTextColor('white');
    } else if (pokemon.types.some(type => type.type.name === 'water')) {
      setBackgroundColor('#3D8DF0'); // blue for water type
      setTextColor('white');
    }

    // Fetch the description when the component mounts
    fetchDescription();
  }, [pokemon.types, pokemon.name]);

  if (isLoading) {
    // Display a loading indicator while the request is ongoing
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Render the Pokemon details once component is done loading
  // Note: The backgroundColor variable are used to dynamically set the background and text colors based on the Pokemon's type
  return (
    <ScrollView style={[styles.container, { backgroundColor: backgroundColor }]}>
        
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
      <Text style={[styles.name, { color: textColor }]}>{capitalizeFirstLetter(pokemon.name)}</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: backgroundColor }]}>Description</Text>
        <Text style={styles.text}>{description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: backgroundColor }]}>Type</Text>
        {pokemon.types.map((typeItem, index) => (
          <Text key={index} style={styles.text}>{capitalizeFirstLetter(typeItem.type.name)}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: backgroundColor }]}>Abilities</Text>
        {pokemon.abilities.map((abilityItem, index) => (
          <Text key={index} style={styles.text}>{capitalizeFirstLetter(abilityItem.ability.name)}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: backgroundColor }]}>Stats</Text>
        {pokemon.stats.map((statItem, index) => (
          <Text key={index} style={styles.text}>{capitalizeFirstLetter(statItem.stat.name)}: {statItem.base_stat}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    paddingBottom: 50,
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginTop: 4,
    lineHeight: 24,
  },
});

export default PokemonDetailsScreen;
