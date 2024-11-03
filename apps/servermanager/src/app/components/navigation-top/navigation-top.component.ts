import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'sm-navigation-top',
	standalone: true,
	templateUrl: './navigation-top.component.html',
	styleUrls: ['./navigation-top.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
})
export class NavigationTopComponent {


}
