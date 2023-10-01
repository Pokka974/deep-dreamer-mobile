import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface InputFieldProps {
    label?: string;
    error?: string;
    placeholder: string;
    value?: string;
    onBlur: () => void;
    onChangeText: (text: string) => void;
    multiline?: boolean;
    numberOfLines?: number;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    placeholder,
    onBlur,
    value,
    onChangeText,
    multiline = false,
    numberOfLines = 1,
}) => {
    return (
        <View className={'w-full flex'}>
            {label && <Text className={'text-white mb-2'}>{label}</Text>}
            <TextInput
                onBlur={onBlur}
                className={
                    'flex justify-center items-center h-14 text-base placeholder:z-10 text-justify border-0 border-b-2 rounded-lg border-secondary bg-gray-200 text-dark pt-0 pb-0 px-3'
                }
                placeholder={placeholder}
                placeholderTextColor="#708090"
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
