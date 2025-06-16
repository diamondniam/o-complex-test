import { isValidPhoneNumber } from "libphonenumber-js";

export function validatePhoneChar(char) {
  const pattern = /[\d+\-()\s]/;
  return pattern.test(char);
}

export function validatePhone(phone) {
  return isValidPhoneNumber(phone);
}
