import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface InputFieldProps {
    label?: string;
    error?: string;
    type?: 'emailAddress' | 'password' | 'username';
    placeholder: string;
    value?: string;
    height?: number;
    width?: string;
    onBlur: () => void;
    onChangeText: (text: string) => void;
    multiline?: boolean;
    numberOfLines?: number;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    error,
    height = 11,
    width,
    placeholder,
    onBlur,
    value,
    onChangeText,
    multiline = false,
    numberOfLines = 1,
}) => {
    return (
        <View className={`${width ? width : 'w-full'} flex`}>
            {label && <Text className={'text-white text-lg'}>{label}:</Text>}
            <TextInput
                onBlur={onBlur}
                secureTextEntry={type === 'password'}
                keyboardType={
                    type === 'emailAddress' ? 'email-address' : 'default'
                }
                textAlignVertical="top"
                textContentType={type}
                className={`flex justify-center items-center h-${height} text-base text-justify border-0 rounded-lg border-secondary bg-gray-200 text-dark ${
                    multiline ? 'pt-2' : 'pt-0'
                } pb-0 px-3`}
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
