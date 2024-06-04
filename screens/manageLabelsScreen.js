// screens/ManageLabelsScreen.js
import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { LABELS } from '../data/dummy-data';

const ManageLabelsScreen = ({ navigation }) => {
    return (
        <View>
            <FlatList
                data={LABELS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text>{item.label}</Text>}
            />
        </View>
    );
};

export default ManageLabelsScreen;
