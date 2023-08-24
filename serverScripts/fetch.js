import fetch from "node-fetch"

export default async function customFetchPost(URL, data) {
  const response = await fetch(URL, {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}