import { url } from "../url";

export const getStockDocByID = async (DocumentId: string) => {
  const response = await fetch(`${url}/stockdocdetails/${DocumentId}`);
  return response.json();
}