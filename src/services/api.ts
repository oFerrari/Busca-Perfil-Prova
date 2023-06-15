import axios from "axios";

export async function getUser() {
    
      const response = await axios.get(`https://reqres.in/api/users?page=1`);
      return response.data
}