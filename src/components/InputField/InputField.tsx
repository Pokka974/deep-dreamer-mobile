import React, { useState } from 'react';
import { View, TextInput, Text, Platform } from 'react-native';

interface InputFieldProps {
    label?: string;
    error?: string;
    type?: 'emailAddress' | 'password' | 'username';
    placeholder: string;
    value?: string;
    height?: string;
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
    height,
    width,
    placeholder,
    onBlur,
    value,
    onChangeText,
    multiline,
}) => {
    const [inputHeight, setInputHeight] = useState(50);
    const [isFocused, setIsFocused] = useState(false);

    const handleContentSizeChange = (event: any) => {
        const { height } = event.nativeEvent.contentSize;
        const maxHeight = 100; // Maximum height for 5 lines, adjust as needed
        setInputHeight(height < maxHeight ? height : maxHeight);
    };

    return (
        <View className={`w-full flex`}>
            {label && <Text className={'text-white text-lg'}>{label}:</Text>}
            <TextInput
                onBlur={onBlur}
                secureTextEntry={type === 'password'}
                keyboardType={
                    type === 'emailAddress' ? 'email-address' : 'default'
                }
                textAlignVertical="center"
                onFocus={() => setIsFocused(true)}
                textContentType={type}
                className={`flex justify-center items-center font-quicksand h-[${Math.max(
                    50,
                    inputHeight,
                )}px] text-base rounded-xl border bg-stone-200 text-dark pl-3 ${
                    multiline ? 'pt-3' : 'pt-0'
                } pb-0 px-3 ${Platform.OS === 'ios' ? 'py-3' : 'py-0'}}`}
                placeholder={placeholder}
                placeholderTextColor="#708090"
                value={value}
                onContentSizeChange={handleContentSizeChange}
                onChangeText={onChangeText}
                multiline
            />
            {error && <Text className={'text-primary mt-2'}>{error}</Text>}
        </View>
    );
};

export default InputField;
