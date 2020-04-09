import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BlogIndexComponent } from '../blog/blog-index/blog-index.component';
import { BlogFormComponent } from '../blog/blog-form/blog-form.component';
import { CfgListComponent } from '../cfg/cfg-list/cfg-list.component';
import { CfgFormComponent } from '../cfg/cfg-form/cfg-form.component';

const routes: Routes = [{
  path: '',
  component: BlogIndexComponent  
},{
  path: 'blogs',
  children: [{
    path: '',
    component: BlogIndexComponent
  },{
    path: 'new',
    component: BlogFormComponent
  }, {
    path: 'edit/:id',
    component: BlogFormComponent
  }]
},{
  path: 'cfgs',
  children: [{
    path: '',
    component: CfgListComponent
  },{
    path: 'new',
    component: CfgFormComponent
  },{
    path: 'edit/:id',
    component: CfgFormComponent
  }]
},{
  path: '*',
  redirectTo: 'blogs'
}];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
