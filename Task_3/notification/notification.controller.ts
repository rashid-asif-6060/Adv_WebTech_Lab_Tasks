import { Controller, Post, Body } from '@nestjs/common';

import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { CheckEnrollmentDto } from './dto/check-enrollment.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // POST /notification/send
  @Post('send')
  sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    const { studentName, message } = sendNotificationDto;

    return this.notificationService.sendNotification(studentName, message);
  }

  // POST /notification/check
  @Post('check')
  checkEnrollmentAndNotify(@Body() checkEnrollmentDto: CheckEnrollmentDto) {
    const { studentName, courseId } = checkEnrollmentDto;

    return this.notificationService.checkEnrollmentAndNotify(
      studentName,
      courseId,
    );
  }
}
