// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NOTES } from '../data/dummy-data';

const HomeScreen = ({ navigation, searchQuery }) => {
    const [filteredNotes, setFilteredNotes] = useState(NOTES);

    useEffect(() => {
        if (searchQuery) {
            const filtered = NOTES.filter(note =>
                note.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredNotes(filtered);
        } else {
            setFilteredNotes(NOTES);
        }
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredNotes}
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
    noteItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        fontSize: 18,
    },
});

export default HomeScreen;
