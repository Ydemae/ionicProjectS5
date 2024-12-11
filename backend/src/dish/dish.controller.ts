import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {

    constructor(private readonly dishService: DishService) {}

    @Get()
    getAll(){
        return this.dishService.getAll();
    }

    @Get(':id')
    getOneById(@Param('id') id : number){
        return this.dishService.getOneById(id);
    }

    @Post('update')
    update(@Body() data : any){
        console.log(data);
    }

    @Post('create')
    create(@Body() data : any){
        return {"code" : this.dishService.createDish(data)};
    }

    @Get('delete/:id')
    delete(@Param('id') id : number){
        return {"code" : this.dishService.deleteDish(id)};
    }

    @Get('deactivate/:id')
    deactivate(@Param('id') id : number){
        return {"code" : this.dishService.deactivateDish(id)};
    }

    @Get('activate/:id')
    activate(@Param('id') id : number){
        return {"code" : this.dishService.activateDish(id)};
    }
}
