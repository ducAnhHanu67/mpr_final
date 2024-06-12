import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NOTES, LABELS } from '../data/dummy-data'; // Import dummy data
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const EditNoteScreen = ({ route }) => { // Remove `navigation` from function arguments
    const { noteId } = route.params;
    const noteIndex = NOTES.findIndex(n => n.id === noteId);
    const note = NOTES[noteIndex];
    const [content, setContent] = useState(note.content);
    const [visible, setVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState(note.color || '#FFFFFF'); // Default to white if no color
    const [labels, setLabels] = useState(note.labelIds || []); // Default to an empty array if no labels
    const navigation = useNavigation(); // Get navigation object using useNavigation hook

    const getLabelNames = (labelIds) => {
        return labelIds.map(labelId => {
            const label = LABELS.find(label => label.id === labelId);
            return label ? label.label : null;
        }).filter(labelName => labelName !== null);
    };

    const saveNoteHandler = () => {
        note.content = content;
        note.color = selectedColor;
        note.labelIds = labels;
        navigation.goBack();
    };

    const deleteNoteHandler = () => {
        NOTES.splice(noteIndex, 1);
        navigation.goBack();
    };

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const colors = ['#FFFFFF', '#f2c7cd', '#bddcf2', '#9ff5a6', '#f5ed95', '#f2cb8d', '#e88ef5', '#7de7f5', '#f28a7e'];

    const goToManageLabelsScreen = () => {
        navigation.navigate('ManageLabels', {
            selectedLabels: labels,
            onLabelsSelected: (selectedLabels) => {
                setLabels(selectedLabels);
            },
        });
    };

    const addNewLabel = () => {
        Alert.prompt(
            'Add New Label',
            'Enter the name of the new label:',
            (text) => {
                if (text) {
                    const newLabelId = LABELS.length + 1;
                    LABELS.push({ id: newLabelId.toString(), label: text });
                    setLabels([...labels, newLabelId.toString()]);
                }
            }
        );
    };

    const removeLabel = (labelId) => {
        const updatedLabels = labels.filter(id => id !== labelId);
        setLabels(updatedLabels);
    };

    return (
        <Provider>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <View style={[styles.container, { backgroundColor: selectedColor }]}>
                    <TextInput
                        style={[styles.textInput, { borderColor: selectedColor === '#FFFFFF' ? '#000000' : '#ddd' }]}
                        value={content}
                        onChangeText={setContent}
                    />
                    <Button title="Save me" onPress={saveNoteHandler} />
                </View>
                <View style={styles.bottomTabMenu}>
                    <Text style={styles.editedText}>Edited 11 hrs ago</Text>
                    <View style={styles.iconsContainer}>
                        <TouchableOpacity>
                            <Icon name="bookmark-outline" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showModal}>
                            <Icon name="more-vert" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorPicker}>
                            {colors.map(color => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorButton,
                                        { backgroundColor: color, opacity: selectedColor === color ? 1 : 0.2 },
                                        color === '#FFFFFF' && { borderWidth: 1, borderColor: '#000000' }
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                />
                            ))}
                        </ScrollView>

                        <View style={styles.labelContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {getLabelNames(labels).map((label, index) => (
                                    <TouchableOpacity key={index} onPress={() => removeLabel(labels[index])}>
                                        <Text style={styles.labelButton}>{label} (x)</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <TouchableOpacity onPress={goToManageLabelsScreen}>
                                <Text style={styles.labelButton}>+ Manage Labels</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={deleteNoteHandler}>
                            <Text style={styles.menuItem}>Delete Note</Text>
                        </TouchableOpacity>
                    </Modal>
                </Portal>
            </KeyboardAvoidingView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 20,
    },
    bottomTabMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    editedText: {
        fontSize: 12,
        color: '#888',
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        margin: 20,
    },
    menuItem: {
        marginVertical: 10,
        fontSize: 18,
    },
    colorPicker: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    labelContainer: {
        marginTop: 20,
    },
    labelButton: {
        backgroundColor: '#e0e0e0',
        color: '#333',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 3,
        marginRight: 5,
        marginBottom: 5,
        fontSize: 14,
    },
});

export default EditNoteScreen;
