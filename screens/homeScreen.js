import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NOTES } from '../data/dummy-data'; // Import dữ liệu nhãn
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon from react-native-vector-icons
import { LabelContext } from '../context/LabelsContext';
import moment from 'moment'; // Import moment.js for date formatting

const HomeScreen = ({ navigation, searchQuery }) => {
    const [filteredNotes, setFilteredNotes] = useState(NOTES);
    const { labels } = useContext(LabelContext);
    const [showBookmarked, setShowBookmarked] = useState(false);

    useEffect(() => {
        filterNotes();
    }, [searchQuery, showBookmarked]);

    const filterNotes = () => {
        let notes = NOTES;

        if (searchQuery) {
            notes = notes.filter(note =>
                note.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (showBookmarked) {
            notes = notes.filter(note => note.isBookmarked);
        }

        setFilteredNotes(notes);
    };

    const getLabelNames2 = (labelIds) => {
        return labelIds.map(labelId => {
            const label = labels.find(label => label.id === labelId);
            return label ? label.label : null;
        }).filter(labelName => labelName !== null);
    };

    const getTimeElapsed = (noteTime) => {
        const now = moment();
        const noteMoment = moment(noteTime);
        const duration = moment.duration(now.diff(noteMoment));
        const hours = Math.floor(duration.asHours());
        const minutes = Math.floor(duration.asMinutes());

        if (hours > 0) {
            return `${hours} hrs ago`;
        } else {
            return `${minutes} mins ago`;
        }
    };

    return (
        <View style={styles.container}>
            {filteredNotes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Please add a new note</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredNotes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
                            <View style={styles.noteContainer}>
                                <View style={styles.noteHeader}>
                                    <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                                    <Text style={styles.noteTime}>{getTimeElapsed(item.updateAt)}</Text>
                                </View>
                                <Text style={styles.noteContent}>{item.content}</Text>
                                <View style={styles.noteFooter}>
                                    <FlatList
                                        data={getLabelNames2(item.labelIds)}
                                        keyExtractor={(label, index) => index.toString()}
                                        renderItem={({ item: label }) => (
                                            <Text style={styles.label}>{label}</Text>
                                        )}
                                        horizontal
                                    />
                                    {item.isBookmarked && <Icon name="bookmark" size={20} color="#000" />}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
    noteContainer: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noteHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    colorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    noteTime: {
        fontSize: 12,
        color: '#888',
    },
    noteContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    noteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3,
        marginRight: 5,
        fontSize: 12,
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
