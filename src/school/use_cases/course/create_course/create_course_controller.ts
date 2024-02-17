import {
  Controller,
  Post,
  Body,
  ConflictException,
  InternalServerErrorException,
  Inject,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { CreateCourseUseCase } from './create_course_use_case';
import { CreateCourseDTO } from './dtos/create_course_dto';
import { CreateCourseErrors } from 'src/school/errors/create_course_errors';
@Controller('/api/v1/school/courses')
export class CreateCourseController {
  constructor(
    @Inject('create-course-use-case')
    private readonly useCase: CreateCourseUseCase,
  ) {}

  @Post('/')
  @HttpCode(201)
  async createCourse(@Body() courseData: CreateCourseDTO) {
    const result = await this.useCase.execute({ courseData });
    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case CreateCourseErrors.InvalidDataError:
          return new BadRequestException({ error: error });
        case CreateCourseErrors.CourseAlreadyExistsError:
          return new ConflictException({ error: error });
        default:
          return new InternalServerErrorException('Internal Server Error');
      }
    }

    const course = result.value.getValue();
    return course;
  }
}
