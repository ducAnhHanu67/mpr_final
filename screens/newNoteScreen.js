// screens/NewNoteScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { NOTES } from '../data/dummy-data';
import Note from '../models/note';

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
        <View>
            <TextInput
                placeholder="Note Content"
                value={content}
                onChangeText={setContent}
            />
            <Button title="Save" onPress={addNoteHandler} />
        </View>
    );
};

export default NewNoteScreen;
