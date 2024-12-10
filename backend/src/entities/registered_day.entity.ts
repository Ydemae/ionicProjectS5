import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RegisteredDay {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day_date: Date;
}