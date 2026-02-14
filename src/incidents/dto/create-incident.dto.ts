import { ApiProperty } from '@nestjs/swagger';

export class CreateIncidentDto {
    @ApiProperty()
    text: string;
}
