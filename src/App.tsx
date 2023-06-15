import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

// Definição do tipo de usuário
export type User = {
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
};

function App() {
  const [user, setUser] = useState<User>({avatar_url:"",html_url:"",name:""});
  const [input, setInput] = useState("");

  // Função assíncrona para lidar com o clique no botão
  const handleClick = async () => {
    const userData = await fetchUser(input);
    setUser(userData);
  };

  // Função para lidar com a alteração do campo de entrada
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // Efeito colateral para buscar os dados do usuário ao montar o componente
  useEffect(() => {
    // Função para buscar os dados do usuário ao montar o componente
    async function fetchUser() {
      if (input) {
        const userData = await getUser(input);
        setUser(userData);
      }
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
        {/* Campo de texto para pesquisa */}
        <TextField
          value={input}
          label="User ID"
          type="number"
          variant="filled"
          onChange={handleChange}
        />

        {/* Botão para iniciar a busca */}
        <Button variant="outlined" onClick={handleClick}>
          Search
        </Button>

        
        
        <Grid sx={{
        width: '600px',
        background: 'purple',
        border: '1px solid black',
        borderRadius: '5px',
        justifyContent: 'center',
        color:'white' // Adicionando alinhamento horizontal centralizado
      }}
    >
        <Avatar src={user.avatar_url}/>
      <Typography>
      {user.name}
      </Typography>
      <Typography>
      <a href={user.html_url}>Link do Repositório</a>
      </Typography>
    </Grid>

      
    



      </Box>
    </>
  );
}

export default App;