import { Args, Resolver, Query } from "@nestjs/graphql";
import { WeatherService } from "src/weather/weather.service";
import { WeatherResponse } from "src/response/weather.response";
import { BadRequestException } from "@nestjs/common";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from "src/guards/graphql.guard";

@UseGuards(GqlAuthGuard)
@Resolver()
export class WeatherResolver{
    constructor(private weatherService : WeatherService){}

    @Query(() => WeatherResponse)
    async getWeatherDetails(@Args('city' , {nullable : true}) city : string , 
    @Args('lat' , {nullable : true}) latitude : number,
    @Args('long' , {nullable : true}) longtitude : number) : Promise<WeatherResponse>{
        console.log(city);
        if(city){
            return this.weatherService.getWeatherByCity(city);
        }
        else if (latitude !== undefined && longtitude !== undefined){
            return this.weatherService.getWeatherByCoordinates(latitude , longtitude);
        }
        throw new BadRequestException("must specify location");
    }

}