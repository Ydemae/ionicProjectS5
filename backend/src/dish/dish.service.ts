import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/entities/dish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DishService {
    
    constructor(
        @InjectRepository(Dish) private readonly dishRepository : Repository<Dish>
    ){}

    async getAll(dish_name : string | null) : Promise<Dish[]>{
        let query = "SELECT id, dish_name, dish_kcal, dish_prot, dish_lip, dish_glu, image_url, active from dish"

        let parameters = []


        if (dish_name && dish_name != ""){
            query += "Where LOWER(dish_name) LIKE LOWER(?)";
            parameters.push(`%${dish_name}%`);
        }

        return await this.dishRepository.query(query, parameters);
    }

    async getAllActive(dish_name : string | null) : Promise<Dish[]>{
        let query = "SELECT id, dish_name, dish_kcal, dish_prot, dish_lip, dish_glu, image_url, active from dish WHERE active = 1"

        let parameters = []


        if (dish_name && dish_name != ""){
            query += " AND LOWER(dish_name) LIKE LOWER(?)";
            parameters.push(`%${dish_name}%`);
        }

        return await this.dishRepository.query(query, parameters);
    }

    async getAllInactive(dish_name : string | null) : Promise<Dish[]>{
        let query = "SELECT id, dish_name, dish_kcal, dish_prot, dish_lip, dish_glu, image_url, active from dish WHERE active = 0"

        let parameters = []


        if (dish_name && dish_name != ""){
            query += " AND LOWER(dish_name) LIKE LOWER(?)";
            parameters.push(`%${dish_name}%`);
        }

        return await this.dishRepository.query(query, parameters);
    }

    async getOneById(id : number) : Promise<Dish>{
        return this.dishRepository.findOne({where : { id }})
    }

    async updateDish(dishData: Partial<Dish>): Promise<number> {
        try{
            await this.dishRepository.update(dishData.id, dishData);
        }
        catch(e){
            console.log(e);
            return 1;
        }
        return 0;
    }

    async createDish(dishData: Partial<Dish>): Promise<boolean> {
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
        return await this.dishRepository.query("SELECT COUNT(*) FROM dish, day_meals WHERE dish.id = day_meals.dish_id AND dish.id = ?", [id]) > 0;
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
            
            if (!dishToRemove){
                return 3;
            }

            if (await this.dishIsInAMeal(id)){
                return 2;
            }

            this.dishRepository.remove(dishToRemove);
            return 0;
        }
        catch(e){
            return 1;
        }
    }

    async checkDishIsActivated(id : number) : Promise<boolean>{
        return await this.dishRepository.query("SELECT COUNT(*) FROM dish WHERE dish.id = ? AND dish.active = 1", [id]) == 1;
    }

    async deactivateDish(id : number) : Promise<number>{
        /**
         * Returns a code:
         * 0 - dish successfully deactivated
         * 1 - Unknown error occurred preventing the dish from being deactivated
         * 2 - The dish couldn't be fetched or doesn't exists anymore
         */
        try{
            if (! await this.checkDishIsActivated(id)){
                return 0; //Dish was already deactivated
            }

            let dish = await this.getOneById(id);
            
            if (!dish){
                return 2;
            }

            dish["active"] = false;
            
            const res = await this.updateDish(dish);

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
            if (await this.checkDishIsActivated(id)){
                return 0 //Dish was already activated
            }

            let dish = await this.getOneById(id);

            dish["active"] = true;
            
            const res = await this.updateDish(dish);

            return res == 0 ? 0 : 1;
        }
        catch(e){
            return 1;
        }
    }


      
}
