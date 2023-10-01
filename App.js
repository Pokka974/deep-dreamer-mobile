import HomeScreen from './src/screens/HomeScreen/HomeScreen.tsx';
import Login from './src/screens/Auth/Login.tsx';
import Register from './src/screens/Auth/Register.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
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
