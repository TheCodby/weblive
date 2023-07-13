export const getUserTheme = () => {
  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
};
export function delayForDemo(promise: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, 10000);
  }).then(() => promise);
}
