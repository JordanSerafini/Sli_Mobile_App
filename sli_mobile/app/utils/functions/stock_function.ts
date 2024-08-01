import { url } from "../url";

export const getStockDocByID = async (DocumentId: string) => {
  const response = await fetch(`${url.api_gateway}/stock/stockdocdetails/${DocumentId}`);
  return response.json();
}

export const getStockDocPaginated = async ( limit: number, offset: number, searchQuery="") => {
  const response = await fetch(`${url.api_gateway}/stock/paginated?offset=${offset}&limit=${limit}&searchQuery=${searchQuery}`);
  return response.json();
}