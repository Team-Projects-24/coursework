import { IDocument } from "../../types/Document.d";
import Editor from "./Editor";
import { useState } from "react";
import Box from "@mui/material/Box";
import DocumentHeader from "./DocumentHeader";

/**
 * @author Tom Whitticase
 *
 * @description This component provides the UI for viewing a document.
 */

interface IProps {
  document: IDocument;
}
export default function Document({ document }: IProps) {
  const [content, setContent] = useState(document.body);

  return (
    <Box>
      {/* document header containing title, topic, category etc */}
      <DocumentHeader doc={document} />
      {/* document body */}
      <Box padding={2}>
        <Editor content={content} setContent={setContent} editable={false} />
      </Box>
    </Box>
  );
}
