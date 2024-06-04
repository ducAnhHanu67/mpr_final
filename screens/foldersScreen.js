// screens/FoldersScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const FoldersScreen = () => {
    const [folders, setFolders] = useState([]);
    const [folderName, setFolderName] = useState('');

    const addFolderHandler = () => {
        setFolders([...folders, { id: `f${folders.length + 1}`, name: folderName }]);
    };

    return (
        <View>
            <TextInput
                placeholder="New Folder Name"
                value={folderName}
                onChangeText={setFolderName}
            />
            <Button title="Add Folder" onPress={addFolderHandler} />
            <FlatList
                data={folders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    );
};

export default FoldersScreen;
