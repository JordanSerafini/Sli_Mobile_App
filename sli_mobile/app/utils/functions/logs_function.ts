import { url } from "../url";

export const postLogs = async (error: string) => {
    console.log('Sending log:', error);
    try {
        const response = await fetch(`${url.api_gateway}/logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error })
        });

        const data = await response.text();
        console.log('Raw response from API:', data);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return data;
    } catch (error) {
        console.error('Error sending log:', error);
        throw error;
    }
};
