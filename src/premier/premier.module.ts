import { Module } from '@nestjs/common';
import { Controller1Controller } from './controller1/controller1.controller';
import { PremierController } from './premier/premier.controller';

@Module({
	controllers: [Controller1Controller, PremierController],
})
export class PremierModule {}
