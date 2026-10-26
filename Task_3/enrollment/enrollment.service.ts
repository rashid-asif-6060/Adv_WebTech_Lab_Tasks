import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { CourseService } from '../courses/course.service';
import { NotificationService } from '../notification/notification.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly courseService: CourseService,

    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
  ) {}

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

    // Send notification after enrollment
    const notification = this.notificationService.sendNotification(
      studentName,
      'You have successfully enrolled in the course!',
    );

    return {
      message: 'Student enrolled successfully',
      student: studentName,
      course,
      notification,
    };
  }
}
