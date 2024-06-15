import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NoteContext } from '../context/NotesContext';
import { LabelContext } from '../context/LabelsContext';
import moment from 'moment';


const FolderDetailScreen = ({ route }) => {
    const { folderName } = route.params;
    const { notes, updateNotes } = useContext(NoteContext);
    const { labels } = useContext(LabelContext);
    const navigation = useNavigation();

    const notesInFolder = notes.filter(note => note.folder === folderName);

    const renderNoteItem = ({ item }) => (
        <TouchableOpacity style={styles.noteItem} onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
            <Text style={styles.noteContent}>{item.content}</Text>
            <View style={styles.noteActions}>
                <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                    <Icon name={item.isBookmarked ? "bookmark" : "bookmark-outline"} size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNoteHandler(item.id)}>
                    <Icon name="delete" size={24} />
                </TouchableOpacity>
            </View>
            <View style={styles.noteFooter}>
                <FlatList
                    data={getLabelNames(item.labelIds)}
                    keyExtractor={(label, index) => index.toString()}
                    renderItem={({ item: label }) => (
                        <Text style={styles.label}>{label}</Text>
                    )}
                    horizontal
                />
                <Text style={styles.noteTime}>{getTimeElapsed(item.updateAt)}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleAddNote = () => {
        navigation.navigate('NewNote', { folderName });
    };

    const toggleBookmark = (noteId) => {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, isBookmarked: !note.isBookmarked } : note
        );
        updateNotes(updatedNotes);
    };

    const deleteNoteHandler = (noteId) => {
        const updatedNotes = notes.filter(note => note.id !== noteId);
        updateNotes(updatedNotes);
    };

    const getLabelNames = (labelIds) => {
        return labelIds.map(labelId => {
            const label = labels.find(label => label.id === labelId);
            return label ? label.label : null;
        }).filter(labelName => labelName !== null);
    };

    const getTimeElapsed = (noteTime) => {
        const now = moment();
        const noteMoment = moment(noteTime);
        const duration = moment.duration(now.diff(noteMoment));
        const hours = Math.floor(duration.asHours());
        const minutes = Math.floor(duration.asMinutes());

        if (hours > 0) {
            return `${hours} hrs ago`;
        } else {
            return `${minutes} mins ago`;
        }
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
        position: 'relative',
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
    noteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    label: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 5,
        fontSize: 12,
    },
    noteTime: {
        fontSize: 12,
        color: '#888',
    },
    addButton: {
        backgroundColor: '#007bff',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 3,
    },
});

export default FolderDetailScreen;
