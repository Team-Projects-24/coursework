import { useState } from "react";
import Editor from "./Editor";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Autocomplete, Button, TextField } from "@mui/material";

interface IProps {}
export default function CreateDocument({}: IProps) {
  const [editorBody, setEditorBody] = useState("");
  const [value, setValue] = useState("technical");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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
                variant="outlined"
                sx={{ width: 300 }}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={["printing", "computers"]}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Topic" />
                )}
              />

              <div>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Category
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="technical"
                    control={<Radio />}
                    label="Technical"
                  />
                  <FormControlLabel
                    value="non-technical"
                    control={<Radio />}
                    label="Non-technical"
                  />
                </RadioGroup>
              </div>
            </div>
          </FormControl>
        </div>
        <div className="w-full">
          <Editor content={editorBody} setContent={setEditorBody} />
        </div>
        <Button variant="contained" onClick={() => console.log(editorBody)}>
          Create Document
        </Button>
      </div>
    </>
  );
}
