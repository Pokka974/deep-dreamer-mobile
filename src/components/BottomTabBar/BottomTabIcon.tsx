import { View, Text } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
type Props = {
    route: string;
    isFocused: boolean;
};

const BottomTabIcon = ({ route, isFocused }: Props) => {
    const renderIcon = (route: string, isFocused: boolean) => {
        let height: number = 34;
        let width: number = 34;

        switch (route) {
            case 'Home':
                return (
                    <Feather
                        name="home"
                        size={height}
                        color={isFocused ? '#7db4b4' : 'white'}
                    />
                );
            case 'Dream Journal':
                return (
                    <MaterialCommunityIcons
                        name="sleep"
                        size={height}
                        color={isFocused ? '#7db4b4' : 'white'}
                    />
                );
            case 'Profile':
                return (
                    <AntDesign
                        name="profile"
                        size={height}
                        color={isFocused ? '#7db4b4' : 'white'}
                    />
                );
        }
    };
    return <View>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;
