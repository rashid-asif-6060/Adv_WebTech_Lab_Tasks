import { Module } from '@nestjs/common';

import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { CourseModule } from '../courses/course.module';

@Module({
  imports: [CourseModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
