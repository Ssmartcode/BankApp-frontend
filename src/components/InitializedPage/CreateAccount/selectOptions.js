const accountType = [
  { value: "standard", text: "Cont Standard" },
  { value: "business", text: "Cont Business" },
];
const accountCurrency = [
  { acr: "ron", text: "Lei" },
  { acr: "eur", text: "Euro" },
  { acr: "usd", text: "Dolari Americani" },
];
const selectOptions = { accountType, accountCurrency };
export default selectOptions;
