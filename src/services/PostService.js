import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create();
instance.defaults.withCredentials = true;

export async function createPost(values) {
  const url = `${API_URL}/posts`;
  // console.log(JSON.stringify(values));

  try {
    const res = await instance.post(url, values);
    return res.status === 200;
  } catch (res_1) {
    console.log("Post Creation Failed : " + JSON.stringify(res_1));
    return false;
  }
}

export async function getAllPost() {
  const url = `${API_URL}/posts`;
  return instance
    .get(url)
    .then(res => {
      if (res.data.constructor.toString().indexOf("Array") > -1) {
        return res.data;
      } else {
        return [];
      }
    })
    .catch(res => console.log("Post Fetching Failed : " + JSON.stringify(res)));
}

export async function getPostsByUsername(username) {
  const url = `${API_URL}/posts/${username}`;
  return instance
    .get(url)
    .then(res => {
      if (res.data.constructor.toString().indexOf("Array") > -1) {
        return res.data;
      } else {
        return [];
      }
    })
    .catch(res => console.log("Post Fetching Failed : " + JSON.stringify(res)));
}

export async function deleteById(id) {
  const url = `${API_URL}/posts/${id}`;
  return instance
    .delete(url)
    .then(res => {
      console.log(res);
      return true;
    })
    .catch(res => {
      console.log("Deletion Failed");
      return false;
    });
}
