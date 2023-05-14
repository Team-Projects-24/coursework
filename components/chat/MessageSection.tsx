import { Box, Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import senderTail from "public/images/sender-tail.svg";
import viewerTail from "public/images/viewer-tail.svg";
import Image from "next/image";

interface MessageSectionArgs {
  content: string;
  senderID: string;
  sent: boolean;
  time: string;
  read: boolean;
  isPrivate: boolean;
  idColour: string;
}

export default function MessageSection({
  sent,
  time,
  read,
  content,
  senderID,
  isPrivate,
  idColour,
}: MessageSectionArgs) {
  const color = sent ? "#005c4b" : "#202c33";

  const rightRadius = sent ? 0 : 8;

  return (
    <Grid
      item
      paddingX={15}
      marginBottom={1}
      display="flex"
      justifyContent={sent ? "flex-end" : "flex-start"}
      xs={12}
    >
      {sent ? null : (
        <Grid item marginTop={-0.37} marginRight={-0.8}>
          <Image width={20} src={viewerTail} alt="" />
        </Grid>
      )}
      <Grid
        item
        container
        xs="auto"
        sx={{
          borderRadius: 2,
          borderTopRightRadius: `${rightRadius}px`,
          borderTopLeftRadius: `${8 - rightRadius}px`,
        }}
        direction="column"
        bgcolor={color}
        borderRadius={2}
        paddingY={0.5}
        paddingX={1.4}
      >
        {isPrivate || sent ? null : (
          <Grid item>
            <Typography
              fontSize={15}
              maxWidth="50vw"
              fontWeight={500}
              color={idColour}
              noWrap
            >
              {senderID}
            </Typography>
          </Grid>
        )}
        <Box display="inline-flex">
          <Typography
            color="#e9edef"
            maxWidth="50vw"
            style={{ wordWrap: "break-word" }}
          >
            {content}
          </Typography>
          <Grid
            container
            direction="row"
            paddingLeft={1}
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
            xs="auto"
          >
            <Grid item xs="auto">
              <Typography fontSize={11} color="#90b3ad">
                {time}
              </Typography>
            </Grid>
            {!sent ? null : (
              <Grid
                item
                xs="auto"
                fontSize={15}
                color={read ? "#4eb7e1" : "#81a8a2"}
              >
                <DoneIcon fontSize="inherit" />
              </Grid>
            )}
          </Grid>
        </Box>
      </Grid>
      {!sent ? null : (
        <Grid item marginTop={-0.37} marginLeft={-0.8}>
          <Image width={20} src={senderTail} alt="" />
        </Grid>
      )}
    </Grid>
  );
}
