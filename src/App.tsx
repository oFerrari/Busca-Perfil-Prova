import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { getUser } from "./services/api";

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
    const userData = await getUser(input);
    setUser(userData);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    async function listUser() {
      const userData = await getUser(input);
      setUser(userData);
    }

    listUser();
  }, []);

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
        {/* Campo de texto para pesquisa */}
        <TextField
          value={input}
          label="Search field"
          type="search"
          variant="filled"
          onChange={handleChange}
        />

        {/* Botão para iniciar a busca */}
        <Button variant="outlined" onClick={handleClick}>
          Primary
        </Button>

        {/* Grid para exibir os detalhes do usuário */}
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
          {/* Avatar do usuário */}
          <Avatar src={user.avatar} />

          {/* Nome do usuário */}
          <Typography>{`${user.first_name} ${user.last_name}`}</Typography>

          {/* Email do usuário */}
          <Typography>{user.email}</Typography>
        </Grid>
      </Box>
    </>
  );
}

export default App;
