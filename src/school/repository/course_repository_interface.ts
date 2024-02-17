import { Result } from "src/commons/result";
import { CourseProps, Course } from "../domain/course";

export type QueryParams = {
  pageSize?: number;
  offset?: number;
  query?: string;
  page?: number;
  options?: Partial<CourseProps>;
};

export type CourseListPaginated = {
  data: Course[];
  totalPages: number;
  currentPage: number;
  total: number;
};

export interface CoursesRepositoryInterface {
  save(course: Course): Promise<Result<Course>>;
  find(
    option: Partial<CourseProps> | { id: string },
  ): Promise<Result<Course>>;
  findAll(params: QueryParams): Promise<Result<CourseListPaginated>>;
  update(course: Course): Promise<Result<Course>>;
}
