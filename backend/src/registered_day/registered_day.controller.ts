import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisteredDayService } from './registered_day.service';

@Controller('registered-day')
export class RegisteredDayController {
    
    constructor(
        private registeredDayService : RegisteredDayService
    ) {}

    @Get('')
    async Create(){
        return {"id" : await this.registeredDayService.createDay()};
    }

    @Post('exists')
    async Exists(@Body() data : any){
        let dayExists = await this.registeredDayService.dateExists(data["date"]);
        if (dayExists){
            return await this.registeredDayService.getByDay(data["date"]);
        }
        else{
            return {"code" : dayExists ? 0 : 1};
        }
    }
    

}
