import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { LABELS } from '../data/dummy-data';

const ManageLabelsScreen = ({ navigation, route }) => {
    const { selectedLabels: initialSelectedLabels, onLabelsSelected } = route.params;
    const [selectedLabels, setSelectedLabels] = useState(initialSelectedLabels || []);

    useEffect(() => {
        if (route.params && route.params.selectedLabels) {
            setSelectedLabels(route.params.selectedLabels);
        }
    }, [route.params]);

    const toggleLabelSelection = (labelId) => {
        setSelectedLabels((currentLabels) => {
            if (currentLabels.includes(labelId)) {
                return currentLabels.filter((id) => id !== labelId);
            } else {
                return [...currentLabels, labelId];
            }
        });
    };

    const saveLabels = () => {
        if (onLabelsSelected) {
            onLabelsSelected(selectedLabels);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={LABELS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleLabelSelection(item.id)}>
                        <Text style={{ color: selectedLabels.includes(item.id) ? 'blue' : 'black' }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <Button title="Save Labels" onPress={saveLabels} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
});

export default ManageLabelsScreen;
