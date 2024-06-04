// screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NOTES } from '../data/dummy-data';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.navbarTitle}>Notes</Text>
                <TouchableOpacity onPress={() => alert('Search button pressed')}>
                    <Text style={styles.searchButton}>🔍</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={NOTES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
                        <Text style={styles.noteItem}>{item.content}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button title="Add Note" onPress={() => navigation.navigate('NewNote')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#6200ea',
    },
    navbarTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchButton: {
        color: '#fff',
        fontSize: 24,
    },
    noteItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        fontSize: 18,
    },
});

export default HomeScreen;
