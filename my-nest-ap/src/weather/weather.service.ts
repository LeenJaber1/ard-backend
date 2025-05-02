import { Injectable } from '@nestjs/common';
import { CurrentWeather, LocationInfo, WeatherResponse, DailyForecast, HourlyForecast } from 'src/response/weather.response';
import { WeatherApiService } from 'src/weather-api/weather-api.service';

@Injectable()
export class WeatherService {
    constructor(private weatherApiService: WeatherApiService){}

    async getWeatherByCity(city : string){
        const weather = await this.weatherApiService.getWeatherInfo(city);
        return this.formatResponse(weather);
    }

    async getWeatherByCoordinates(latitude : number , longtitude : number){
        const formatedCoord = latitude + ',' + longtitude;
        const weather = await this.weatherApiService.getWeatherInfo(formatedCoord);
        return this.formatResponse(weather);
    }

    private formatResponse(response: any) : WeatherResponse {
        return {
            location: this.getLocationInfo(response),
            current: this.getCurrentWeather(response),
            forecast: {
              daily: this.getDailyForecast(response),
              hourly: this.getHourlyForecast(response),
            },
        };
    }

    private getLocationInfo(response: any): LocationInfo {
        return {
          name: response.location.name,
          country: response.location.country,
          localTime: response.location.localtime,
        };
      }
    
    private getCurrentWeather(response: any): CurrentWeather {
        const current = response.current;
        const astro = response.forecast.forecastday[0].astro;
    
        return {
          temperature: current.temp_c,
          feelsLike: current.feelslike_c,
          condition: current.condition.text,
          humidity: current.humidity,
          uv: current.uv,
          pressure: current.pressure_mb,
          windSpeed: current.wind_kph,
          sunset: astro.sunset,
          sunrise: astro.sunrise,
        };
    }
    
    private getDailyForecast(response: any): DailyForecast[] {
        // the response returns the current day + 5 days
        return response.forecast.forecastday
        .slice(1)
        .map((day: any) => ({
          date: day.date,
          maxTemp: day.day.maxtemp_c,
          condition: day.day.condition.text,
        }));
    }

    private getHourlyForecast(response: any): HourlyForecast[] {
        const targetHours = ['00:00', '12:00', '15:00', '18:00', '21:00'];
      
        return response.forecast.forecastday[0].hour
        //take only the hours that are needed
          .filter((hour: any) => {
            const time = hour.time.split(' ')[1]; 
            return targetHours.includes(time);
          })
        //transform each one left to an hourly forecast object
          .map((hour: any) => ({
            time: hour.time.split(' ')[1],
            temperature: hour.temp_c,
            condition: hour.condition.text,
            windSpeed: hour.wind_kph,
            windDirection: hour.wind_dir,
          }));
    }
      
}
