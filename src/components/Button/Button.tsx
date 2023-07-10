import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface IButton {
    title: string;
    onPress: () => void;
    style: 'primary' | 'secondary';
}

const Button = ({ title, onPress, style }: IButton) => {
    const customColor = style === 'primary' ? 'bg-primary' : 'bg-secondary';

    return (
        <TouchableOpacity
            className={`${customColor} rounded-3xl py-3 px-12 items-center justify-center`}
            onPress={onPress}
        >
            <Text className="text-white font-{custom} font-bold text-base">
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
