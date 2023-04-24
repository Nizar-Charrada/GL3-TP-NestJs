import { Global, Module } from '@nestjs/common';
import { v4 } from 'uuid';
export const UUID_TOKEN = 'UUID';

const uuidProvider = {
	provide: UUID_TOKEN,
	useValue: v4,
};
@Global()
@Module({
	providers: [uuidProvider],
	exports: [uuidProvider],
})
export class CommonModuleModule {}
