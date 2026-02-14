import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Incident {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    text: string;

    @ApiProperty()
    @Column({ default: 'UNCLEAR' })
    type: string;

    @ApiProperty()
    @Column({ default: 'LOW' })
    priority: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;
}
