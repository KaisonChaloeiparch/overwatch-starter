import { Controller, Post, Body } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';

@Controller('incidents')
export class IncidentsController {
    constructor(private readonly incidentsService: IncidentsService) { }

    @Post()
    create(@Body() createIncidentDto: CreateIncidentDto) {
        return this.incidentsService.create(createIncidentDto.text);
    }
}
