import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native';
import InputField from '../../components/InputField/InputField';
import chatgptAPI from '../../api/chatgptAPI';
import TypingText from '../../components/TypingText/TypingText';
import BlinkingCursor from '../../components/BlinkingCursor/BlinkingCursor';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
interface FormData {
    dreamDescription: string;
}
import { UserContext } from '../../../App';

const HomeScreen = ({ navigation }: any) => {
    const user = useContext(UserContext);
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
        <LinearGradient colors={['#61cec2', '#29405c']} className="h-full">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView className="flex-1 p-4">
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <View className="flex-row self-start px-2 pt-4">
                                <TypingText
                                    className="text-justify"
                                    text={dreamInterpretation}
                                />
                                {loading && <BlinkingCursor />}
                            </View>
                        </ScrollView>
                        <View className="flex-row items-center justify-between gap-1 mx-4 absolute bottom-6">
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <InputField
                                        placeholder="Describe your dream..."
                                        onChangeText={onChange}
                                        value={value}
                                        width={'w-5/6'}
                                        onBlur={onBlur}
                                        multiline
                                    />
                                )}
                                name="dreamDescription"
                                rules={{
                                    required: 'This is required.',
                                }}
                            />
                            <TouchableOpacity
                                className="w-1/6 flex justify-center items-center mr-2 mb-2"
                                onPress={handleSubmit(callChatGPT)}
                            >
                                <Ionicons
                                    name="arrow-up-circle-sharp"
                                    size={45}
                                    color="#ff6290"
                                />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export default HomeScreen;
