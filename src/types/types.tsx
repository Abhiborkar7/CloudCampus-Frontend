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
  studentId: string;
  title: string;
  description: string;
  proof: string[];
}

export interface Complaint {
  title: string;
  complaintTo: string[];
  description: string;
  student: string;
  keepAnonymousCount?: number;
  status: string;
  attachments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeaveData {
  studentId: string;
  mailTo: string;
  startDate: string;
  endDate: string;
  title: string;
}

export interface LeaveForm {
  studentId: string;
  mailTo: string;
  startDate: string;
  endDate: string;
  title: string;
}

export interface CreateLeave {
  studentId: string;
  mailTo: string;
  startDate: Date;
  endDate: Date;
  title: string;
}

  export interface User {
  _id: string;
  registrationNo: string;
  name: string;
  idPhoto: string;
  email: string;
  password: string;
  department: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profilePhoto: string;
  blockchainAddress: string;
}

export interface Authority {
  _id: string;
  department: string;
  email: string;
  faculty: string;
  password: string;
  position: string;
  role?: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token?: string;
}