import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface IButton {
    title: string;
    onPress: () => void;
    style: 'primary' | 'secondary';
    disabled?: boolean;
}

const Button = ({ title, onPress, style, disabled = false }: IButton) => {
    const customColor = disabled
        ? 'bg-secondary opacity-50'
        : style === 'primary'
        ? 'bg-primary'
        : 'bg-secondary';

    return (
        <TouchableOpacity
            disabled={disabled}
            className={`${customColor} rounded-3xl py-3 px-12 items-center justify-center disabled:`}
            onPress={onPress}
        >
            <Text className="text-white font-{custom} font-bold text-base">
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;