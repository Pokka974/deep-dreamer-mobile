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
            className={`${customColor} h-14 w-full rounded-lg shadow-md shadow-[#ff6290] py-3 mb-2 items-center justify-center disabled:`}
            onPress={onPress}
        >
            <Text className="text-white font-{custom} font-bold text-base">
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
