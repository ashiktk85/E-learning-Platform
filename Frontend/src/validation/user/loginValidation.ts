export const loginValidation = (email: string, password: string) => {
  const errors: {
    email?: string;
    password?: string;
  } = {};

  email = email.trim();
  password = password.trim();

  if (!email) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }
  }

  if (!password) {
    errors.password = "Password is required.";
  } else {
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
  }

  return errors;
};
