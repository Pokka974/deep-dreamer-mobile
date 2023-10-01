import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    ScrollView,
    View,
    Text,
} from 'react-native';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import chatgptAPI from '../../api/chatgptAPI';
import TypingText from '../../components/TypingText/TypingText';
import BlinkingCursor from '../../components/BlinkingCursor/BlinkingCursor';

interface FormData {
    dreamDescription: string;
}

const HomeScreen = ({ navigation }: any) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [dreamInterpretation, setDreamInterpretation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const callChatGPT = async (data: FormData) => {
        const { dreamDescription } = data;
        setDreamInterpretation('');
        try {
            setLoading(true);
            const response = await chatgptAPI.postChatGPT(dreamDescription);
            if (response && response.completion) {
                console.log(response.completion);
                setDreamInterpretation(response.completion);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className="flex-1 bg-dark">
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View className="w-full items-center justify-start px-4 pt-6">
                            <Text className="text-light text-2xl">
                                Welcome dreamer! Ready to explore your dreams?
                            </Text>
                            <View className="flex-row self-start px-2 pt-4">
                                <TypingText
                                    className="text-justify"
                                    text={dreamInterpretation}
                                />
                                {loading && <BlinkingCursor />}
                            </View>
                        </View>
                        <View className="w-full items-center justify-center flex-1">
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <InputField
                                        placeholder="Describe your dream..."
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        error={errors.dreamDescription?.message}
                                        multiline
                                        numberOfLines={20}
                                    />
                                )}
                                name="dreamDescription"
                                rules={{ required: 'This is required.' }}
                            />
                            <Button
                                disabled={loading}
                                title="Analyze my Dream"
                                onPress={handleSubmit(callChatGPT)}
                                style="primary"
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default HomeScreen;
