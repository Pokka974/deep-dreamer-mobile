import { ScrollView, Text, Image } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

const Register = ({ navigation }: any) => {
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

    const onSubmit = (data: any) => console.log(data);
    return (
        <ScrollView
            className="p-4"
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
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                        placeholder="Confirm password"
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                    />
                )}
                name="confirmpassword"
                rules={{ required: 'Password is required.' }}
            />
            <Button
                title="Register"
                onPress={handleSubmit(onSubmit)}
                style="primary"
                disabled={false}
            />
            <Text
                className="pt-2 text-base  font-semibold"
                onPress={() => navigation.navigate('Login')}
            >
                Already have an account?
            </Text>
        </ScrollView>
    );
};

export default Register;
