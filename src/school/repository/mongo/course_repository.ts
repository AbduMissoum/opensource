import { Inject, Injectable } from '@nestjs/common';
import { Course, CourseProps } from '../../domain/course';
import {
  CourseListPaginated,
  CoursesRepositoryInterface,
  QueryParams,
} from '../course_repository_interface';
import { CourseDocument } from './schemas/course_schema';
import { Model } from 'mongoose';
import { Result } from 'src/commons/result';
import { CourseMapper } from '../../mappers/course_mapper';

@Injectable()
export class CoursesRepository implements CoursesRepositoryInterface {
  constructor(
    @Inject('courses-mongo-model')
    private readonly courseModel: Model<CourseDocument>,
  ) {}

  async save(course: Course): Promise<Result<Course>> {
    try {
      await new this.courseModel(course).save();
    } catch (error) {
      return Result.fail<Course>(error);
    }
    return Result.ok(course);
  }
  async find(
    options: Partial<CourseProps> | { id: string },
  ): Promise<Result<Course>> {
    try {
      const course = await this.courseModel.findOne(options).exec();
      if (!course) {
        return Result.ok<Course>(null);
      }
      return Result.ok<Course>(CourseMapper.toDomain(course));
    } catch (err) {
      console.error({ err });
      return Result.fail<Course>(err);
    }
  }

  async findAll(
    queryParams: QueryParams = {},
  ): Promise<Result<CourseListPaginated>> {
    let courses;
    const { page = 1, pageSize = 10 } = queryParams;
    const skip = (page - 1) * pageSize;

    const total = await this.courseModel.countDocuments().exec();
    try {
      courses = await this.courseModel
        .find()
        .skip(skip)
        .limit(pageSize)
        .exec();
    } catch (error) {
      return Result.fail<CourseListPaginated>(error);
    }
    return Result.ok<CourseListPaginated>({
      totalPages: Math.ceil(total / pageSize),
      currentPage: page,
      total,
      data: courses,
    });
  }

  async update(updateCourse: Course): Promise<Result<Course>> {
    let updatedCourse;
    try {
      updatedCourse = await this.courseModel
        .findOneAndUpdate(
          { id: updateCourse.id },
          { $set: updateCourse },
          { new: true },
        )
        .exec();
    } catch (error) {
      return Result.fail<Course>(error);
    }
    if (!updatedCourse) {
      return Result.fail<Course>(null);
    }
    return Result.ok<Course>(updatedCourse);
  }
}
