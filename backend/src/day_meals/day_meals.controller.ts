import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DayMealsService } from './day_meals.service';

@Controller('day-meals')
export class DayMealsController {

    constructor(private readonly dayMealsService: DayMealsService) {}

    @Get("getToday")
    async getToday(){
        console.log(await this.dayMealsService.getToday());
        return await this.dayMealsService.getToday();
    }

    @Get("getAll")
    async getAll(){
        return await this.dayMealsService.getAll();
    }

    @Get("delete/:id")
    async delete(@Param("id") id : number){
        return {"code" : await this.dayMealsService.delete(id)};
    }

    @Post("update")
    async update(@Body() data : any){
        return {"code" : await this.dayMealsService.update(data["id"], data["quantity"])};
    }

    @Post("create")
    async create(@Body() data : any){
        return {"code" : await this.dayMealsService.create(data) ? 0 : 1};
    }
}
