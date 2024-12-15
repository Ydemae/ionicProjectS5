import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
  import { Dish } from './dish.entity';
  import { RegisteredDay } from './registered_day.entity';
  
@Entity()
export class DayMeals {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => Dish, (dish) => dish.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'dish_id' })
    dish: Dish;

    @ManyToOne(() => RegisteredDay, (registeredDay) => registeredDay.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'day_id' })
    day: RegisteredDay;

    @Column()
    quantity : number;
}
  