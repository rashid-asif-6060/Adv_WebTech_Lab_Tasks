import { Injectable } from '@nestjs/common';

import { CourseService } from '../courses/course.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(private readonly courseService: CourseService) {}

  // Get all enrollments
  getEnrollments() {
    return {
      message: 'All enrollments fetched',
      data: [],
    };
  }

  // Enroll a student in a course
  enrollStudent(createEnrollmentDto: CreateEnrollmentDto) {
    const { studentName, courseId } = createEnrollmentDto;

    // Get course information
    const course = this.courseService.getCourseById(courseId);

    return {
      message: 'Student enrolled successfully',
      student: studentName,
      course,
    };
  }
}
