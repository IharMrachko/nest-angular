export interface SchoolInterface {
  address: string;
  createdAt?: Date;
  id?: number;
  locality: string;
  name: string;
  number: number;
  students?: [];
  events?: [];
  users?: []
}
