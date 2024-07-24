import { url } from "../url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postLogs = async (error: any) => {
    console.log('Sending log:', error);

    try {
        const user = await AsyncStorage.getItem('user');
        console.log('Retrieved user from AsyncStorage in postLogs:', user);
        const parsedUser = user ? JSON.parse(user) : null;

        const formattedError = {
            message: error.message || 'Unknown error',
            stack: error.stack || '',
            url: error.config?.url || 'No URL',
            method: error.config?.method || 'No method',
            user: parsedUser ? parsedUser.email : 'Unknown user',
            rawError: JSON.stringify(error, Object.getOwnPropertyNames(error)),
            timestamp: new Date().toISOString(),
        };

        console.log('Formatted error to be sent:', formattedError);

        const response = await fetch(`${url.api_gateway}/logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedError)
        });

        const data = await response.text();
        console.log('Raw response from API:', data);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return data;
    } catch (loggingError) {
        console.error('Error sending log:', loggingError);
        throw loggingError;
    }
};
