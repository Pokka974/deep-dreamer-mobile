import { View, Text } from 'react-native';
import React from 'react';
import Button from '../../components/Button/Button';
import { useFonts } from 'expo-font';

const HomeScreen = ({ navigation }: any) => {
    const [fontsLoaded] = useFonts({
        Roboto: require('../../../assets/fonts/Roboto/Roboto-Regular.ttf'),
    });

    return (
        <View className="flex justify-center items-center h-screen bg-dark">
            <Text className="font-fo text-white text-6xl">HomeScreen</Text>
            <Button title="My Button" onPress={() => {}} style="primary" />
        </View>
    );
};

export default HomeScreen;
