export const pathLink = 'http://45.90.35.207:8080'

export const validateEmail = (email: string) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return false;
  } else {
    return true;
  }
}