import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-air-conditions',
    standalone: true,
    imports:[],
    template: `
        <div class="container flex justify-between item-center flex-wrap">
            <h1 class="pl-4 titles color-grey">Air Conditions</h1>
            <button (click)="onSeeMoreClick()" class="see-more-button pr-4 bg-blue-500 hover:bg-blue-700 color-grey font-bold py-2 px-4 rounded-full">See more</button>
        </div>
        <div class="flex flex-row flex-wrap justify-between pl-10 pr-10 items-center h-5/6">
            <div class="flex flex-col">
                <div class="flex">
                    <i class="fa-solid fa-temperature-three-quarters color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                    <div><p class="titles color-grey">Real Feel</p><p class="subtitles color-white">{{realFell}}°</p></div>
                </div>
                <div class="flex flex-col">
                    <div class="flex">
                        <i class="fa-solid fa-droplet color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                        <div><p class="titles color-grey">Chance to rain</p><p class="subtitles color-white">{{chanceToRain}} %</p></div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="flex">
                    <i class="fa-solid fa-wind color-grey pt-2 pr-2" style="font-size: 30px;"></i>
                    <div><p class="titles color-grey">Wind</p><p class="subtitles color-white">{{wind}} km/h</p></div>
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
export class AirConditionsComponent {
    @Input() realFell: number = 0;
    @Input() chanceToRain: number = 0;
    @Input() wind: number = 0;
    @Input() pressure: number = 0;
    @Output() seeMoreClicked = new EventEmitter<void>();

    onSeeMoreClick() {
        this.seeMoreClicked.emit();
    }
}