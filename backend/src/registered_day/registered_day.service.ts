import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisteredDay } from 'src/entities/registered_day.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegisteredDayService {

    @InjectRepository(RegisteredDay) private readonly dayRepository : Repository<RegisteredDay>


    async dateExists(day_date : string) : Promise<boolean>{
        return await this.dayRepository.exists({where: {day_date}});
    }

    private formatDateToYmd(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
      

    async createDay(): Promise<number> {
        /**
         * Returns a code based on the result
         * 0 - Date was created
         * 1 - Unexpected error
         * 2 - Date already exists for current day
         */


        const todayDate = new Date();
        
        const day_date = this.formatDateToYmd(todayDate);

        if (this.dateExists(day_date)){
            return 2
        }

        try{
            const createdDay = this.dayRepository.create();
            createdDay.day_date = day_date;
            await this.dayRepository.save(createdDay);
            return 0;
        }
        catch(e){
            return 1;
        }
    }

}
