import axios from "axios";
import { IDocument } from "types/Document.d";

export const editDocument = async (document: IDocument) => {
  try {
    const response = await axios.post("/api/documents/editDocument", {
      document: document,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteDocument = async (id: string) => {
  try {
    const response = await axios.post("/api/documents/deleteDocument", {
      id: id,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
