import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'sm-circle-svg',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <svg viewBox="0 0 100 100" class="circle-svg">
      <circle cx="50" cy="50" r="50" [attr.fill]="color"></circle>
    </svg>
  `,
	styles: [`
    .circle-svg {
      width: 100%;
      height: auto;
      display: block;
	  min-height:0.5em;
	  max-height:1em;
    }
  `]
})
export class CircleSvgComponent {
	@Input() public color = 'red';
}
