// Format card number to groups of 4 digits
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const groups = [];

  for (let i = 0; i < digits.length; i += 4) {
    groups.push(digits.slice(i, i + 4));
  }

  return groups.join(" ").slice(0, 19); // Max 16 digits + 3 spaces
}

// Format expiry date (MM/YY)
export function formatExpiryDate(month: string, year: string): string {
  let monthValue = month;
  let yearValue = year;

  if (monthValue.length === 1) {
    monthValue = `0${monthValue}`;
  }

  if (yearValue.length === 4) {
    yearValue = yearValue.slice(2);
  }

  return `${monthValue}/${yearValue}`;
}

// Detect card brand based on first digits
export function detectCardBrand(cardNumber: string): string {
  const number = cardNumber.replace(/\D/g, "");

  if (/^4/.test(number)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(number)) return "mastercard";
  if (/^3[47]/.test(number)) return "amex";
  if (/^(6011|65|64[4-9])/.test(number)) return "discover";
  if (/^(36|38|30[0-5])/.test(number)) return "diners";
  if (/^35/.test(number)) return "jcb";
  if (/^(50|56|57|58|6)/.test(number)) return "maestro";
  if (/^(60|6521|6522)/.test(number)) return "hipercard";
  if (
    /^(636368|438935|504175|451416|636297|5067|4576|4011|506699)/.test(number)
  )
    return "elo";

  return "unknown";
}

// Validate card number using Luhn algorithm
export function validateCardNumber(number: string): boolean {
  const digits = number.replace(/\D/g, "");

  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

// Get card brand options
export function getCardBrands() {
  return [
    { value: "visa", label: "Visa" },
    { value: "mastercard", label: "Mastercard" },
    { value: "amex", label: "American Express" },
    { value: "discover", label: "Discover" },
    { value: "diners", label: "Diners Club" },
    { value: "jcb", label: "JCB" },
    { value: "maestro", label: "Maestro" },
    { value: "hipercard", label: "Hipercard" },
    { value: "elo", label: "Elo" },
    { value: "other", label: "Other" },
  ];
}

// Format document number (CPF/CNPJ)
export function formatDocument(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 11) {
    // CPF format: 000.000.000-00
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .substring(0, 14);
  } else {
    // CNPJ format: 00.000.000/0000-00
    return digits
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .substring(0, 18);
  }
}
