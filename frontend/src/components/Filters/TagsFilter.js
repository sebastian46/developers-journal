import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";

const TagsFilter = ({
  availableTags,
  selectedTags,
  setSelectedTags,
  onApplyFilter,
}) => {
  //   const handleSelect = (event) => {
  //     setSelectedTags(event.target.value); // Update the selected tags state in the parent component
  //   };

  const handleSelect = (event) => {
    // console.log(event.target.value);
    setSelectedTags(event.target.value);
    onApplyFilter(event.target.value); // Pass the selected tags back to the parent component to apply filter
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="tags-label">Tags</InputLabel>
        <Select
          labelId="tags-label"
          id="tags"
          multiple
          value={selectedTags}
          onChange={handleSelect}
          renderValue={(selected) => selected.join(", ")}
          // MenuProps={MenuProps} // Optional, for customizing the dropdown menu
        >
          {availableTags.map((tag, i) => (
            <MenuItem key={i} value={tag.tagName}>
              {tag.tagName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <FormControl fullWidth>
        <InputLabel id="tag-checkbox-label">Tags</InputLabel>
        <Select
          labelId="tag-checkbox-label"
          id="tag-checkbox"
          multiple
          value={selectedTags}
          onChange={handleSelect}
          input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
          renderValue={(selected) => (
            <div>
              {selected.map((tagId) => {
                const tag = availableTags.find((tag) => tag._id === tagId);
                return <Chip key={tagId} label={tag.tagName} />;
              })}
            </div>
          )}
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
          }}
        >
          {availableTags.map((tag, i) => (
            <MenuItem key={tag._id} value={tag._id}>
              {tag.tagName}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </div>
  );
};

export default TagsFilter;
