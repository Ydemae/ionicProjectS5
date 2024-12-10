import { Controller, Get } from '@nestjs/common';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {

    constructor(private readonly dishService: DishService) {}

    @Get()
    getAll(){
        return this.dishService.getAll();
    }
}
