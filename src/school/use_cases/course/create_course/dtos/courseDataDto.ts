import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  ArrayMinSize,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CourseState } from 'src/school/domain/course_state';

class ContentDTO {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  admissionRequirements: string;

  @ValidateNested()
  @IsString()
  contact: string;
}

class SectionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class CourseDataDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  duration: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  format: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Cost should be more than 0' })
  cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: CourseState;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  languages: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  certificationOffered: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nextSessionDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  certificationType: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContentDTO)
  content: ContentDTO;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  sections: SectionDto[];
}
