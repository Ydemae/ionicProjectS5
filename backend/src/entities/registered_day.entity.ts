import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RegisteredDay {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', unique: true })
    day_date: string;
}