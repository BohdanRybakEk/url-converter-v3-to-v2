const isPlpV3Url = (input: string) =>
  input.includes("all") ||
  input.includes("sneakers") ||
  input.includes("streetwear") ||
  input.includes("accessories") ||
  input.includes("used-sneakers");

export default { isPlpV3Url };
