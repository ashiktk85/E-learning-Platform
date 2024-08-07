export const validateSignUp = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
) => {
  const errors: {
    firstName?: string;
    lastName ?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  } = {};

 

  


  if (!firstName) {
    errors.firstName = "First name is required";
  } else if(!/^[A-Z][a-zA-Z]*$/.test(firstName)) {
    errors.firstName = "Invalid First name"
  }


  if (!lastName) {
    errors.lastName = "Last name is required";
  } else if(!/^[A-Z][a-zA-Z]*$/.test(lastName)) {
    errors.firstName = "Invalid Last name"
  }


  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }

  if (!phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(phone)) {
    errors.phone = "Phone number is invalid. It should be 10 digits.";
  }


  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
