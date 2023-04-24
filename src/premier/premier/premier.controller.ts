import { Controller, Delete, Get, Patch, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('premier')
export class PremierController {
	getmethod(@Req() request: Request): string {
		console.log('request method :', request.method);
		return request.method;
	}
	@Post()
	postmethod(@Req() request: Request): string {
		return this.getmethod(request);
	}
	@Get()
	getmethod2(@Req() request: Request): string {
		return this.getmethod(request);
	}
	@Put()
	putmethod(@Req() request: Request): string {
		return this.getmethod(request);
	}
	@Patch()
	patchmethod(@Req() request: Request): string {
		return this.getmethod(request);
	}
	@Delete()
	deletemethod(@Req() request: Request): string {
		return this.getmethod(request);
	}
}
