import HomeScreen from './src/screens/HomeScreen/HomeScreen.tsx';
import Login from './src/screens/Auth/Login.tsx';
import Register from './src/screens/Auth/Register.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

const Stack = createNativeStackNavigator();
export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'Quick-Kiss': require('./src/assets/fonts/QuickKiss.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <NavigationContainer onLayout={onLayoutRootView}>
            <Stack.Navigator>
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
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Home"
                    component={HomeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
