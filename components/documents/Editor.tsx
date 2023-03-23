import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

/**
 * @author Tom Whitticase
 *
 * @description This component provides the UI text editor using quill.
 */

interface IProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  editable?: boolean;
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function Editor({
  content,
  setContent,
  editable = true,
}: IProps) {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    },
  };

  return (
    <Box>
      <ReactQuill
        theme="snow"
        modules={editable ? modules : { toolbar: false }}
        formats={formats}
        value={content}
        onChange={setContent}
        readOnly={!editable}
        bounds="#scrolling-container"
        scrollingContainer=".parent-scroll"
      />
    </Box>
  );
}
