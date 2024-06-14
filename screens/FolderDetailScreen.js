import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NOTES } from '../data/dummy-data';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FolderDetailScreen = ({ route }) => {
    const { folderName } = route.params;
    const navigation = useNavigation();

    const notesInFolder = NOTES.filter(note => note.folder === folderName);

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

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{folderName}</Text>
            <FlatList
                data={notesInFolder}
                keyExtractor={(item) => item.id}
                renderItem={renderNoteItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
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
});

export default FolderDetailScreen;
