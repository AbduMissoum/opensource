import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { CoursesRepository } from './repository/mongo/course_repository';
import { CourseSchema } from './repository/mongo/schemas/course_schema';
import { CreateCourseController } from './use_cases/course/create_course/create_course_controller';
import { CreateCourseUseCase } from './use_cases/course/create_course/create_course_use_case';


@Module({
  imports: [
  ],

  providers: [
    {
      provide: 'MONGO_CONNECTION',
      useFactory: (): Promise<typeof mongoose> => {
        mongoose.set('strictQuery', false);
        return mongoose.connect(
          'mongodb://root:password@localhost:27017/coursesdb?authSource=admin',
        );
      },
    },
    {
      provide: 'create-course-use-case',
      useClass: CreateCourseUseCase,
    },
    {
      provide: 'courses-repository',
      useClass: CoursesRepository,
    },
    {
      provide: 'courses-mongo-model',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('courses', CourseSchema),
      inject: ['MONGO_CONNECTION'],
    },
  ],

  controllers: [
    CreateCourseController,
  ],
  exports: [
    'create-course-use-case',
  ],
})
export class SchoolModule {}
