import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Card,
  CardContent,
  CardActions,
  Avatar,
  InputAdornment,
  Input,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function Profile() {
  const [profileData, setProfileData] = useState({
    email: "",
    website: "",
    github: "",
  });
  const [avatar, setAvatar] = useState(null);
  // ... rest of your state and hooks

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to bundle up all the form data for submission
    const formData = new FormData();

    // Append the fields to the formData object. You might want to append other form fields as well.
    formData.append("email", profileData.email);
    formData.append("website", profileData.website);
    formData.append("github", profileData.github);

    // If there's a file selected (for avatar), append it to the formData.
    // The 'avatar' field should correspond to the field expected by your API.
    if (avatar) {
      formData.append("avatar", avatar);
    }
    console.log(formData);
    console.log(avatar);

    try {
      const response = await fetch(
        "http://localhost:3001/api/users/update-profile",
        {
          method: "POST",
          headers: {
            // Don't set 'Content-Type': 'application/json' when sending FormData.
            // The browser will set the correct 'Content-Type' for multipart/form-data
            // and include the boundary parameter.
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Handle successful profile update
        console.log("Profile updated successfully:", data);
        // Optionally reset form fields or perform other state updates
      } else {
        // Handle errors from the server
        console.error("Profile update failed:", data);
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error while updating profile:", error);
    }
  };

  // ... rest of your component logic

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 12 }}>
      <CssBaseline />
      <Card>
        <CardContent>
          <Typography component="h1" variant="h5" gutterBottom>
            Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Website"
              name="website"
              value={profileData.website}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="GitHub"
              name="github"
              value={profileData.github}
              onChange={handleInputChange}
            />
            <input
              accept="image/*"
              id="avatar-input"
              type="file"
              onChange={handleAvatarChange}
              hidden
            />
            <label htmlFor="avatar-input">
              <Button
                variant="contained"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Upload Avatar
              </Button>
            </label>
            {avatar && (
              <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
                <Avatar
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar Preview"
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
            )}
          </Box>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Update Profile
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Profile;
