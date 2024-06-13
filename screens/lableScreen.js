import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { LABELS } from '../data/dummy-data';
import Label from '../models/lable';
import Icon from 'react-native-vector-icons/Ionicons';

const LabelsScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [labels, setLabels] = useState(LABELS);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(null);

    const addLabelHandler = () => {
        const newLabel = new Label(`l${labels.length + 1}`, search);
        setLabels([...labels, newLabel]);
        setSearch('');
    };

    const editLabelHandler = (labelId, newLabelName) => {
        setLabels((currentLabels) =>
            currentLabels.map((label) =>
                label.id === labelId ? { ...label, label: newLabelName } : label
            )
        );
        setModalVisible(false);
    };

    const deleteLabelHandler = (labelId) => {
        setLabels((currentLabels) =>
            currentLabels.filter((label) => label.id !== labelId)
        );
        setModalVisible(false);
    };

    const openModal = (label) => {
        setSelectedLabel(label);
        setModalVisible(true);
    };

    const filteredLabels = labels.filter(label =>
        label.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Search or add label..."
                value={search}
                onChangeText={setSearch}
            />
            {search.length > 0 && !filteredLabels.some(label => label.label.toLowerCase() === search.toLowerCase()) && (
                <TouchableOpacity style={styles.addButton} onPress={addLabelHandler}>
                    <Text style={styles.addButtonText}>Create "{search}"</Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={filteredLabels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.labelItem} onPress={() => openModal(item)}>
                        <Text style={styles.labelText}>{item.label}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.labelList}
            />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Manage Labels</Text>
            </TouchableOpacity>
            {selectedLabel && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.textInput}
                                value={selectedLabel.label}
                                onChangeText={(text) => setSelectedLabel({ ...selectedLabel, label: text })}
                            />
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.saveButton} onPress={() => editLabelHandler(selectedLabel.id, selectedLabel.label)}>
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteLabelHandler(selectedLabel.id)}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#3c9fff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    labelList: {
        paddingVertical: 20,
    },
    labelItem: {
        backgroundColor: '#e0f7ff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 5,
    },
    labelText: {
        fontSize: 16,
        color: '#007aff',
    },
    backButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    backButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#3c9fff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        flex: 1,
        marginRight: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#ff3c3c',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        flex: 1,
        marginLeft: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#aaa',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default LabelsScreen;
