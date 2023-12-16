import Constants from 'expo-constants';

const postChatGPT = async (userInput: string) => {
    try {
        const response = await fetch(
            `${Constants.expoConfig?.extra?.apiUrl}/chatgpt`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput }),
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
    postChatGPT,
};
