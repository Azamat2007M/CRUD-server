const { default: axios } = require("axios");

async function createUser() {
  const newUser = {
    userName: 'Bobur',
    email: 'Bobur@gmail.com',
    password: 'root'
  }

  try {
    const response = await axios.post('http://localhost:3000/api/items', newUser)

  const data = await response.data
  console.log('New user craeted: ', data);
  } catch (error) {
    console.log('Error to create user', error);
  }
}

createUser()