import { Customer } from "../../@types/customer.type";
import { url } from "../url";

export const getAllCustomers = async () => {
    try {
        const response = await fetch(`${url.api_gateway}/clients`);
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

export const getCustomerById = async (id: number) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching customer by ID:', error);
        throw error;
    }
};

export const getCustomerByName = async (name: string) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients/${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching customer by name:', error);
        throw error;
    }
};

export const getCustomersPaginated = async (searchQuery: string, limit: number, offset: number) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients/paginated?searchQuery=${searchQuery}&limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching paginated customers:', error);
        throw error;
    }
};


export const createCustomer = async (customer: Customer) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
};

export const updateCustomerById = async (id: number, customer: Customer) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating customer by ID:', error);
        throw error;
    }
};

export const deleteCustomerById = async (id: number) => {
    try {
        const response = await fetch(`${url.api_gateway}/clients/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting customer by ID:', error);
        throw error;
    }
};

export const getCustomersCluster = async ( latCentral: number, lonCentral: number, rayonM: number) => {
    try {
      const response = await fetch(
        `${url.api_gateway}/clients/cluster?latCentral=${latCentral}&lonCentral=${lonCentral}&rayonM=${rayonM}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching customers cluster:', error);
      throw error;
    }
    
  };

  