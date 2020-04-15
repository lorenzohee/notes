import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/blogs',
  pathMatch: 'full'  
}, {
  path: 'about',
  component: AboutComponent
}, {
  path: 'blogs',
  children: [
    {
      path: '',
      component: BlogListComponent
    },
    {
      path: ':id',
      component: BlogDetailComponent
    }
  ]
},{
  path: 'manage',
  loadChildren: () => import('./manage/manage.module').then(mod => mod.ManageModule),
  canLoad: [AuthGuard]
},{
  path: 'auth/login',
  component: LoginComponent
}, {
  path: 'admin/admin',
  loadChildren: () => LoginComponent,
  canLoad: [AuthGuard]
}, {
  path: '**',
  redirectTo: 'blogs'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
