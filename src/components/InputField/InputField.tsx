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
        <View className={'w-full mb-4 flex'}>
            {label && <Text className={'text-white mb-2'}>{label}</Text>}
            <TextInput
                onBlur={onBlur}
                className={
                    'flex justify-center items-center h-14 text-base placeholder:text-justify text-justify border border-secondary bg-light text-dark rounded-3xl pt-0 pb-0 px-3'
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
