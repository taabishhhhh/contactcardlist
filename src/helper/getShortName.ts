export const getShortName = (name: string) => {
  let matches = name.match(/\b(\w)/g);
  return matches ? matches.splice(0, 2).join("") : "";
};
