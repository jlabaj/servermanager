import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationTopComponent } from './components/navigation-top/navigation-top.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'sm-root',
  standalone: true,
  templateUrl: './server-manager.component.html',
  styleUrls: ['./server-manager.component.scss'],
  imports: [CommonModule, NavigationTopComponent, MatToolbarModule, RouterModule ],
})
export class ServiceManagerComponent {
}