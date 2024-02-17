import { Schema, Document } from 'mongoose';

const ContentSchema = new Schema({
  description: { type: String },
  admissionRequirements: { type: String },
  contact: { type: String },
  attachments: [{ type: String }],
});

const SectionSchema = new Schema({
  title: { type: String },
  content: { type: String },
});

const CourseSchema = new Schema({
  id: { type: String },
  title: { type: String },
  category: { type: String },
  description: { type: String },
  duration: { type: String },
  format: { type: String },
  cost: { type: Number },
  state: { type: String },
  languages: { type: [String] },
  certificationOffered: { type: String },
  nextSessionDate: { type: String },
  certificationType: { type: String },
  content: { type: ContentSchema },
  sections: { type: [SectionSchema] },
  image: { type: String },
  createdBy: { type: String },
  createdAt: { type: String },
});

interface CourseContent {
  description: string;
  admissionRequirements: string;
  contact: string,
  attachments: string[];
}

interface Section {
  title: string;
  content: string;
}

interface CourseDocument extends Document {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  format: string;
  cost: number;
  state: string;
  languages: string[];
  certificationOffered: string;
  nextSessionDate: string;
  certificationType: string;
  content: CourseContent;
  sections: Section[];
  image: string;
  createdBy: string;
  createdAt: string;
}

export { CourseSchema, CourseDocument };
