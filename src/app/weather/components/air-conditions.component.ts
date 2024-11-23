import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-air-conditions',
    standalone: true,
    imports:[],
    template: `
        <div class="flex justify-between">
            <h1 class="pl-4 titles color-grey">Air Conditions</h1>
            <button class="pr-4">See more</button>
        </div>
        <div class="flex flex-row justify-between pl-10 pr-10 items-center h-5/6">
            <div class="flex flex-col">
                <div class="flex">
                    <i class="fa-solid fa-temperature-three-quarters color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                    <div><p class="titles color-grey">Real Feel</p><p class="subtitles color-white">{{realFell}}°</p></div>
                </div>
                <div class="flex flex-col">
                    <div class="flex">
                        <i class="fa-solid fa-droplet color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                        <div><p class="titles color-grey">Chance to rain</p><p class="subtitles color-white">{{chanceToRain}} km/h</p></div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="flex">
                    <i class="fa-solid fa-wind color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                    <div><p class="titles color-grey">Wind</p><p class="subtitles color-white">{{wind}}%</p></div>
                </div>
                <div class="flex flex-col">
                    <div class="flex">
                        <i class="fa-solid fa-down-left-and-up-right-to-center color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                        <div><p class="titles color-grey">Pressure</p><p class="subtitles color-white">{{pressure}}hPa</p></div>
                    </div>
                </div>
            </div>
        </div>
        
    `,
    styles:[
        `.titles {
            font-family: "Rubik" sans-serif;
            font-weight: 600;
            font-size: 20px;
            line-height: 46px;
        }
        .color-white {
            color: #D1D5DB;
        }
        .color-grey {
            color: #4B5563;
        }
        .subtitles {
            font-family: "Rubik" sans-serif;
            font-weight: 700;
            font-size: 40px;
            line-height: 46px;
        }`
    ]
})
export class AirConditionsComponent {
    @Input() realFell: number = 0;
    @Input() chanceToRain: number = 0;
    @Input() wind: number = 0;
    @Input() pressure: number = 0;
}