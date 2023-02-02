import { Module } from '@nestjs/common';
import { IfscService } from './ifsc.service';
import { IfscController } from './ifsc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IFSC } from './entities/ifsc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IFSC])],
  controllers: [IfscController],
  providers: [IfscService],
})
export class IfscModule {}
