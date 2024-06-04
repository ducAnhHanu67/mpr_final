// screens/TrashScreen.js
import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { TRASH, NOTES } from '../data/dummy-data';

const TrashScreen = () => {
    const restoreNoteHandler = (noteId) => {
        const noteIndex = TRASH.findIndex(n => n.id === noteId);
        const note = TRASH.splice(noteIndex, 1)[0];
        NOTES.push(note);
    };

    const deleteNoteHandler = (noteId) => {
        const noteIndex = TRASH.findIndex(n => n.id === noteId);
        TRASH.splice(noteIndex, 1);
    };

    return (
        <View>
            <FlatList
                data={TRASH}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.content}</Text>
                        <Button title="Restore" onPress={() => restoreNoteHandler(item.id)} />
                        <Button title="Delete" onPress={() => deleteNoteHandler(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

export default TrashScreen;
