// screens/NewNoteScreen.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NOTES } from '../data/dummy-data';
import Note from '../models/note';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon from react-native-vector-icons

const NewNoteScreen = ({ navigation }) => {
    const [content, setContent] = useState('');

    const addNoteHandler = () => {
        const newNote = new Note(
            `n${NOTES.length + 1}`,
            null,
            [],
            content,
            new Date(),
            false
        );
        NOTES.push(newNote);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="New note's content"
                value={content}
                onChangeText={setContent}
            />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={addNoteHandler}
            >
                <Icon name="checkmark" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 20,
    },
    actionText: {
        color: 'blue',
        fontSize: 16,
        marginBottom: 10,
    },
    saveButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        backgroundColor: '#3c9fff',
        borderRadius: 25, // Half of the button's width and height to make it round
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default NewNoteScreen;
