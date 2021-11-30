import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import DashboardScreen from '../screens/DashboardScreen';
import GalleryScreen from '../screens/Galleries/GalleryScreen';
import ModalScreen from '../screens/ModalScreen';
import NewDocumentScreen from '../screens/NewDocumentScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PreviewDocumentScreen from '../screens/PreviewDocumentScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#CFE6FB',
        },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UploadDocument" component={DashboardScreen} />
      <Stack.Screen name="NewDocumentScreen" component={NewDocumentScreen} />
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={({ route }) => ({ title: route.params.type })}
      />
      <Stack.Screen
        name="PreviewDocumentScreen"
        component={PreviewDocumentScreen}
        options={{ title: 'Preview document' }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
