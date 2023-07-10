import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface InputFieldProps {
    label?: string;
    error?: string;
    placeholder: string;
    value?: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
    numberOfLines?: number;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    placeholder,
    value,
    onChangeText,
    multiline = false,
    numberOfLines = 1,
}) => {
    return (
        <View className={'w-full mb-4 px-4'}>
            {label && <Text className={'text-white mb-2'}>{label}</Text>}
            <TextInput
                className={
                    'h-auto text-base text-justify border border-secondary bg-light text-dark rounded-xl px-4 py-2'
                }
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
            {error && <Text className={'text-primary mt-2'}>{error}</Text>}
        </View>
    );
};

export default InputField;
