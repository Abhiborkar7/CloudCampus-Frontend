export interface SignupForm {
  fullName: string;
  registrationNumber: string;
  branch: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  role: string;
  token: string;
  student?: any;
  faculty?: any;
  authority?: any;
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

  export interface Student {
  _id: string;
  registrationNo: string;
  name: string;
  idPhoto?: string;
  email: string;
  password: string;
  department?: string;
  dob?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profilePhoto?: string;
  blockchainAddress?: string;
  bloodGroup?: string,
  address?:  string
}

export interface FacultyAuthority {
  _id: string;
  email: string;
  password: string;
  position: string;
  faculty: FacultySummary;
  department: string;
  __v: number;
}

export interface StudentAuthority {
  _id: string;
  email: string;
  student: Student;
  password: string;
  position: string;
  __v: number;
}

export interface FacultySummary {
  _id: string;
  name: string;
  email: string;
}

export interface Faculty extends FacultySummary {
  registrationNo: string;
  password: string;
  department: string;
  __v: number;
}

