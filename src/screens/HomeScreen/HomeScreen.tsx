import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import chatgptAPI from '../../api/chatgptAPI';
import dalleEAPI from '../../api/dalleEAPI';
import BlinkingCursor from '../../components/BlinkingCursor/BlinkingCursor';
import InputField from '../../components/InputField/InputField';
import TypingText from '../../components/TypingText/TypingText';
import { getToken } from '../../utils/manageToken';
interface FormData {
    dreamDescription: string;
}

const HomeScreen = ({ navigation }: any) => {
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [dreamDescription, setDreamDescription] = useState<string>('');
    const [dreamId, setDreamId] = useState<number>();
    const [dreamInterpretation, setDreamInterpretation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDallE, setLoadingDalleE] = useState<boolean>(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const callChatGPT = async (data: FormData) => {
        const { dreamDescription } = data;
        setDreamDescription(dreamDescription);
        setDreamInterpretation('');
        try {
            setLoading(true);
            const token = await fetchToken();

            const response = await chatgptAPI.postChatGPT(
                dreamDescription,
                token,
            );

            if (response && response.interpretation) {
                setDreamInterpretation(response.interpretation);
                setDreamId(response.id);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const generateImage = async (dreamInterpretation: string) => {
        setLoadingDalleE(true);
        try {
            const dreamSummary = dreamInterpretation.split(':')[0];
            const dream =
                dreamSummary && dreamSummary.length
                    ? dreamSummary
                    : dreamInterpretation;
            const token = await fetchToken();

            if (!dreamId) {
                throw new Error('No related Dream ID');
            }
            const response = await dalleEAPI.generateDallE(
                dream,
                dreamId!,
                token,
            );

            if (response && response.url) {
                console.log(response);
                setLoadingDalleE(false);
                return response.url;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchToken = async () => {
        const token = await getToken();

        if (!token) {
            setDreamInterpretation('Impossible to process this dream :(');
            setLoading(false);
            throw new Error('Impossible to get token');
        }

        return token;
    };

    const restart = () => {
        reset();
        setValue('dreamDescription', '');
        setLoading(false);
        setLoadingDalleE(false);
        setDreamDescription('');
        setDreamInterpretation('');
    };

    return (
        <SafeAreaView className="h-full  bg-dark">
            <TouchableWithoutFeedback
                className="flex-1"
                onPress={Keyboard.dismiss}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    className="flex-1 w-full pt-5"
                >
                    <View
                        className={`flex-1 px-3 pt-12 ${
                            dreamInterpretation &&
                            'bg-stone-200 m-5 p-3 rounded-lg  text-black min-h-[200px]'
                        }`}
                    >
                        {dreamInterpretation ? (
                            <>
                                <Text className="flex flex-row items-center h-10 font-quicksandBold text-lg">
                                    What it means:
                                </Text>
                                <ScrollView
                                    className="flex-4 text-start my-2"
                                    keyboardShouldPersistTaps="handled"
                                    ref={scrollViewRef}
                                    onContentSizeChange={() =>
                                        scrollViewRef.current?.scrollToEnd({
                                            animated: true,
                                        })
                                    }
                                    showsVerticalScrollIndicator={false}
                                >
                                    <TypingText
                                        className="text-justify"
                                        text={dreamInterpretation}
                                    />
                                </ScrollView>
                                <View className="h-10 flex-row justify-around items-center">
                                    <TouchableOpacity
                                        onPress={() => restart()}
                                        className="h-11 border px-3 py-3 border-gray-700 rounded-md"
                                    >
                                        <Text className="font-quicksandBold">
                                            Try again?
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={loadingDallE}
                                        onPress={() =>
                                            generateImage(dreamInterpretation)
                                        }
                                        className={`h-11 border px-3 py-3 border-gray-700 ${
                                            loadingDallE
                                                ? ' bg-gray-500'
                                                : 'bg-[#4b6384]'
                                        }  rounded-md`}
                                    >
                                        <Text className="font-quicksandBold text-slate-200">
                                            Save the dream
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            loading && <BlinkingCursor />
                        )}
                    </View>
                    <View className="flex flex-row items-center justify-between px-3">
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View className="w-[80%]">
                                    <InputField
                                        placeholder="Describe your dream..."
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        multiline
                                    />
                                </View>
                            )}
                            name="dreamDescription"
                            rules={{
                                required: 'This is required.',
                            }}
                        />
                        <TouchableOpacity
                            className="flex justify-center items-center"
                            onPress={handleSubmit(callChatGPT)}
                            disabled={loading}
                        >
                            <Ionicons
                                name="arrow-up-circle-sharp"
                                size={50}
                                color="#F4F5F7"
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default HomeScreen;
