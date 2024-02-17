import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDTO } from './dtos/create_course_dto';
import { Either, Result, left, right } from 'src/commons/result';
import { UseCase } from 'src/commons/useCaseIterface';
import { AppError } from 'src/commons/appError';
import { CreateCourseErrors } from 'src/school/errors/create_course_errors';
import { CoursesRepositoryInterface } from 'src/school/repository/course_repository_interface';
import { Course, CourseProps } from 'src/school/domain/course';

export type CreateCourseResponse = Either<
  AppError.UnexpectedError | CreateCourseErrors.CourseAlreadyExistsError,
  Result<Course>
>;
@Injectable()
export class CreateCourseUseCase
  implements UseCase<{ courseData: CreateCourseDTO }, CreateCourseResponse>
{
  constructor(
    @Inject('courses-repository')
    private courseRepository: CoursesRepositoryInterface,
  ) {}

  async execute(request: {
    courseData: CreateCourseDTO;
  }): Promise<CreateCourseResponse> {
    const { courseData } = request;
    const { data } = courseData;
    const existCourse = await this.courseRepository.find({
      title: data.title.trim(),
    });
    if (existCourse.isFailure) {
      return left(AppError.UnexpectedError.create('Unexpected Error'));
    }
    const course = existCourse.getValue();
    if (course) {
      return left(
        CreateCourseErrors.CourseAlreadyExistsError.create(
          `Course with name ,${data.title}, already exists`,
        ),
      );
    }
    const createdCourse = Course.create(data as CourseProps);
    if (createdCourse.isLeft())
      return left(
        CreateCourseErrors.InvalidDataError.create('Invalid Course Data'),
      );
    const savedCourse = await this.courseRepository.save(
      createdCourse.value.getValue(),
    );
    if (savedCourse.isFailure)
      return left(
        AppError.UnexpectedError.create(
          'Unexpected error when trying to save course',
        ),
      );

    return right(Result.ok<Course>(savedCourse.getValue()));
  }
}
