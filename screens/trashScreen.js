// screens/TrashScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TRASH, NOTES } from '../data/dummy-data';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon from react-native-vector-icons

const TrashScreen = () => {
    const [trashNotes, setTrashNotes] = useState(TRASH);

    const restoreNoteHandler = (noteId) => {
        const noteIndex = TRASH.findIndex(n => n.id === noteId);
        const note = TRASH.splice(noteIndex, 1)[0];
        NOTES.push(note);
        setTrashNotes([...TRASH]);
    };

    const deleteNoteHandler = (noteId) => {
        const noteIndex = TRASH.findIndex(n => n.id === noteId);
        TRASH.splice(noteIndex, 1);
        setTrashNotes([...TRASH]);
    };

    const restoreAllHandler = () => {
        while (TRASH.length > 0) {
            const note = TRASH.pop();
            NOTES.push(note);
        }
        setTrashNotes([...TRASH]);
    };

    const emptyTrashHandler = () => {
        TRASH.length = 0;
        setTrashNotes([...TRASH]);
    };

    const showActionDialog = (noteId) => {
        Alert.alert(
            "Choose an action",
            "",
            [
                { text: "Restore", onPress: () => restoreNoteHandler(noteId) },
                { text: "Delete permanently", onPress: () => deleteNoteHandler(noteId), style: "destructive" },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{trashNotes.length} notes in trash</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity style={styles.headerButton} onPress={restoreAllHandler}>
                        <Text style={styles.headerButtonText}>Restore</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton} onPress={emptyTrashHandler}>
                        <Text style={styles.headerButtonText}>Empty</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={trashNotes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => showActionDialog(item.id)} style={styles.note}>
                        <Text style={styles.noteContent}>{item.content}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        color: '#333',
    },
    headerButtons: {
        flexDirection: 'row',
    },
    headerButton: {
        marginLeft: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#3c9fff',
        borderRadius: 4,
    },
    headerButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    note: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
    },
    noteContent: {
        fontSize: 16,
    },
});

export default TrashScreen;
