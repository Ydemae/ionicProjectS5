import { Controller, Get, Param } from '@nestjs/common';
import { RegisteredDayService } from './registered_day.service';

@Controller('registered-day')
export class RegisteredDayController {
    
    constructor(
        private registeredDayService : RegisteredDayService
    ) {}

    @Get('')
    Create(){
        return this.registeredDayService.createDay();
    }

    @Get('exists/:date')
    Exists(@Param('date') date : string){
        return this.registeredDayService.dateExists(date)
    }
    

}
