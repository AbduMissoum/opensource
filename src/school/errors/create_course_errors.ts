import { HttpException, HttpStatus } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateCourseErrors {
  export class CourseAlreadyExistsError extends HttpException {
    constructor(
      message: string | Record<string, any> = 'Course already exists',
    ) {
      super(message, HttpStatus.CONFLICT);
    }

    public static create(
      message: string | string[],
    ): CourseAlreadyExistsError {
      return new CourseAlreadyExistsError(message);
    }
  }

  export class InvalidDataError extends HttpException {
    constructor(
      message: string | Record<string, any> = 'Course already exists',
    ) {
      super(message, HttpStatus.CONFLICT);
    }

    public static create(message: string | string[]): InvalidDataError {
      return new InvalidDataError(message);
    }
  }
}
