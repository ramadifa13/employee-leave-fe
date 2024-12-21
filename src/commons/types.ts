export type LoginFormData = {
    email: string;
    password: string;
  };
  
export type RegisterFormData ={
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: "male" | "female";
  }

  export type Employee = {
    // id: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
  }