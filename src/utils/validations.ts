export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let checkDigit1 = (sum * 10) % 11;
  if (checkDigit1 === 10 || checkDigit1 === 11) checkDigit1 = 0;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let checkDigit2 = (sum * 10) % 11;
  if (checkDigit2 === 10 || checkDigit2 === 11) checkDigit2 = 0;

  return cpf.endsWith(`${checkDigit1}${checkDigit2}`);
};

export const validatetDate = (data: string) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!regex.test(data)) return false;

  const [day, month, year] = data.split("/").map(Number);
  const dataObj = new Date(year, month - 1, day);

  if (
    dataObj.getFullYear() !== year ||
    dataObj.getMonth() !== month - 1 ||
    dataObj.getDate() !== day
  ) {
    return false;
  }

  const hoje = new Date();
  return dataObj <= hoje;
};

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
