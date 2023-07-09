import { View, Text, Button } from 'react-native';
import React from 'react';

const HomeScreen = ({ navigation }: any) => {
    return (
        <View>
            <Text className="text-6xl">HomeScreen</Text>
            <Button
                title="a button"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

export default HomeScreen;
