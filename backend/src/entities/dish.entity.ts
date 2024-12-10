import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:100})
  dish_name: string;

  @Column()
  dish_kcal: number;

  @Column()
  dish_prot: number;

  @Column()
  dish_lip: number;

  @Column()
  dish_glu: number;
}
