export const getJWT = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt;
};
