import Chip from "@mui/material/Chip";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import generateColour from "utils/generateColour";

/**
 * @author Tom Whitticase
 *
 * @description topic chip component. used to display topic name and colour tag
 *
 * @param {string} topic - topic
 *
 * @returns JSX.Element
 */

interface IProps {
  topic: string;
}
export default function ProjectChip({ topic }: IProps) {
  return (
    <Chip
      sx={{
        backgroundColor: generateColour(topic as string),
        color: "white",
      }}
      label={topic}
      variant="filled"
      icon={<LocalOfferIcon style={{ color: "white" }} />}
    />
  );
}
