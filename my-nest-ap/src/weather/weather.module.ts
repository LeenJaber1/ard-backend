import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherApiService } from 'src/weather-api/weather-api.service';
import { WeatherResolver } from 'src/resolvers/weather.resolver';

@Module({
  providers: [WeatherService, WeatherApiService, WeatherResolver],
  exports: [WeatherService]
})
export class WeatherModule {}
