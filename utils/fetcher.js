const fetcher = async (url, token) => {
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
    credentials: "same-origin",
  });
  return res.json();
};

export default fetcher;
