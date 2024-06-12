// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NOTES, LABELS } from '../data/dummy-data'; // Import dữ liệu nhãn
import Note from '../components/note';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon from react-native-vector-icons

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

    // Hàm để lấy tên nhãn dựa trên mã nhãn
    const getLabelNames2 = (labelIds) => {
        return labelIds.map(labelId => {
            const label = LABELS.find(label => label.id === labelId);
            return label ? label.label : null;
        }).filter(labelName => labelName !== null);
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={filteredNotes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
                        <Note content={item.content} labels={getLabelNames2(item.labelIds)} />
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('NewNote')}
            >
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
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
    addButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        backgroundColor: '#3c9fff',
        borderRadius: 50,
        width: 60,
        height: 60,
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

export default HomeScreen;
