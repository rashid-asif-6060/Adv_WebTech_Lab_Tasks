import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private readonly enrollmentService: EnrollmentService,
  ) {}

  // Send notification to a student
  sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent successfully',
      student: studentName,
      notification: message,
    };
  }

  // Check enrollment and notify
  checkEnrollmentAndNotify(studentName: string, courseId: string) {
    const enrollments = this.enrollmentService.getEnrollments();

    return {
      message: 'Enrollment checked successfully',
      student: studentName,
      courseId,
      enrollmentData: enrollments,
    };
  }
}
