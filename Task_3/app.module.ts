import { Module } from '@nestjs/common';
import { CourseModule } from './courses/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [CourseModule, EnrollmentModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
