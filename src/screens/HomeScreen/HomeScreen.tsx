import {
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import chatgptAPI from '../../api/chatgptAPI';
import TypingText from '../../components/TypingText/TypingText';
import BlinkingCursor from '../../components/BlinkingCursor/BlinkingCursor';

const HomeScreen = ({ navigation }: any) => {
    const [dreamDescription, setDreamDescription] = useState<string>('');
    const [dreamInterpretation, setDreamInterpretation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const callChatGPT = async (prompt: string) => {
        setDreamDescription('');
        setDreamInterpretation('');
        try {
            setLoading(true);
            const data = await chatgptAPI.postChatGPT(prompt);
            if (data && data.completion) {
                console.log(data.completion);

                setDreamInterpretation(data.completion);
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
                            <InputField
                                placeholder="Describe your dream..."
                                onChangeText={(text: string) => {
                                    setDreamDescription(text);
                                }}
                                value={dreamDescription}
                                multiline
                                numberOfLines={20}
                            />
                            <Button
                                disabled={loading}
                                title="Analyze my Dream"
                                onPress={() => {
                                    callChatGPT(dreamDescription);
                                }}
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
