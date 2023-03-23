import { IDocument } from "types/Document.d";
import UserAvatar from "components/user/UserAvatar";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TopicChip from "./TopicChip";

/**
 * @author Tom Whitticase
 *
 * @description This component provides the UI for the document header.
 */

interface IProps {
  doc: IDocument;
}
export default function DocumentHeader({ doc }: IProps) {
  return (
    <>
      <Box padding={2}>
        <div className="mobile-only:hidden">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              gap: 1,
              paddingRight: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <UserAvatar user={doc.author} />
                <Typography variant={"h6"}>{doc.title}</Typography>
              </Box>

              <Typography variant={"subtitle1"}>
                Last updated {formatDate(doc.updatedAt)}
              </Typography>
            </Box>

            <TopicChip topic={doc.topic} />
            <Chip
              variant={"outlined"}
              label={
                doc.category === "TECHNICAL" ? "Technical" : "Non-technical"
              }
            />
          </Box>
        </div>
        <div className="desktop-only:hidden">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <UserAvatar user={doc.author} />
                <Typography variant={"h6"}>{doc.title}</Typography>
              </Box>

              <Typography variant={"subtitle1"}>
                Last updated {formatDate(doc.updatedAt)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: 1,
                paddingRight: 2,
              }}
            >
              <TopicChip topic={doc.topic} />
              <Chip variant={"outlined"} label={doc.category} />
            </Box>
          </Box>
        </div>
      </Box>
      <Divider />
    </>
  );
}
function formatDate(date: Date): string {
  return (
    new Date(date).toLocaleDateString() +
    " " +
    new Date(date).toLocaleTimeString()
  );
}
