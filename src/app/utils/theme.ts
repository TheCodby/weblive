type Theme = "light" | "dark";
export const getUserTheme = (): Theme => {
  return localStorage.getItem("theme") === "light" ? "light" : "dark";
};
