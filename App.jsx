import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig.ts';

const Stack = createNativeStackNavigator();
export const UserContext = React.createContext();

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {user ? (
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name="Home"
                            component={HomeScreen}
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
