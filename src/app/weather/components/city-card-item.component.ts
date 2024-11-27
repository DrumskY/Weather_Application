import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-city-card-item',
    standalone: true,
    imports:[],
    template: `
        <div class="flex flex-row justify-between item-center flex-wrap  rounded-lg gap-4 p-4 cursor-pointer"
            [class.container-not-clicked]="!isClicked"
            [class.container-clicked]="isClicked"
            (click)="onCardClick()">
            <div class="flex flex-row flex-wrap justify-center items-center">
                <div>
                    <img [src]="icon" alt="Weather icon" />
                </div>
                <div>
                    <p class="titles color-white">{{cityName}}</p>
                    <sup class="subtitles color-grey">{{time}}</sup>
                </div>
            </div>
            <div class="flex items-center justify-center">
                <p class="titles color-white">{{temp}}°C</p>
            </div>
        </div>
        
    `,
    styles:[
        `.titles {
            font-family: "Rubik" sans-serif;
            font-weight: 600;
            font-size: 30px;
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
            font-size: 20px;
            line-height: 46px;
        }
        .container-not-clicked{
            background-color: #1f2937
        }
        .container-clicked{
            border: 2px solid #0844A6
        }`
    ]
})
export class CityCardItemComponent {
    @Input() icon: string = '';
    @Input() cityName: string = '';
    @Input() time: string = '';
    @Input() temp: number | string = 0;
    @Input() isClicked: boolean = false
    @Output() cardClicked = new EventEmitter<void>(); 

    onCardClick(): void {
        this.cardClicked.emit();
    }
}