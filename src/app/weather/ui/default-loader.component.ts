import { Component, Input } from "@angular/core"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-default-loader',
    standalone: true,
    imports: [MatProgressSpinnerModule],
    template: `
    <div class="loader">
      <mat-spinner  [diameter]="diameter"></mat-spinner>
    </div>
    `,
    styles: [`
        .loader {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .loader ::ng-deep .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
            stroke: #D1D5DB
        }

    `]
})
export class DefaultLoaderComponent {
    @Input() diameter: number = 100
}