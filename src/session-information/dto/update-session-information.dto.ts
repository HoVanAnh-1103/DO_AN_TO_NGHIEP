import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionInformationDto } from './create-session-information.dto';

export class UpdateSessionInformationDto extends PartialType(CreateSessionInformationDto) {}
