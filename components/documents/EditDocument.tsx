import { useState } from "react";
import Editor from "./Editor";
import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDocument } from "types/Document.d";
import axios from "axios";
import { useRouter } from "next/router";

interface IProps {
  document: IDocument;
  reloadDocument: any;
}
export default function EditDocument({ document, reloadDocument }: IProps) {
  const [editorBody, setEditorBody] = useState(document.body);
  const [editorTitle, setEditorTitle] = useState(document.title);
  const [editorTopic, setEditorTopic] = useState(document.topic);

  const router = useRouter();

  const deleteDocument = async () => {
    try {
      const response = await axios.post("/api/documents/deleteDocument", {
        id: document.id,
      });
      router.push("/documents");
      // handle the successful response
    } catch (error) {
      console.error(error);
      // handle the error
    }
  };

  //save changes to the document by sending a request to the server
  const saveDocument = async () => {
    try {
      const newDocument: IDocument = {
        ...document,
        title: editorTitle,
        topic: editorTopic,
        body: editorBody,
      };
      const response = await axios.post("/api/documents/editDocument", {
        document: newDocument,
      });
      reloadDocument();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col justify-center items-center gap-4 relative">
        <div className="w-full flex-wrap flex justify-center items-center gap-4">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            value={editorTitle}
            onChange={(e: any) => setEditorTitle(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Topic"
            variant="outlined"
            size="small"
            sx={{ width: 200 }}
            value={editorTopic}
            onChange={(e: any) => setEditorTopic(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Editor content={editorBody} setContent={setEditorBody} />
        </div>
        <div className="flex gap-4 w-full justify-end">
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={deleteDocument}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveDocument}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
