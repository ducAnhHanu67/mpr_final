import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NOTES, LABELS } from '../data/dummy-data';
import { useNavigation } from '@react-navigation/native';
import { LabelContext } from '../context/LabelsContext';

const EditNoteScreen = ({ route }) => {
    const { noteId } = route.params;
    const noteIndex = NOTES.findIndex(n => n.id === noteId);
    const note = NOTES[noteIndex];
    const [content, setContent] = useState(note.content);
    const [visible, setVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState(note.color || '#FFFFFF');
    const [selectedLabels, setSelectedLabels] = useState(note.labelIds || []);
    const [isBookmarked, setIsBookmarked] = useState(note.isBookmarked || false); // New state for bookmark
    const navigation = useNavigation();
    const { labels } = useContext(LabelContext);

    const getLabelNames = (labelIds) => {
        return labelIds.map(labelId => {
            const label = labels.find(label => label.id === labelId);
            return label ? label.label : null;
        }).filter(labelName => labelName !== null);
    };

    const saveNoteHandler = () => {
        note.content = content;
        note.color = selectedColor;
        note.labelIds = selectedLabels;
        note.isBookmarked = isBookmarked; // Save bookmark status
        navigation.goBack();
    };

    const deleteNoteHandler = () => {
        NOTES.splice(noteIndex, 1);
        navigation.goBack();
    };

    const toggleBookmark = () => {
        setIsBookmarked(prevState => !prevState); // Toggle bookmark status
    };

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const colors = ['#FFFFFF', '#f2c7cd', '#bddcf2', '#9ff5a6', '#f5ed95', '#f2cb8d', '#e88ef5', '#7de7f5', '#f28a7e'];

    const goToManageLabelsScreen = () => {
        navigation.navigate('ManageLabels', {
            selectedLabels: selectedLabels,
            onLabelsSelected: (selectedLabels) => {
                setSelectedLabels(selectedLabels);
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
                        <TouchableOpacity onPress={toggleBookmark}>
                            <Icon name={isBookmarked ? "bookmark" : "bookmark-outline"} size={24} />
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
                                {getLabelNames(selectedLabels).map((label, index) => (
                                    <TouchableOpacity key={index}>
                                        <Text style={styles.labelButton}>{label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <TouchableOpacity onPress={goToManageLabelsScreen}>
                                <Text style={styles.labelButton}>+ Manage Labels</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={deleteNoteHandler}>
                            <Icon name="delete" size={20} color="black" style={styles.icon} />
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
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 3,
        marginRight: 5,
        marginBottom: 5,
        fontSize: 14,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
    },
    icon: {
        marginRight: 10,
    },
    menuItem: {
        color: 'black',
        fontSize: 16,
    },
});

export default EditNoteScreen;
