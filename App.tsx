import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-gesture-handler';
import CustomDrawer from './src/components/CustomDrawer/CustomDrawer';
import DreamDetails from './src/components/DreamDetails/DreamDetails';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import DreamJournal from './src/screens/DreamJournal/DreamJournal';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import Profile from './src/screens/Profile/Profile';
import authContext from './src/utils/authContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    async function loadFonts() {
        await Font.loadAsync({
            Quicksand: require('./src/assets/fonts/Quicksand-Regular.ttf'),
            QuicksandBold: require('./src/assets/fonts/Quicksand-Bold.ttf'),
            QuicksandMedium: require('./src/assets/fonts/Quicksand-Medium.ttf'),
            QuicksandSemiBold: require('./src/assets/fonts/Quicksand-SemiBold.ttf'),
            QuicksandLight: require('./src/assets/fonts/Quicksand-Light.ttf'),
        });

        setFontsLoaded(true);
    }

    useEffect(() => {
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <authContext.Provider value={{ authenticated, setAuthenticated }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {authenticated ? (
                        <>
                            <Stack.Screen
                                options={{ headerShown: false }}
                                name="Main"
                                component={DrawerNavigator}
                            />
                            <Stack.Screen
                                options={{ headerShown: false }}
                                name="DreamDetails"
                                component={DreamDetails}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                options={{ headerShown: false }}
                                name="Login"
                                component={Login}
                            />
                            <Stack.Screen
                                options={{ headerShown: false }}
                                name="Register"
                                component={Register}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </authContext.Provider>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerTransparent: true, // Make the header transparent
                headerTitle: '', // Remove the title
                headerTintColor: '#fff', // Set the color of header buttons and title
                headerStyle: {
                    backgroundColor: 'transparent', // Ensure background is transparent
                    elevation: 0, // Remove shadow on Android
                    shadowOpacity: 0, // Remove shadow on iOS
                },
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Dream Journal" component={DreamJournal} />
            <Stack.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
}
