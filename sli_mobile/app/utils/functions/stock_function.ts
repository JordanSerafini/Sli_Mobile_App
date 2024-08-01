import { url } from "../url";

export const getStockDocByID = async (DocumentId: string) => {
  const response = await fetch(`${url.api_gateway}/stock/stockdocdetails/${DocumentId}`);
  return response.json();
}

export const getStockDocPaginated = async ( limit: number, offset: number, searchQuery="") => {
  const response = await fetch(`${url.api_gateway}/stock/paginated?offset=${offset}&limit=${limit}&searchQuery=${searchQuery}`);
  return response.json();
}

export const getStorehouse = async () => {
  const response = await fetch(`${url.api_gateway}/storehouse`);
  return response.json();
}

export const getStorehouseNameById = async (id: string) => {
  const response = await fetch(`${url.api_gateway}/stock/storehouse/${id}`);
  const data = await response.json();
  return data.Caption; }
  