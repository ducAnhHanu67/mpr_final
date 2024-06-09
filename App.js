// In App.js
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, StyleSheet, View } from 'react-native';

import HomeScreen from './screens/homeScreen';
import LabelsScreen from './screens/lableScreen';
import FoldersScreen from './screens/foldersScreen';
import TrashScreen from './screens/trashScreen';
import NewNoteScreen from './screens/newNoteScreen';
import EditNoteScreen from './screens/editNoteScreen';
import ManageLabelsScreen from './screens/manageLabelsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack({ searchQuery }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen">
        {props => <HomeScreen {...props} searchQuery={searchQuery} />}
      </Stack.Screen>
      <Stack.Screen name="NewNote" component={NewNoteScreen} />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
      <Stack.Screen name="ManageLabels" component={ManageLabelsScreen} />
    </Stack.Navigator>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Notes"
          options={{

            headerRight: () => (
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <Icon
                  name="search"
                  size={25}
                  color="#000"
                  style={styles.icon}
                />
              </View>
            ),
            headerTitle: 'Notes'
          }}
        >
          {props => <HomeStack {...props} searchQuery={searchQuery} />}
        </Drawer.Screen>
        <Drawer.Screen name="Labels" component={LabelsScreen} />
        <Drawer.Screen name="Folders" component={FoldersScreen} />
        <Drawer.Screen name="Trash" component={TrashScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    width: 250,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
});

export default App;
