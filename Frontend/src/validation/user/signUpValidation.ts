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
    errors.firstName = "First name required";
  }

  if(!lastName) {
    errors.lastName = "Last name required"
  }

  if(!email) {
    errors.lastName = "Email is required"
  }

  if(!phone) {
    errors.lastName = "Phone number required"
  }

  if(!password) {
    errors.lastName = "Password feild empty"
  }

  if(!confirmPassword) {
    errors.lastName = "confirm password empty"
  }

  return errors;
};
