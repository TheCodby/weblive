type Theme = "light" | "dark";
export const getUserTheme = (): Theme => {
  return localStorage.getItem("theme") === "light" ? "light" : "dark";
};
export function delayForDemo(promise: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, 10000);
  }).then(() => promise);
}
