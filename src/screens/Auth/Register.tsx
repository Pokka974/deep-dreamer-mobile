import {
    ScrollView,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { LinearGradient } from 'expo-linear-gradient';
import useFloatingAnimation from '../../hooks/useFloatingAnimation';
import { Animated } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

interface RegisterProps {
    navigation: NavigationProp<any, any>;
}

const Register = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const floatingStyle = useFloatingAnimation(1500);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmpassword: '',
        },
    });
    const auth = getAuth();

    const onSubmit = async (data: any) => {
        if (data.password !== data.confirmpassword)
            return alert('passwords do not match');

        setLoading(true);

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            alert('Check your email!');
        } catch (error: any) {
            console.log(error);
            alert('Something went wrong !' + error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <LinearGradient
            colors={['#4b6384', '#7db4b4', '#f2e5e5']}
            className="h-full"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    className="p-4"
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
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
                    <Text className="pb-4 text-3xl font-thin text-light">
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
                                    placeholder="Email"
                                    type="emailAddress"
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
                    <View className="w-full mb-2">
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
                    <View className="w-full mb-4">
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm password"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    error={
                                        errors.confirmpassword &&
                                        'password confirmation is required'
                                    }
                                />
                            )}
                            name="confirmpassword"
                            rules={{ required: 'Password is required.' }}
                        />
                    </View>
                    <Button
                        title="Register"
                        onPress={handleSubmit(onSubmit)}
                        style="primary"
                        disabled={false}
                    />
                    <Text
                        className="pt-2 text-light font-semibold"
                        onPress={() => navigation.navigate('Login')}
                    >
                        Already have an account?
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export default Register;
