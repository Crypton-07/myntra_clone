export const cehckValidate = (name, email, password) => {
  const isEmailValid = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isNameValid = /^[a-zA-Z0-9]{2,30}$/.test(name);

  if (!isNameValid) return "Enter valid name";
  if (!isEmailValid) return "Enter valid email address. Example abc@gmail.com";
  if (!isPasswordValid) return "Entered password is not correct.";
  return null;
};
