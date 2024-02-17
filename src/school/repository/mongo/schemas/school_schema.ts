import * as mongoose from 'mongoose';

export const SchoolSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true },
);

export interface School {
  id: string;
  name: string;
  address: string;
}
