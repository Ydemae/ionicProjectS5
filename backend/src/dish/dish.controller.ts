import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {

    constructor(private readonly dishService: DishService) {}

    @Get('getAllActive/:name?')
    async getAllActive(@Param('name') name : string | null){
        return await this.dishService.getAllActive(name);
    }

    @Get('getAllInactive/:name?')
    async getAllInactive(@Param('name') name : string | null){
        return await this.dishService.getAllInactive(name);
    }

    @Get('getAll/:name?')
    async getAll(@Param('name') name : string | null){
        return await this.dishService.getAll(name);
    }

    @Get(':id')
    async getOneById(@Param('id') id : number){
        return await this.dishService.getOneById(id);
    }

    @Post('update')
    async update(@Body() data : any){
        console.log(data);
    }

    @Post('create')
    async create(@Body() data : any){
        return data;
        //return {"code" : await this.dishService.createDish(data)};
    }

    @Get('delete/:id')
    async delete(@Param('id') id : number){
        return {"code" : await this.dishService.deleteDish(id)};
    }

    @Get('deactivate/:id')
    async deactivate(@Param('id') id : number){
        return {"code" : await this.dishService.deactivateDish(id)};
    }

    @Get('activate/:id')
    async activate(@Param('id') id : number){
        return {"code" : await this.dishService.activateDish(id)};
    }
}
