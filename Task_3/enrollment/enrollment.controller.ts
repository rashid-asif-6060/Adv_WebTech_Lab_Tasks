import { Controller, Get, Post, Body } from '@nestjs/common';

import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  // GET /enrollment
  @Get()
  getEnrollments() {
    return this.enrollmentService.getEnrollments();
  }

  // POST /enrollment
  @Post()
  enrollStudent(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.enrollStudent(createEnrollmentDto);
  }
}
