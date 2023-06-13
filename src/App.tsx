import { Box, Button, TextField } from "@mui/material"
import { CardSearch } from "./components/Card"


function App() {

  return (
    <>
    <Box sx={{
      display: "flex",
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      rowGap:'50px'
    }}>
      
    <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
      />

      <Button variant="outlined">Primary</Button>

    <CardSearch />
    </Box>

      
    </>
  )
}

export default App
