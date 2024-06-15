// screens/TrashScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NoteContext } from '../context/NotesContext';
import { TrashContext } from '../context/TrashsContext';

const TrashScreen = () => {
    const { notes, updateNotes } = useContext(NoteContext);
    const { trashs, updateTrash } = useContext(TrashContext);

    const restoreNoteHandler = (noteId) => {
        const noteIndex = trashs.findIndex(n => n.id === noteId);
        const note = trashs.splice(noteIndex, 1)[0];
        updateTrash([...trashs]);
        updateNotes([...notes, note]);
    };

    const deleteNoteHandler = (noteId) => {
        const noteIndex = trashs.findIndex(n => n.id === noteId);
        trashs.splice(noteIndex, 1);
        updateTrash([...trashs]);
    };

    const restoreAllHandler = () => {
        while (trashs.length > 0) {
            const note = trashs.pop();
            updateNotes([...notes, note]);
        }
        updateTrash([...trashs]);
    };

    const emptyTrashHandler = () => {
        updateTrash([]);
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
                <Text style={styles.headerText}>{trashs.length} notes in trash</Text>
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
                data={trashs}
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
