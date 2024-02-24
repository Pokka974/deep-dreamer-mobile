import Constants from 'expo-constants';

const postChatGPT = async (prompt: string, token: string) => {
    try {
        const response = await fetch(
            `${Constants.expoConfig?.extra?.apiUrl}/chatgpt`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ prompt }),
            },
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
};

export default {
    postChatGPT,
};
