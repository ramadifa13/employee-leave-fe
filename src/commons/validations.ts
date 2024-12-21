import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

 export const registerSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    birthDate: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Birth date must be in the format YYYY-MM-DD"
      )
      .required("Birth date is required"),
    gender: yup
      .mixed<"male" | "female">()
      .oneOf(["male", "female"], "Select a valid gender")
      .required("Gender is required"),
  });
  
