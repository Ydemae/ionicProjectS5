import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisteredDay } from 'src/entities/registered_day.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegisteredDayService {

    @InjectRepository(RegisteredDay) private readonly dayRepository : Repository<RegisteredDay>


    async getByDay(day_date : string): Promise<Array<any>>{
        return await this.dayRepository.query("SELECT id FROM registered_day WHERE day_date = ?", [day_date]);
    }

    async dateExists(day_date : string) : Promise<boolean>{
        return (await this.getByDay(day_date)).length > 0;
    }

    private formatDateToYmd(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
      

    async createDay(): Promise<number> {
        const todayDate = new Date();
        
        const day_date = this.formatDateToYmd(todayDate);

        if (await this.dateExists(day_date)){
            return -1
        }

        try{
            const createdDay = this.dayRepository.create();
            createdDay.day_date = day_date;
            await this.dayRepository.save(createdDay);
            return createdDay.id;
        }
        catch(e){
            return -1;
        }
    }

}
