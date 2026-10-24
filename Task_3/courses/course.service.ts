import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  // Get all courses
  getAllCourses() {
    return {
      message: 'All courses fetched',
      data: [],
    };
  }

  // Get a specific course by ID
  getCourseById(id: string) {
    return {
      message: 'Course fetched',
      id,
    };
  }

  // Create a new course
  createCourse(createCourseDto: CreateCourseDto) {
    const { name, code } = createCourseDto;

    return {
      message: 'Course created',
      data: {
        name,
        code,
      },
    };
  }
}
