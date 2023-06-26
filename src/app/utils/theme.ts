export const getUserTheme = () => {
  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
};
