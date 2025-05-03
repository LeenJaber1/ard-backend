import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherApiService {
  private readonly apiKey: string;
  private readonly url = 'http://api.weatherapi.com/v1/forecast.json';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('WEATHER_KEY')!;
  }

  async getWeatherInfo(location: string) {
    const response = await axios.get(this.url, {
      params: {
        q: location,
        key: this.apiKey,
        days: 6,
      },
    });
    // disabled because most of the data in the response is not needed and will be formatted into other interfaces
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }
}
