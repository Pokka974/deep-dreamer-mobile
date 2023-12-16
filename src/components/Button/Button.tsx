import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface IButton {
    title: string;
    onPress: () => void;
    style?: string;
    disabled?: boolean;
}

const Button = ({ title, onPress, style, disabled = false }: IButton) => {
    const customColor = disabled
        ? 'bg-secondary opacity-50'
        : style === 'primary'
        ? 'bg-[#ff6290]'
        : 'bg-highlight';

    return (
        <TouchableOpacity
            disabled={disabled}
            className={`${customColor} h-14 w-full rounded-lg shadow-md  py-3 mb-2 items-center justify-center disabled:`}
            onPress={onPress}
        >
            <Text className="text-contrast font-bold text-base">{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
