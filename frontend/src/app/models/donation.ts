
export interface Donation {
  _id?: string;
  name: string;
  description?: string;
  type: string;
  expirationDate: Date;
  creator: string;
  address: string;
  for3Sector: boolean;
  forPublic: boolean;
  isActive: boolean;
  picture?: string;
  demandant?: string;
  demandantMessage?: string;
  createdAt: Date;
}
