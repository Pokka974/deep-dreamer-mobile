import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, Text, View, Image } from 'react-native';
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
            <Image
                source={require('../../assets/deep-catcher-logo.png')}
                style={{ width: 200, height: 300 }}
            ></Image>
            <Text className="pb-8 text-3xl font-bold">Deep Dreamer</Text>
            <View className="w-full mb-4">
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
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
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            placeholder="Password"
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                            error={errors.password && 'password is required'}
                        />
                    )}
                    name="password"
                    rules={{ required: 'Password is required.' }}
                />
            </View>
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
