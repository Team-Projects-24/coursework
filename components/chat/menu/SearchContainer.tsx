import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchContainerArgs {
  hint: string,
  onSearch?: null | ((arg0: string) => void),
  onChange?: null | ((arg0: string) => void)
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
  return (
    <Grid
      container
      paddingY={1}
      borderRadius={2}
      className="primary-colour">
      <Grid item paddingLeft={2} xs="auto">
        <SearchIcon className="icon" />
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
          onSubmit={(e) => onSearch ? onSearch(e.currentTarget.value) : null}/>
      </Grid>
    </Grid>
  )
}