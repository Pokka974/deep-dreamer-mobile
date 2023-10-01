import React from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { Link } from 'react-router-dom';
import { ScrollView, Text, View } from 'react-native';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';

//TODO: type navigation
const Login = ({ navigation }) => {
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
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Welcome to Deep Dreamer</Text>
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
            <Button
                style="secondary"
                title="Sign Up"
                onPress={() => navigation.navigate('Register')}
            />
        </ScrollView>
    );
};

export default Login;
