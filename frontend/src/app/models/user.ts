

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  rol?: string;
  imageUrl?: string;
  createdAt: Date;
}
