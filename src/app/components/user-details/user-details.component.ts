import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  standalone: true,
  styleUrl: './user-details.component.css',
  imports: [HttpClientModule, CommonModule],
  providers: [UserService],
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.userService.getUserById(Number(userId)).subscribe((data) => {
          this.user = data.data;
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
