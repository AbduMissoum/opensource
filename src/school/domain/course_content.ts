export type CourseContentProps = {
  description: string;
  admissionRequirements: string;
  contact: string;
  attachments: string[];
};

export class CourseContent {
  description: string;
  admissionRequirements: string;
  contact: string;
  attachments: string[];

  constructor(props: CourseContent) {
    this.description = props.description;
    this.admissionRequirements = props.admissionRequirements;
    this.contact = props.contact;
    this.attachments = props.attachments;
  }
}
