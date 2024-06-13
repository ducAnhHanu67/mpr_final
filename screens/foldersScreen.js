// screens/FoldersScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';

const FoldersScreen = () => {
    const [folders, setFolders] = useState([]);
    const [folderName, setFolderName] = useState('');

    const addFolderHandler = () => {
        if (folderName.trim()) {
            setFolders([...folders, { id: `f${folders.length + 1}`, name: folderName }]);
            setFolderName('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.addFolderContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="New Folder Name"
                    value={folderName}
                    onChangeText={setFolderName}
                />
                <TouchableOpacity style={styles.addButton} onPress={addFolderHandler}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={folders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.folderItem}>
                        <Text style={styles.folderText}>{item.name}</Text>
                        <Text style={styles.noteCount}>0 notes</Text>
                        <Text style={styles.timeStamp}>3 hrs ago</Text>
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
        backgroundColor: '#fff',
    },
    folderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    folderText: {
        fontSize: 18,
        flex: 1,
    },
    noteCount: {
        fontSize: 14,
        color: '#888',
    },
    timeStamp: {
        fontSize: 14,
        color: '#888',
    },
    addFolderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
    },
    addButton: {
        marginLeft: 16,
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        color: '#fff',
    },
});

export default FoldersScreen;
