export interface SignupForm {
  fullName: string;
  registrationNumber: string;
  branch: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CheatingForm {
  studentName: string;
  title: string;
  description: string;
  proof: string;
  imageUrl: string;
}