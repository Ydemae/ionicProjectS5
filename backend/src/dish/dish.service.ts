import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/entities/dish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DishService {
    
    constructor(
        @InjectRepository(Dish) private readonly dishRepository : Repository<Dish>
    ){}

    async getAll() : Promise<Dish[]>{
        return this.dishRepository.find();
    }

    async getOneById(id : number) : Promise<Dish>{
        return this.dishRepository.findOne({where : { id }})
    }

    async updateDish(id: number, dishData: Partial<Dish>): Promise<number> {
        try{
            await this.dishRepository.update(id, dishData);
        }
        catch(e){
            return 1;
        }
        return 0;
    }

    createDish(dishData: Partial<Dish>): boolean {
        try{
            const createdDish = this.dishRepository.create(dishData);
            this.dishRepository.save(createdDish);
            return true;
        }
        catch(e){
            return false;
        }
    }

    async dishIsInAMeal(id : number): Promise<boolean> {
        return await this.dishRepository.query("SELECT COUNT(*) FROM dish WHERE dish.id = day_meals.dish_id AND dish.id = :id", [id]) > 0;
    }

    async deleteDish(id : number): Promise<number> {
        /**
         * Returns a code:
         * 0 - dish successfully deleted
         * 1 - Unexpected error occurred preventing the dish from being deleted
         * 2 - The dish is in a meal and therefore can't be deleted
         * 3 - The dish couldn't be fetched or doesn't exist anymore
         */
        try{
            const dishToRemove = await this.getOneById(id);
            
            if (this.dishIsInAMeal(id)){
                return 2;
            }

            if (!dishToRemove){
                return 3;
            }

            this.dishRepository.remove(dishToRemove);
            return 0;
        }
        catch(e){
            return 1;
        }
    }

    async checkDishIsActivated(id : number) : Promise<boolean>{
        return await this.dishRepository.query("SELECT COUNT(*) FROM dish WHERE dish.id = :id AND dish.active = 1", [id]) == 1;
    }

    async deactivateDish(id : number) : Promise<number>{
        /**
         * Returns a code:
         * 0 - dish successfully deactivated
         * 1 - Unknown error occurred preventing the dish from being deactivated
         */
        try{
            if (!this.checkDishIsActivated(id)){
                return 0 //Dish was already deactivated
            }

            let dish = await this.getOneById(id);

            dish["active"] = false;
            
            const res = await this.updateDish(id, dish);

            return res == 0 ? 0 : 1;
        }
        catch(e){
            return 1;
        }
    }

    async activateDish(id : number) : Promise<number>{
        /**
         * Returns a code:
         * 0 - dish successfully deactivated
         * 1 - Unknown error occurred preventing the dish from being deactivated
         */
        try{
            if (this.checkDishIsActivated(id)){
                return 0 //Dish was already activated
            }

            let dish = await this.getOneById(id);

            dish["active"] = true;
            
            const res = await this.updateDish(id, dish);

            return res == 0 ? 0 : 1;
        }
        catch(e){
            return 1;
        }
    }
      
}
