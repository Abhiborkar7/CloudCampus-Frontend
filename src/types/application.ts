export interface Application {
  _id: string;
  from: {
    _id: string;
    registrationNo?: string;
    name: string;
    email: string;
    department?: string; // optional
  };
  title: string;
  to: {
    to: {
      name: string;
      email: string;
    };
    status: 'pending' | 'approved' | 'rejected' | 'returned back to applicant' | string;
    _id: string;
    authority?: string;
    registrationNo?: string;
    role?: string;
  }[];
  body: string;
  reason?: string;
  file?: string;
  priority?: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  currentRecipient?: string;
  label?: string;
}

export interface Sender {
  _id: string;
  name: string;
  email: string;
}
