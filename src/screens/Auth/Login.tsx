import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { login } from '../../api/authAPI';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import useFloatingAnimation from '../../hooks/useFloatingAnimation';
import authContext from '../../utils/authContext';
import { saveToken } from '../../utils/manageToken';
interface LoginProps {
    navigation: NavigationProp<any, any>;
}
//TODO: type navigation
const Login = ({ navigation }: LoginProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuthenticated } = useContext(authContext);
    const floatingStyle = useFloatingAnimation(1500);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: any) => {
        setLoading(true);

        try {
            const response = await login(data.email, data.password);

            if (!response) {
                throw new Error();
            }

            saveToken(response.token);
            setAuthenticated(true);
        } catch (error: any) {
            console.error(error);
            alert('Something went wrong !' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="h-full bg-dark">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    className="p-4"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 100,
                    }}
                >
                    <Animated.Image
                        source={require('../../assets/dream-catcher-logo.webp')}
                        style={[{ width: 300, height: 400 }, floatingStyle]}
                    ></Animated.Image>
                    <Text className="pb-4 text-3xl font-thin text-light ">
                        Welcome
                    </Text>
                    <View className="w-full mb-2">
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <InputField
                                    label="Email"
                                    type="emailAddress"
                                    placeholder="Email"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    error={errors.email && 'email is required'}
                                />
                            )}
                            name="email"
                            rules={{ required: 'Email is required.' }}
                        />
                    </View>
                    <View className="w-full mb-4">
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <InputField
                                    label="Password"
                                    type="password"
                                    placeholder="Password"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    error={
                                        errors.password &&
                                        'password is required'
                                    }
                                />
                            )}
                            name="password"
                            rules={{ required: 'Password is required.' }}
                        />
                    </View>
                    <Button
                        title="Login"
                        onPress={handleSubmit(onSubmit)}
                        disabled={false}
                        style="primary"
                    />
                    <Text
                        className="pt-2 underline text-light"
                        onPress={() => {}}
                    >
                        Forgot password?
                    </Text>
                    <Text
                        className="pt-2 text-base font-semibold text-light"
                        onPress={() => navigation.navigate('Register')}
                    >
                        Register
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;
