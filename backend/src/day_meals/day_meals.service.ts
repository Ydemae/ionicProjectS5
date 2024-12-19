import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DayMeals } from 'src/entities/day_meals.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DayMealsService {

    @InjectRepository(DayMeals) private readonly dayMealsRepository : Repository<DayMeals>

    private formatDateToYmd(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    async get(dateStart : string = "", dateEnd : string = "", id : number = null) : Promise<DayMeals[]>{
        let query = "SELECT day_meals.id, day_meals.dish_id, day_meals.day_id, day_meals.quantity, dish.dish_kcal, dish.dish_prot, dish.dish_glu, dish.dish_lip FROM day_meals, registered_day, dish WHERE day_meals.day_id = registered_day.id AND day_meals.dish_id = dish.id";

        let parameters = [];

        if (dateStart != "" && dateEnd != ""){
            query += " AND registered_day.day_date >= ? AND registered_day.day_date <= ?";
            parameters.push(dateStart, dateEnd);
        }

        if (id != null){
            query += " AND day_meals.id = ?";
            parameters.push(id);
        }

        query += " ORDER BY day_meals.id DESC";

        return await this.dayMealsRepository.query(query, parameters);
    }

    async getAll(){
        return await this.get();
    }

    async getToday(){
        const todayDate = new Date();
        const formatedDate = this.formatDateToYmd(todayDate);
        return await this.get(formatedDate, formatedDate);
    }

    async create(dayMeal : Partial<DayMeals>){
        try{
            const createdDayMeal = this.dayMealsRepository.create(dayMeal);
            await this.dayMealsRepository.save(createdDayMeal);
            return true;
        }
        catch(e){
            return false;
        }
    }

    async delete(id : number){
        try{
            const dayMealToRemove = await this.get("", "", id)[0];
            
            if (!dayMealToRemove){
                return 2;
            }

            await this.dayMealsRepository.remove(dayMealToRemove);
            return 0;
        }
        catch(e){
            return 1;
        }
    }

    async update(id : number, quantity : number){
        try{
            let data = await this.get("", "", id)[0];
            data["quantity"] = quantity;
            this.dayMealsRepository.update(id, data);

            return 0;
        }
        catch(e){
            return 1;
        }
    }
}
