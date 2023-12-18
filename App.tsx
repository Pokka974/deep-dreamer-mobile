import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import CustomBottomTabBar from './src/components/BottomTabBar/CustomBottomTabBar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DreamJournal from './src/screens/DreamJournal/DreamJournal';
import Profile from './src/screens/Profile/Profile';
import * as Font from 'expo-font';

async function loadFonts() {
    await Font.loadAsync({
        Quicksand: require('./src/assets/fonts/Quicksand-Regular.ttf'),
        QuicksandBold: require('./src/assets/fonts/Quicksand-Bold.ttf'),
        QuicksandMedium: require('./src/assets/fonts/Quicksand-Medium.ttf'),
        QuicksandSemiBold: require('./src/assets/fonts/Quicksand-SemiBold.ttf'),
        QuicksandLight: require('./src/assets/fonts/Quicksand-Light.ttf'),
    });
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const UserContext = React.createContext(null);

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setUser(user as any);
            }
        });

        loadFonts();
    }, []);

    return (
        <UserContext.Provider value={user}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {user ? (
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name="Main"
                            component={DrawerNavigator}
                        />
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
        </UserContext.Provider>
    );
}

const BottomTabBar = (props: BottomTabBarProps) => {
    return <CustomBottomTabBar {...props} />;
};
function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <BottomTabBar {...props} />}
        >
            <Tab.Screen name="Dream Journal" component={DreamJournal} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Dream Journal" component={DreamJournal} />
            <Stack.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
}
