// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NOTES, LABELS } from '../data/dummy-data'; // Import dữ liệu nhãn
import Note from '../components/note';

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
    const getLabelNames = (labelIds) => {
        return labelIds.map(labelId => {
            const label = LABELS.find(label => label.id === labelId);
            return label.label
        }).join(', '); // Sử dụng join để kết hợp các tên nhãn thành một chuỗi ngăn cách bằng dấu phẩy

    };
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
            <Button title="Add Note" onPress={() => navigation.navigate('NewNote')} />
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
});

export default HomeScreen;
