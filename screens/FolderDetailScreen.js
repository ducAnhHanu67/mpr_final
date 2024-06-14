import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NOTES } from '../data/dummy-data';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NoteContext } from '../context/NotesContext';

const FolderDetailScreen = ({ route }) => {
    const { folderName } = route.params;
    const { notes, updateNotes } = useContext(NoteContext);
    const navigation = useNavigation();

    const notesInFolder = notes.filter(note => note.folder === folderName);

    const renderNoteItem = ({ item }) => (
        <TouchableOpacity style={styles.noteItem} onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
            <Text style={styles.noteContent}>{item.content}</Text>
            <View style={styles.noteActions}>
                <TouchableOpacity onPress={() => {/* Add bookmark handler here */ }}>
                    <Icon name={item.isBookmarked ? "bookmark" : "bookmark-outline"} size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* Add delete handler here */ }}>
                    <Icon name="delete" size={24} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const handleAddNote = () => {
        navigation.navigate('NewNote', { folderName });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{folderName}</Text>
            <FlatList
                data={notesInFolder}
                keyExtractor={(item) => item.id}
                renderItem={renderNoteItem}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        position: 'relative', // Ensure children can be absolutely positioned relative to this container
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    noteItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
    },
    noteContent: {
        fontSize: 16,
        marginBottom: 8,
    },
    noteActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addButton: {
        backgroundColor: '#007bff',
        width: 60,
        height: 60,
        borderRadius: 30, // Make it circular
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', // Position absolutely within container
        bottom: 20,
        right: 20,
        elevation: 3, // Add elevation for Android shadow
    },
});

export default FolderDetailScreen;