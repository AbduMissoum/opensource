
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { CourseDataDTO } from './courseDataDto';

export class CreateCourseDTO {
  
  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string'
        ? (JSON.parse(value) as CourseDataDTO)
        : value;
    } catch (error) {
      throw new BadRequestException({
        status: 400,
        message: error.message,
      });
    }
  })
  data: CourseDataDTO;
}
