import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onSearch(event: any) {
    const userId = event.target.value;
    if (userId) {
      this.router.navigate(['/user', userId]);
    }
  }
}
