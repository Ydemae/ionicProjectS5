import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishController } from './dish/dish.controller';
import { DishService } from './dish/dish.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dish } from './entities/dish.entity';
import { RegisteredDay } from './entities/registered_day.entity';
import { DayMeals } from './entities/day_meals.entity';
import { RegisteredDayController } from './registered_day/registered_day.controller';
import { RegisteredDayService } from './registered_day/registered_day.service';
import { DayMealsService } from './day_meals/day_meals.service';
import { DayMealsController } from './day_meals/day_meals.controller';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([Dish, RegisteredDay, DayMeals])
  ],
  controllers: [AppController, DishController, RegisteredDayController, DayMealsController],
  providers: [AppService, DishService, RegisteredDayService, DayMealsService],
})
export class AppModule {}
