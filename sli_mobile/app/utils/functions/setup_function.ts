import { getCustomersPaginated } from './customer_functions';
import { getItemPaginated } from './item_function';

export const setup = async () => {
  try {
    await getCustomersPaginated("", 25, 0);
    await getItemPaginated("", 25, 0);
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
};