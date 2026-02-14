import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident)
        private incidentsRepository: Repository<Incident>,
        private eventsGateway: EventsGateway,
    ) { }

    async create(text: string): Promise<Incident> {
        const { type, priority } = this.analyzeThreat(text);
        const incident = this.incidentsRepository.create({
            text,
            type,
            priority,
        });
        const savedIncident = await this.incidentsRepository.save(incident);
        this.eventsGateway.emitNewIncident(savedIncident);
        return savedIncident;
    }

    analyzeThreat(text: string): { type: string; priority: string } {
        const highKeywords = ['ไฟ', 'ระเบิด', 'ชน', 'ตาย'];
        const generalKeywords = ['รถติด', 'น้ำท่วม'];

        if (highKeywords.some((keyword) => text.includes(keyword))) {
            return { type: 'ACCIDENT', priority: 'HIGH' };
        }

        if (generalKeywords.some((keyword) => text.includes(keyword))) {
            return { type: 'GENERAL', priority: 'LOW' };
        }

        return { type: 'UNCLEAR', priority: 'LOW' };
    }
}
