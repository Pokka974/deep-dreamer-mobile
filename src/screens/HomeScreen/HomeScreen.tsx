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
import React from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';

const HomeScreen = ({ navigation }: any) => {
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
                            <Text className="text-white text-2xl">
                                Welcome dreamer! Ready to explore your dreams?
                            </Text>
                        </View>
                        <View className="w-full items-center justify-center flex-1">
                            <InputField
                                placeholder="Describe your dream..."
                                onChangeText={() => {}}
                                multiline
                                numberOfLines={20}
                            />
                            <Button
                                title="Analyze my Dream"
                                onPress={() => {}}
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
