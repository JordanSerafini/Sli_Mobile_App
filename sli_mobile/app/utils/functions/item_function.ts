import { Item } from "../../@types/item.type";
import { url } from "../url";
import { postLogs } from "./logs_function";

export const getItem = async () => {
    try {
        const response = await fetch(`${url.item}/items`);
        if (!response.ok) {
            const error = new Error('Network response was not ok');
            await postLogs(error);
            throw error;
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        await postLogs(error);
        console.error('Error fetching items:', error);
        throw error;
    }
};

export const getItemPaginated = async (limit: number, offset: number, searchQuery: string) => {
    try {
        const response = await fetch(`${url.item}/items/paginated?limit=${limit}&offset=${offset}&searchQuery=${searchQuery}`);
        if (!response.ok) {
            const error = new Error('Network response was not ok');
            await postLogs(error);
            throw error;
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        await postLogs(error);
        console.error('Error fetching items paginated:', error);
        throw error;
    }
};

export const addItem = async (item: Item) => {
    try {
        const response = await fetch(`${url.item}/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        if (!response.ok) {
            const error = new Error('Network response was not ok');
            await postLogs(error);
            throw error;
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        await postLogs(error);
        console.error('Error adding item:', error);
        throw error;
    }
};

export const getItemById = async (id: number) => {
    try {
        const response = await fetch(`${url.item}/item/${id}`);
        if (!response.ok) {
            const error = new Error('Network response was not ok');
            await postLogs(error);
            throw error;
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        await postLogs(error);
        console.error('Error fetching item by ID:', error);
        throw error;
    }
};
