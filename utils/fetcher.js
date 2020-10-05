const fetcher = async (...args) => {
  console.log(args);
  const res = await fetch(...args);
  return res.json();
};

export default fetcher;
