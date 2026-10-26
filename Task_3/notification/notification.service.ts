import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  // Send notification to a student
  sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent successfully',
      student: studentName,
      notification: message,
    };
  }
}
