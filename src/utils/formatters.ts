import { personAge } from "./age";

/**
 * Formats a number as currency in Brazilian Real (BRL)
 * @param value - The value to format
 * @returns Formatted string in BRL format
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Formats a date string to the Brazilian format (DD/MM/YYYY)
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

/**
 * Parses a currency string (R$ X.XXX,XX) to a number value
 * @param currencyString - The currency string to parse
 * @returns The number value
 */
export const parseCurrencyToNumber = (currencyString: string): number => {
  // Remove 'R$', spaces, dots and replace comma with dot
  const cleanString = currencyString
    .replace(/R\$\s?/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return parseFloat(cleanString);
};

/**
 * Formats a CPF number (XXX.XXX.XXX-XX)
 * @param cpf - The CPF string to format
 * @returns Formatted CPF string
 */
export const formatCPF = (cpf: string): string => {
  const cpfClean = cpf.replace(/\D/g, "");

  if (cpfClean.length !== 11) {
    return cpf;
  }

  return cpfClean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

/**
 * Mask function for currency input
 * @param value - The current input value
 * @returns Formatted currency string
 */
export const currencyMask = (value: string): string => {
  value = value.replace(/\D/g, "");

  if (value === "") {
    return "";
  }

  // Convert to cents and format
  const cents = parseInt(value, 10);
  const formattedValue = (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};

/**
 * Mask function for CPF input
 * @param value - The current input value
 * @returns Formatted CPF string
 */
export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

/**
 * Mask function for phone number input
 * @param value - The current input value
 * @returns Formatted phone string
 */
export const phoneMask = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export const formatDateToBR = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export const getPersonAge = (data: string) => {
  const formattedDate = formatDateToBR(data);

  return String(personAge(formattedDate));
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmptyFields =(obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value != null && value !== "" && value !== " "
    )
  );
};

export const calculateDifference = (isoDate: string): string => {
  const inputDate = new Date(isoDate);
  const now = new Date();

  const diffMs = Math.abs(now.getTime() - inputDate.getTime()); // difference in milliseconds
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours > 24) {
    const diffDays = Math.floor(diffHours / 24);
    return diffDays > 1 ? `${diffDays} dias` : `${diffDays} dia`;
  } else {
    return Math.floor(diffHours) > 1
      ? `${Math.floor(diffHours)} horas`
      : `${Math.floor(diffHours)} hora`;
  }
};

export const formatCardNumber = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.replace(/(.{4})/g, "$1 ").trim();
};

export const formatCep = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 8);

  if (digitsOnly.length > 5) {
    return digitsOnly.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
  }

  return digitsOnly;
};

export const formatPhoneFlexible = (input: string) => {
  return input.replace(/(\d{4,5}) (\d{4})$/, "$1-$2");
};

export const fileToBinary = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
