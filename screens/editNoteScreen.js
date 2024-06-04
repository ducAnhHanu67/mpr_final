// screens/EditNoteScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { NOTES } from '../data/dummy-data';

const EditNoteScreen = ({ route, navigation }) => {
    const { noteId } = route.params;
    const note = NOTES.find(n => n.id === noteId);
    const [content, setContent] = useState(note.content);

    const saveNoteHandler = () => {
        note.content = content;
        navigation.goBack();
    };

    return (
        <View>
            <TextInput
                value={content}
                onChangeText={setContent}
            />
            <Button title="Save" onPress={saveNoteHandler} />
        </View>
    );
};

export default EditNoteScreen;
