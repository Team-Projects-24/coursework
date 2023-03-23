import {
  Autocomplete,
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IDocument } from "../../types/Document.d";

/**
 * @author Tom Whitticase
 *
 * @description This component provides the UI for filtering documents.
 */

interface IProps {
  documents: IDocument[];
  setFilter: any;
}

export default function DocumentsFilter({ setFilter, documents }: IProps) {
  const [topics, setTopics] = useState<string[]>();

  const [selectedTopic, setSelectedTopic] = useState<string | null>();
  const [selectedCategory, setSelectedCategory] = useState<
    "TECHNICAL" | "NONTECHNICAL" | "all"
  >("all");

  //update filter when selected project or user changes
  useEffect(() => {
    setFilter({
      topic: selectedTopic,
      category: selectedCategory,
    });
  }, [selectedTopic, selectedCategory]);

  useEffect(() => {
    setTopics(Array.from(new Set(documents.map((doc) => doc.topic))));
  }, [documents]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          padding: 2,
        }}
      >
        <Autocomplete
          size="small"
          disablePortal
          options={
            topics?.map((topic) => {
              return { label: topic };
            }) || []
          }
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Topic"
              variant={"standard"}
              size="small"
            />
          )}
          onChange={(event, value) => {
            setSelectedTopic((value && value.label) || null);
          }}
        />
        <FormControl size="small">
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedCategory}
            onChange={(evt) => {
              const newCategory = (evt.target as HTMLInputElement).value;
              if (["TECHNICAL", "NONTECHNICAL", "all"].includes(newCategory)) {
                setSelectedCategory(
                  newCategory as "TECHNICAL" | "NONTECHNICAL" | "all"
                );
              }
            }}
          >
            <FormControlLabel
              value="TECHNICAL"
              control={<Radio size="small" />}
              label="Technical"
            />
            <FormControlLabel
              value="NONTECHNICAL"
              control={<Radio size="small" />}
              label="Non-technical"
            />
            <FormControlLabel
              value={"all"}
              control={<Radio size="small" />}
              label="All"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
}
