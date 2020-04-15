import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-manage',
  templateUrl: './nav-manage.component.html',
  styleUrls: ['./nav-manage.component.scss']
})
export class NavManageComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.signOut()
    this.router.navigate(['']);
  }

}
