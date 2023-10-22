import React, { ErrorInfo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    ScrollView,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';
import useFloatingAnimation from '../../hooks/useFloatingAnimation';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
interface LoginProps {
    navigation: NavigationProp<any, any>;
}
//TODO: type navigation
const Login = ({ navigation }: LoginProps) => {
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
        },
    });

    const auth = FIREBASE_AUTH;
    const onSubmit = async (data: any) => {
        setLoading(true);

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            console.log(response);
        } catch (error: any) {
            console.log(error);
            alert('Something went wrong !' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#61cec2', '#29405c']} className="h-full">
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
        </LinearGradient>
    );
};

export default Login;
