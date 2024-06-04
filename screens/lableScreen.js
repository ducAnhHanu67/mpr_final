// screens/LabelsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { LABELS } from '../data/dummy-data';
import Label from '../models/lable';

const LabelsScreen = () => {
    const [search, setSearch] = useState('');
    const [labels, setLabels] = useState(LABELS);

    const addLabelHandler = () => {
        const newLabel = new Label(`l${labels.length + 1}`, search);
        setLabels([...labels, newLabel]);
    };

    const filteredLabels = labels.filter(label =>
        label.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View>
            <TextInput
                placeholder="Search or add label"
                value={search}
                onChangeText={setSearch}
            />
            <Button title="Add Label" onPress={addLabelHandler} />
            <FlatList
                data={filteredLabels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text>{item.label}</Text>}
            />
        </View>
    );
};

export default LabelsScreen;
