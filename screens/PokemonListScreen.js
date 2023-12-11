// Import neccesary dependencies
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

// Array of starter pokemon from each region
const starters = [
    'bulbasaur', 'charmander', 'squirtle',          // Gen 1
    'chikorita', 'cyndaquil', 'totodile',           // Gen 2
    'treecko', 'torchic', 'mudkip',                 // Gen 3
    'turtwig', 'chimchar', 'piplup',                // Gen 4
    'snivy', 'tepig', 'oshawott',                   // Gen 5
    'chespin', 'fennekin', 'froakie',               // Gen 6
    'rowlet', 'litten', 'popplio',                  // Gen 7
    'grookey', 'scorbunny', 'sobble',               // Gen 8
    'sprigatito', 'fuecoco', 'quaxly'               // Gen 9
];

// Function for capitalizing the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const PokemonListScreen = ({ navigation }) => {

    // State variables to store the data and status of the API request
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading status to true
                setError(null); // Reset the any previous errors

                // Use Promise.all() to make multiple requests at once for each starter
                const responses = await Promise.all(
                    starters.map(pokemon => axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`))
                );
                // Store the data in state
                setPokemonData(responses.map(response => response.data));
            } catch (err) {
                // If an error occurs, set the error in state
                setError(err.message);
            } finally {
                setLoading(false); // False loading status when the request is finished
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    // Show when data is loading
    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Show error message if there is an error
    if (error) {
        return <Text>Error: {error}</Text>;
    }

    // Render the list of Pokemon using a FlatList
    return (
        <View style={styles.container}>
            <FlatList
                data={pokemonData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (

                    // Render each Pokemon as a TouchableOpacity that navigates to the PokemonDetails screen
                    <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })}>
                        <Image source={{ uri: item.sprites.front_default }} style={styles.pokemonImage} />
                        <Text style={styles.pokemonName}>
                        {capitalizeFirstLetter(item.name)}</Text>
                    </TouchableOpacity>
                )}
                numColumns={3} // Display in 3 columns
                key={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A4B6F0',
        padding: 15,
    },
    listItem: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    pokemonImage: {
        width: 110,
        height: 110,
    },
    pokemonName: {
        //   marginTop: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default PokemonListScreen;
