import { Controller, Get, Param } from '@nestjs/common';
import { RegisteredDayService } from './registered_day.service';

@Controller('registered-day')
export class RegisteredDayController {
    
    constructor(
        private registeredDayService : RegisteredDayService
    ) {}

    @Get('')
    async Create(){
        return await this.registeredDayService.createDay();
    }

    @Get('exists/:date')
    async Exists(@Param('date') date : string){
        let dayExists = await this.registeredDayService.dateExists(date);
        if (dayExists){
            return await this.registeredDayService.getByDay(date);
        }
        return {"code" : dayExists ? 0 : 1};
    }
    

}
