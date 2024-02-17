import { Course, CourseProps } from '../domain/course';

export class CourseMapper {
  public static toDomain(raw: any): Course {
    if (!raw) {
      return null;
    }
    raw = raw.toObject();
    const { _id, __v, ...rest } = raw;
    const course = Course.create(
      {
        ...(rest as CourseProps),
      },
      rest.id,
    );
    if (course.isLeft()) {
      console.error(course.value.getResponse());
      return null;
    }
    return course.value.getValue();
  }
}
