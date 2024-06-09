// // screens/LabelsScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, FlatList } from 'react-native';
// import { LABELS } from '../data/dummy-data';
// import Label from '../models/lable';
// import Icon from 'react-native-vector-icons/Ionicons';

// const LabelsScreen = () => {
//     const [search, setSearch] = useState('');
//     const [labels, setLabels] = useState(LABELS);

//     const addLabelHandler = () => {
//         const newLabel = new Label(`l${labels.length + 1}`, search);
//         setLabels([...labels, newLabel]);
//     };

//     const filteredLabels = labels.filter(label =>
//         label.label.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <View>
//             <TextInput
//                 placeholder="Search or add label"
//                 value={search}
//                 onChangeText={setSearch}
//             />
//             <Button title="Add Label" onPress={addLabelHandler} />
//             <FlatList
//                 data={filteredLabels}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => <Text>{item.label}</Text>}
//             />
//         </View>
//     );
// };

// export default LabelsScreen;

// screens/LabelsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LABELS } from '../data/dummy-data';
import Label from '../models/lable';
import Icon from 'react-native-vector-icons/Ionicons';

const LabelsScreen = ({ navigation }) => {
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
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Search or add label..."
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredLabels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.labelItem} onPress={() => {/* Handle link/unlink label */ }}>
                        <Text style={styles.labelText}>{item.label}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.labelList}
            />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Manage Labels</Text>
            </TouchableOpacity>
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
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
});

export default LabelsScreen;

