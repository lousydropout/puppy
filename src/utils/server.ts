"use server";
export const callGoogle = async () => {
  const response = await fetch("https://www.google.com?secret=s123");
  console.log("Called Google");
  return await response.text();
};
