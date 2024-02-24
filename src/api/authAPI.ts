import Constants from 'expo-constants';

export const register = async (email: string, password: string) => {
    try {
        const response = await fetch(
            `${Constants.expoConfig?.extra?.apiUrl}/auth/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            },
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
        console.log(Constants.expoConfig?.extra?.apiUrl);
        const response = await fetch(
            `${Constants.expoConfig?.extra?.apiUrl}/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            },
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
};
