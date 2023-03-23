import { useState, useEffect } from "react";
import axios from "axios";
import { ICreateDocument, IDocument } from "types/Document.d";
import useAlertStore from "stores/alertStore";
import { IUser } from "types/User.d";
import { Router, useRouter } from "next/router";

/**
 * @author Tom Whitticase
 *
 * @description This hook is used to get documents from the database.
 *
 * @input {number} id - The id of the document to get
 *
 * @output {IDocument[]} documents - All documents
 * @output {IDocument} document - The document with the given id
 * @output {boolean} loading - Whether the documents are still loading
 * @output {boolean} loadingCreateDocument - Whether the create document request is still loading
 * @output {boolean} loadingEditDocument - Whether the edit document request is still loading
 * @output {boolean} loadingDeleteDocument - Whether the delete document request is still loading
 * @output {function} createDocument - Function to create a document
 * @output {function} editDocument - Function to edit a document
 * @output {function} deleteDocument - Function to delete a document
 *
 * when given an id it will return the document with that id, if not given id then it fetches all documents
 */

//if id given then get single document, if not then get all documents
export function useDocuments(id?: number) {
  const [documents, setDocuments] = useState<IDocument[]>([]); //all documents
  const [document, setDocument] = useState<IDocument | null>(); //document with given id
  const [loading, setLoading] = useState(true);
  const [loadingCreateDocument, setLoadingCreateDocument] = useState(false);
  const [loadingEditDocument, setLoadingEditDocument] = useState(false);
  const [loadingDeleteDocument, setLoadingDeleteDocument] = useState(false);
  const { addAlert } = useAlertStore();

  const router = useRouter();

  async function fetchData() {
    setLoading(true);
    if (id) {
      try {
        const response = await axios.post("/api/documents/getDocument", {
          id,
        });
        const { data } = response;
        setDocument(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post("/api/documents/getDocuments");
        const { data } = response;
        setDocuments(data);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const editDocument = async (document: IDocument) => {
    setLoadingEditDocument(true);
    try {
      const response = await axios.post("/api/documents/editDocument", {
        document: document,
      });
      setLoadingEditDocument(false);
      addAlert("Successfully edited document", "success");
      fetchData();
    } catch (error) {
      console.error(error);
      setLoadingEditDocument(false);
    }
  };

  const deleteDocument = async (id: number) => {
    setLoadingDeleteDocument(true);
    try {
      console.log("deleting document ", id);
      const response = await axios.post("/api/documents/deleteDocument", {
        id: id,
      });
      setLoadingDeleteDocument(false);
      addAlert("Successfully deleted document", "success");
      router.push("/documents");
    } catch (error) {
      console.error(error);
      setLoadingDeleteDocument(false);
    }
  };

  const createDocument = async (newDocument: ICreateDocument) => {
    setLoadingCreateDocument(true);
    try {
      const response = await axios.post(
        "/api/documents/createDocument",
        newDocument
      );
      addAlert("Document created successfully", "success");
      setLoadingCreateDocument(false);
      fetchData();
    } catch (error) {
      setLoadingCreateDocument(false);
      console.error(error);
    }
  };

  return {
    documents,
    document,
    loading,
    editDocument,
    deleteDocument,
    createDocument,
    loadingEditDocument,
    loadingCreateDocument,
    loadingDeleteDocument,
  };
}
