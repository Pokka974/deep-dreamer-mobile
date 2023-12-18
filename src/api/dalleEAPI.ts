import Constants from 'expo-constants';

const generateDallE = async (dreamDescription: string) => {
    try {
        const response = await fetch(
            `${Constants.expoConfig?.extra?.apiUrl}/dalle`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dreamDescription }),
            },
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.log('Fetch Error:', error);
        throw error;
    }
};

export default {
    generateDallE,
};
