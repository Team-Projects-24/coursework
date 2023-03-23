import { useState } from "react";
import Editor from "./Editor";
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDocument } from "types/Document.d";
import { useRouter } from "next/router";
import ContentLoader from "react-content-loader";

/**
 * @author Tom Whitticase
 *
 * @description This component provides the UI for editing a document.
 */

interface IProps {
  document: IDocument;
  editDocument: any;
  loadingEditDocument: boolean;
  deleteDocument: any;
  loadingDeleteDocument: boolean;
}

export default function EditDocument({
  document,
  editDocument,
  loadingEditDocument,
  deleteDocument,
  loadingDeleteDocument,
}: IProps) {
  // State to store the values of the text fields
  const [editorBody, setEditorBody] = useState(document.body);
  const [editorTitle, setEditorTitle] = useState(document.title);
  const [editorTopic, setEditorTopic] = useState(document.topic);

  const [titleError, setTitleError] = useState(false);
  const [topicError, setTopicError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const [category, setCategory] = useState<"TECHNICAL" | "NONTECHNICAL">(
    "TECHNICAL"
  );

  // Router hook to redirect to "/documents" after deleting the document
  const router = useRouter();

  // Save changes to the document by calling the editDocument API function
  const handleSaveDocument = async () => {
    //input validation
    const maxBodyLength = 1000000;
    if (editorTitle === "") setTitleError(true);
    if (editorTopic === "") setTopicError(true);
    if (editorBody.length > maxBodyLength) setBodyError(true);
    if (
      editorTitle === "" ||
      editorTopic === "" ||
      editorBody.length > maxBodyLength
    )
      return;

    try {
      const newDocument: IDocument = {
        ...document,
        category: category,
        title: editorTitle,
        topic: editorTopic,
        body: editorBody,
      };
      const response = await editDocument(newDocument);
      // Call the reloadDocument prop to refresh the document list
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDocument = async () => {
    deleteDocument(document.id);
  };
  return (
    <>
      <div className="p-4 flex flex-col justify-center items-center gap-4 relative">
        <div className="w-full flex-wrap flex justify-center items-center gap-4">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            error={titleError}
            helperText={titleError ? "Enter a title" : " "}
            size="small"
            sx={{ width: 300 }}
            value={editorTitle}
            onChange={(e: any) => {
              setEditorTitle(e.target.value);
              if (e.target.value !== "") setTitleError(false);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Topic"
            variant="outlined"
            error={topicError}
            helperText={topicError ? "Enter a topic" : " "}
            size="small"
            sx={{ width: 200 }}
            value={editorTopic}
            onChange={(e: any) => {
              setEditorTopic(e.target.value);
              if (e.target.value !== "") setTopicError(false);
            }}
          />
          <div>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Category
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              row
            >
              <FormControlLabel
                value="TECHNICAL"
                control={<Radio />}
                label="Technical"
              />
              <FormControlLabel
                value="NONTECHNICAL"
                control={<Radio />}
                label="Non-technical"
              />
            </RadioGroup>
          </div>
        </div>
        <div className="w-full">
          <Editor content={editorBody} setContent={setEditorBody} />
          {bodyError && (
            <Typography color="error">Document is too large</Typography>
          )}
        </div>
        <div className="flex gap-4 w-full justify-end">
          {loadingDeleteDocument ? (
            <Button variant="outlined" startIcon={<DeleteIcon />} disabled>
              <ContentLoader className="mr-1" />
              Deleteing...
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteDocument}
            >
              Delete
            </Button>
          )}
          {loadingEditDocument ? (
            <Button variant="contained" startIcon={<SaveIcon />} disabled>
              <ContentLoader className="mr-1" /> Saving...
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveDocument}
            >
              Save
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
