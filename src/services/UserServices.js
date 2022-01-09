import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create();

export function createUser(values) {
  const url = `${API_URL}/auth/register`;
  console.log(JSON.stringify(values));

  return instance
    .post(url, {
      name: values.name,
      username: values.username,
      password: values.password,
    })
    .then(res => {
      return res.status === 200;
    })
    .catch(res => {
      console.log("Registration Completed : " + JSON.stringify(res));
      return false;
    });
}
