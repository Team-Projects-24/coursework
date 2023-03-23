import { useState } from "react";
import Editor from "./Editor";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import useUserStore from "stores/userStore";
import ContentLoader from "react-content-loader";
import { useDocuments } from "hooks/useDocuments";
import { IDocument } from "types/Document.d";

/**
 * @author Tom Whitticase
 *
 * @description This component provides the UI for creating a new document.
 */

interface IProps {
  handleCreateDocument: any;
  loadingCreateDocument: boolean;
}
export default function CreateDocumentPage({
  handleCreateDocument,
  loadingCreateDocument,
}: IProps) {
  const { user } = useUserStore();
  const { loading, createDocument } = useDocuments();
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<"TECHNICAL" | "NONTECHNICAL">(
    "TECHNICAL"
  );
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [topicError, setTopicError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const validateCreateDocument = async () => {
    const maxBodyLength = 1000000;
    if (title === "") setTitleError(true);
    if (topic === "") setTopicError(true);
    if (body.length > maxBodyLength) setBodyError(true);
    if (title === "" || topic === "" || body.length > maxBodyLength)
      return false;

    if (!user) return;

    console.log("creating...");

    handleCreateDocument({
      title,
      topic,
      category,
      body,
      authorId: user.userId,
      author: user,
    });
  };

  return (
    <>
      <div className="p-4 flex flex-col justify-center items-center gap-4 relative">
        <div className="flex justify-center items-center gap-4">
          <FormControl>
            <div className="flex gap-4 flex-wrap items-center justify-center">
              <TextField
                id="outlined-basic"
                label="Title"
                error={titleError}
                helperText={titleError ? "Enter a title" : " "}
                variant="outlined"
                size="small"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value !== "") setTitleError(false);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Topic"
                error={topicError}
                helperText={topicError ? "Enter a topic" : " "}
                variant="outlined"
                size="small"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
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
          </FormControl>
        </div>
        <div className="w-full">
          <Editor content={body} setContent={setBody} />
          {bodyError && (
            <Typography color="error">Document is too large</Typography>
          )}
        </div>
        {loadingCreateDocument ? (
          <Button variant="contained" disabled>
            <ContentLoader color="white" className="mr-1" /> Loading...
          </Button>
        ) : (
          <Button variant="contained" onClick={validateCreateDocument}>
            Create Document
          </Button>
        )}
      </div>
    </>
  );
}
