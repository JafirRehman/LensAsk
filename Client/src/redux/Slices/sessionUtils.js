export const isSessionExpired = () => {
  const expirationTime = localStorage.getItem("expirationTime");
  return expirationTime && new Date().getTime() > expirationTime;
};
