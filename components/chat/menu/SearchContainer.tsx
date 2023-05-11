import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useState } from "react";
import { Animated } from "react-animated-css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface SearchContainerArgs {
  hint: string,
  searchResponse?: ((arg0: string) => void),
}

interface IconArgs {
  selector: boolean,
}

/**
 * @author Ade Osindero
 * 
 * @param selector - True for the back arrow, false for the search.
 * @returns The appropriate icon for the search container.
 */
function Icon({ selector }: IconArgs) {
  return selector ? <ArrowBackIcon /> : <SearchIcon />;
}

/**
 * @author Ade Osindero
 * 
 * @param hint - The hint to be displayed in the container.
 * @param searchResponse - The action to perform upon a search.
 * @returns A search container.
 */
export default function SearchContainer({ hint, searchResponse }: SearchContainerArgs) {
  const [visible, setVisible] = useState<boolean>(true);
  const [selected, setSelected] = useState<boolean>(false);

  const flipIcon = async () => {
    setVisible(false);
    await new Promise(f => setTimeout(f, 100));
    setSelected(!selected);
    setVisible(true);
  }

  const onSubmit = (e: FormEvent<HTMLInputElement>) =>
    searchResponse ? searchResponse(e.currentTarget.value) : null;

  return (
    <Grid
      container
      paddingY={1}
      borderRadius={2}
      bgcolor="#202c33"
      columnGap={4}
      paddingX={2}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      <Grid item xs="auto" color={selected ? "#00a884" : "#aebac1"}>
        <Animated
          animationIn="rotateIn"
          animationOut="rotateOut"
          animationInDuration={200}
          animationOutDuration={200}
          isVisible={visible}>
          <Icon selector={selected} />
        </Animated>
      </Grid>
      <Grid item xs>
        <input
          style={{
            backgroundColor: "#202c33",
            outline: "none",
            color: "#ffffff",
            width: "100%",
          }}
          type="search"
          placeholder={hint}
          onSubmit={onSubmit}
          onFocus={flipIcon}
          onBlur={flipIcon} />
      </Grid>
    </Grid>
  )
}