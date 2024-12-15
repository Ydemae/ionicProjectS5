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

    async get(dateStart : string = "", dateEnd : string = "") : Promise<DayMeals[]>{
        let query = "SELECT day_date.id, day_date.dish_id, day_date.day_id FROM day_meals WHERE day_date.day_id = registered_day.id";

        let parameters = [];

        if (dateStart != "" && dateEnd != ""){
            query += " AND registered_day.day_date >= ? AND registered_day.day_date <= ?";
            parameters.push(dateStart, dateEnd);
        }

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

    create(dish_id : number, quantity : number){

        
    }

    delete(){

    }

    update(){

    }
}
