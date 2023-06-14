import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

export type User = {
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
};

function App() {
  const [user, setUser] = useState<User>({ avatar: "", first_name: "", last_name: "", email: "" });
  const [input, setInput] = useState("");

  const handleClick = async () => {
    const userData = await fetchUser(input);
    setUser(userData);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    async function listUser() {
      const userData = await fetchUser(input);
      setUser(userData);
    }

    listUser();
  }, []);

  const fetchUser = async (userId: string): Promise<User> => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      const userData = response.data.data;
      return {
        avatar: userData.avatar,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      return { avatar: "", first_name: "", last_name: "", email: "" };
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "50px",
        }}
      >
        <TextField
          value={input}
          label="User ID"
          type="number"
          variant="filled"
          onChange={handleChange}
        />

        <Button variant="outlined" onClick={handleClick}>
          Search
        </Button>

        <Grid
          sx={{
            width: "600px",
            background: "purple",
            border: "1px solid black",
            borderRadius: "5px",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Avatar src={user.avatar} />
          <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
          <Typography>{user.email}</Typography>
        </Grid>
      </Box>
    </>
  );
}

export default App;
