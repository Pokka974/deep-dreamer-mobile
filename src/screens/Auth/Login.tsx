import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, Text, Image } from 'react-native';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';

//TODO: type navigation
const Login = ({ navigation }: any) => {
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

    const onSubmit = (data: any) => console.log(data);

    return (
        <ScrollView
            className="p-4 bg-light"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
            }}
        >
            <Text className="pb-8 text-lg">Welcome to Deep Dreamer</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                        placeholder="Email"
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                    />
                )}
                name="email"
                rules={{ required: 'Email is required.' }}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                        placeholder="Password"
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                    />
                )}
                name="password"
                rules={{ required: 'Password is required.' }}
            />
            <Button
                title="Login"
                onPress={handleSubmit(onSubmit)}
                style="primary"
                disabled={false}
            />
            <Text className="pt-2 underline" onPress={() => {}}>
                Forgot password?
            </Text>
            <Text
                className="pt-2 text-base  font-semibold"
                onPress={() => navigation.navigate('Register')}
            >
                Sign Up
            </Text>
        </ScrollView>
    );
};

export default Login;
