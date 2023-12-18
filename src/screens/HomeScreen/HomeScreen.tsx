import React, { useContext, useRef, useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import InputField from '../../components/InputField/InputField';
import chatgptAPI from '../../api/chatgptAPI';
import dalleEAPI from '../../api/dalleEAPI';
import TypingText from '../../components/TypingText/TypingText';
import BlinkingCursor from '../../components/BlinkingCursor/BlinkingCursor';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
interface FormData {
    dreamDescription: string;
}
import { UserContext } from '../../../App';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../firebaseConfig';

const HomeScreen = ({ navigation }: any) => {
    const user: any = useContext(UserContext);
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [dreamDescription, setDreamDescription] = useState<string>('');
    const [dreamInterpretation, setDreamInterpretation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [dreamSaving, setDreamSaving] = useState<boolean>(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollViewRef2 = useRef<ScrollView>(null);

    const callChatGPT = async (data: FormData) => {
        const { dreamDescription } = data;
        setDreamDescription(dreamDescription);
        setDreamInterpretation('');
        try {
            setLoading(true);
            const response = await chatgptAPI.postChatGPT(dreamDescription);
            if (response && response.completion) {
                setDreamInterpretation(response.completion);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const generateImage = async (dreamDescription: string) => {
        try {
            const response = await dalleEAPI.generateDallE(dreamDescription);

            if (response && response.url) {
                return response.url;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const saveTheDream = async () => {
        try {
            setDreamSaving(true);
            const docRef = await addDoc(collection(FIRESTORE_DB, 'dreams'), {
                createdAt: new Date(),
                dreamImageURL: await generateImage(dreamDescription),
                userId: user?.uid,
                dreamDescription,
                dreamInterpretation,
            });

            if (docRef) {
                setDreamSaving(false);
            }
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const restart = () => {
        reset();
        setValue('dreamDescription', '');
        setDreamSaving(false);
        setDreamDescription('');
        setDreamInterpretation('');
    };

    return (
        <LinearGradient
            colors={['#4b6384', '#7db4b4', '#f2e5e5']}
            className="h-full"
        >
            <TouchableWithoutFeedback
                className="flex-1"
                onPress={Keyboard.dismiss}
            >
                <KeyboardAvoidingView
                    keyboardVerticalOffset={80}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    className="flex-1 w-full"
                >
                    <View
                        className={`flex-1 p-4 ${
                            dreamInterpretation &&
                            'bg-stone-200 m-5 p-3 rounded-lg  text-black min-h-[200px]'
                        }`}
                    >
                        {dreamInterpretation ? (
                            <>
                                {/* <ScrollView
                                    className="flex items-center my-2"
                                    keyboardShouldPersistTaps="handled"
                                    ref={scrollViewRef}
                                    onContentSizeChange={() =>
                                        scrollViewRef.current?.scrollToEnd({
                                            animated: true,
                                        })
                                    }
                                    showsVerticalScrollIndicator={false}
                                >
                                    <Text className="text-justify italic">
                                        {dreamDescription}
                                    </Text>
                                </ScrollView> */}
                                <Text className="flex flex-row items-center h-10 font-quicksandBold text-lg">
                                    What it means:
                                </Text>
                                <ScrollView
                                    className="flex-4 text-start my-2"
                                    keyboardShouldPersistTaps="handled"
                                    ref={scrollViewRef2}
                                    onContentSizeChange={() =>
                                        scrollViewRef2.current?.scrollToEnd({
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
                                        disabled={dreamSaving}
                                        onPress={() => saveTheDream()}
                                        className={`h-11 border px-3 py-3 border-gray-700 ${
                                            dreamSaving
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
                    <View className="flex flex-row items-center justify-between p-5">
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
                            className="flex justify-center items-center "
                            onPress={handleSubmit(callChatGPT)}
                            disabled={dreamSaving}
                        >
                            <Ionicons
                                name="arrow-up-circle-sharp"
                                size={50}
                                color="#4b6384"
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </LinearGradient>
    );
};

export default HomeScreen;
