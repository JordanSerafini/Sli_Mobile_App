import { Chantier } from "../../@types/chantier.type";
import { url } from "../url";

export const getChantiers = async () => {
    try {
        const response = await fetch(`${url.chantier}/chantiers`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chantiers:', error);
        throw error;
    }
    }