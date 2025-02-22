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

export interface Complaint {
  title: string;
  complaintTo: string;
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

export  interface CreateLeave {
    studentId: string;
    mailTo: string;
    startDate: Date;
    endDate: Date;
    title: string;
  }
