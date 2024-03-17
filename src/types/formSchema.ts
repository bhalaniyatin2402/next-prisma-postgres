import * as yup from 'yup';

interface RegisterType {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

// validation of different inputs
const name = yup
  .string()
  .min(3, "atleast 3 charater required")
  .max(20, "must be 20 character or less")
  .required("please enter your name");

const email = yup
  .string()
  .email("invalid email address")
  .required("please enter your email");

const password = yup
  .string()
  .min(6, "atleast 6 character long")
  .max(16, "must be 16 character or less")
  .required("please enter your password");


// validation for forms
export const registrationSchema: yup.ObjectSchema<RegisterType> = yup.object({ name, email, password })

export const loginSchema: yup.ObjectSchema<Omit<RegisterType, "name">> = yup.object({ email, password })

