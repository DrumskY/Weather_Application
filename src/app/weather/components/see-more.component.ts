import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-see-more',
    standalone: true,
    imports:[],
    template: `
    <div class="flex flex-col gap-4 ">
        <div class="flex flex-row flex-wrap justify-between items-center gap-4">
            <div class="flex bg-gray-800 rounded-lg item-center pl-5 p-10 flex-1">
                <i class="fa-solid fa-sun-plant-wilt color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                <div><p class="titles color-grey">Weather</p><p class="subtitles color-white">{{weather}}</p></div>
            </div>
            <div class="flex flex-col bg-gray-800 rounded-lg flex-1 pl-5 p-10">
                <div class="flex item-center">
                    <i class="fa-solid fa-cloud color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                    <div><p class="titles color-grey">Cloudiness</p><p class="subtitles color-white">{{cloudiness}} %</p></div>
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-wrap justify-between items-center gap-4">
            <div class="flex flex-col gap-4 flex-1">
                <div class="flex bg-gray-800 rounded-lg item-center pl-5 p-10">
                    <i class="fa-solid fa-temperature-three-quarters color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                    <div><p class="titles color-grey">Real Feel</p><p class="subtitles color-white">{{realFell}}°</p></div>
                </div>
                <div class="flex flex-col bg-gray-800 rounded-lg">
                    <div class="flex item-center pl-5 p-10">
                        <i class="fa-solid fa-wind color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                        <div><p class="titles color-grey">Wind</p><p class="subtitles color-white">{{wind}} km/h</p></div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4 flex-1">
                <div class="flex bg-gray-800 rounded-lg item-cente pl-5 p-10">
                    <i class="fa-solid fa-shower color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                    <div><p class="titles color-grey">Humidity</p><p class="subtitles color-white">{{humidity}}%</p></div>
                </div>
                <div class="flex flex-col bg-gray-800 rounded-lg">
                    <div class="flex item-center pl-5 p-10">
                        <i class="fa-solid fa-eye color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                        <div><p class="titles color-grey">Visibility</p><p class="subtitles color-white">{{visibility / 1000}} km</p></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-wrap justify-between items-center gap-4">
            <div class="flex flex-col gap-4 flex-1">
                <div class="flex bg-gray-800 rounded-lg item-center pl-5 p-10">
                    <i class="fa-solid fa-droplet color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                    <div><p class="titles color-grey">Chance to rain</p><p class="subtitles color-white">{{chanceToRain}} %</p></div>
                </div>
                <div class="flex flex-col bg-gray-800 rounded-lg">
                    <div class="flex item-center pl-5 p-10">
                        <i class="fa-solid fa-sun color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                        <div><p class="titles color-grey">Sunrise</p><p class="subtitles color-white">{{convertDate(sunrise)}}</p></div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4 flex-1">
                <div class="flex bg-gray-800 rounded-lg item-cente pl-5 p-10">
                    <i class="fa-solid fa-down-left-and-up-right-to-center color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                    <div><p class="titles color-grey">Pressure</p><p class="subtitles color-white">{{pressure}} hPa</p></div>
                </div>
                <div class="flex flex-col bg-gray-800 rounded-lg">
                    <div class="flex item-center pl-5 p-10">
                        <i class="fa-solid fa-cloud-sun color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                        <div><p class="titles color-grey">Sunset</p><p class="subtitles color-white">{{convertDate(sunset)}}</p></div>
                    </div>
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
        }
        .see-more-button:hover {
            color: #D1D5DB;
            box-shadow: 1px 1px 2px #000, 0 0 1em #000, 0 0 0.2em #000;
        }
        @media screen and (max-width: 400px) {
            .subtitles {
                font-size: 20px;
            }
            .container {
                justify-content: center
            }
        }`
    ]
})
export class SeeMoreComponent {
    @Input() realFell: number = 0;
    @Input() chanceToRain: number = 0;
    @Input() wind: number = 0;
    @Input() pressure: number = 0;
    @Input() visibility: number = 0;
    @Input() sunset: number = 0;
    @Input() humidity: number = 0;
    @Input() sunrise: number = 0;
    @Input() cloudiness: number = 0;
    @Input() weather: string = ''

    convertDate(unixTimestamp: number): string {
        const date = new Date(unixTimestamp * 1000);
        // Extract hours and minutes in UTC
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        // Format to HH:mm
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime
    }
}