import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { getUser } from "./services/api";

// Definição do tipo de usuário
export type User = {
  avatar_url: string;
  name: string;
  html_url: string;
};

function App() {
  // Definição dos estados do usuário e da entrada
  const [user, setUser] = useState<User>({ avatar_url: "", html_url: "", name: "" });
  const [input, setInput] = useState("");

  // Função assíncrona para lidar com o clique no botão
  const handleClick = async () => {
    const userData = await getUser(input);
    setUser(userData);
  };

  // Função para lidar com a alteração do campo de entrada
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // Efeito colateral para buscar os dados do usuário ao montar o componente
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
          <Avatar src={user.avatar_url} />

          {/* Nome do usuário */}
          <Typography>{user.name}</Typography>

          {/* Link para o repositório do usuário */}
          <Typography>
            <a href={user.html_url}>Link do Repositório</a>
          </Typography>
        </Grid>
      </Box>
    </>
  );
}

export default App;
