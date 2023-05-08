import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Animated } from "react-animated-css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface SearchContainerArgs {
  hint: string,
  onSearch?: null | ((arg0: string) => void),
  onChange?: null | ((arg0: string) => void),
}

interface IconArgs {
  selector: boolean,
}

function Icon({ selector }: IconArgs) {
  return selector ? <ArrowBackIcon /> : <SearchIcon />;
}

/**
 * @author Ade Osindero
 * 
 * @param hint - The hint to be displayed in the container.
 * @param onSearch - The action to perform upon a search.
 * @param onChange - The action to perform upon a change in input.
 * @returns A search container.
 */
export default function SearchContainer({ hint, onSearch = null, onChange = null }: SearchContainerArgs) {
  const [visible, setVisible] = useState<boolean>(true);
  const [selected, setSelected] = useState<boolean>(false);

  const flipIcon = async () => {
    setVisible(false);
    await new Promise(f => setTimeout(f, 100));
    setSelected(!selected);
    setVisible(true);
  }

  return (
    <Grid
      container
      paddingY={1}
      borderRadius={2}
      className="primary-colour">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      <Grid item paddingLeft={2} xs="auto" color={selected ? "#00a884" : "#aebac1"}>
        <Animated
          animationIn="rotateIn"
          animationOut="rotateOut"
          animationInDuration={200}
          animationOutDuration={200}
          isVisible={visible}>
          <Icon selector={selected} />
        </Animated>
      </Grid>
      <Grid item paddingLeft={4} xs={11}>
        <input style={{
            outline: "none",
            color: "#ffffff",
          }}
          type="search"
          placeholder={hint}
          className="primary-colour search"
          onChange={(e) => onChange ? onChange(e.currentTarget.value) : null}
          onSubmit={(e) => onSearch ? onSearch(e.currentTarget.value) : null}
          onClick={flipIcon}
          onBlur={flipIcon}/>
      </Grid>
    </Grid>
  )
}