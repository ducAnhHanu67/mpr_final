// In App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/homeScreen';
import LabelsScreen from './screens/lableScreen';
import FoldersScreen from './screens/foldersScreen';
import TrashScreen from './screens/trashScreen';
import NewNoteScreen from './screens/newNoteScreen';
import EditNoteScreen from './screens/editNoteScreen';
import ManageLabelsScreen from './screens/manageLabelsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NewNote" component={NewNoteScreen} />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
      <Stack.Screen name="ManageLabels" component={ManageLabelsScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Notes" component={HomeStack} />
        <Drawer.Screen name="Labels" component={LabelsScreen} />
        <Drawer.Screen name="Folders" component={FoldersScreen} />
        <Drawer.Screen name="Trash" component={TrashScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
