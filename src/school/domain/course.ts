import { Either, Result, right, left } from "src/commons/result";
import { CreateCourseErrors } from "../errors/create_course_errors";
import { CourseContent } from "./course_content";
import { Section } from "./course_section";
import { UniqueEntityID } from "src/commons/UniqueEntityID";

export type CourseProps = {
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
};

export class Course {
  id: string;
  public title: string;
  public state: string;
  public description: string;
  public category: string;
  public createdBy: string;
  public createdAt: string;
  public languages: string[];
  public certificationOffered: string;
  public nextSessionDate: string;
  public certificationType: string;
  public content: CourseContent;
  public sections: Section[];
  public image: string;
  public cost: number;
  public duration: string;

  private constructor(props: CourseProps, id?: string) {
    this.id = id;
    this.title = props.title;
    this.description = props.description;
    this.state = props.state;
    this.category = props.category;
    this.createdBy = props.createdBy;
    this.createdAt = props.createdAt;
    this.certificationOffered = props.certificationOffered;
    this.nextSessionDate = props.nextSessionDate;
    this.certificationType = props.certificationType;
    this.content = props.content;
    this.image = props.image;
    this.languages = props.languages;
    this.cost = props.cost;
    this.duration = props.duration;
    this.sections = props.sections?.map((section) => new Section(section));
  }
  public updateState(state: string) {
    this.state = state;
  }

  public static create(
    props: CourseProps,
    id?: string,
  ): Either<CreateCourseErrors.InvalidDataError, Result<Course>> {
    id = id ?? UniqueEntityID();
    const newCourse = new Course(props, id);
    newCourse.createdAt = new Date().toISOString();
    return right(Result.ok<Course>(newCourse));
  }


}
