import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import { getUser } from "./services/api";

export type User = {
  avatar_url: string;
  name: string;
  html_url: string;
};

function App() {
  const [user, setUser] = useState<User>({avatar_url:"",html_url:"",name:""});
  const [input, setInput] = useState("");

  const handleClick = async () => {
    const userData = await getUser(input);
    setUser(userData);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    // Função para buscar os dados do usuário ao montar o componente
    async function fetchUser() {
      if (input) {
        const userData = await getUser(input);
        setUser(userData);
      }
    }

    fetchUser();
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
        <TextField
          value={input}
          label="Search field"
          type="search"
          variant="filled"
          onChange={handleChange}
        />

        <Button variant="outlined" onClick={handleClick}>
          Primary
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