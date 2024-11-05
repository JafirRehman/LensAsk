export const isUserExpired = () => {
  const expirationTime = localStorage.getItem("expirationTime");
  return expirationTime && new Date().getTime() > expirationTime;
};
