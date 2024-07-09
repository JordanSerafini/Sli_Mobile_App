import { url } from "./url";
export const getCustomersPaginated = async (searchQuery = '', limit = 25, offset = 0) => {
    try {
      const response = await fetch(
        `${url.client}/customers/paginated?searchQuery=${searchQuery}&limit=${limit}&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  };
  