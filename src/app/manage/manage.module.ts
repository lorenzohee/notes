import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { BlogFormComponent } from '../blog/blog-form/blog-form.component';
import { CfgListComponent } from '../cfg/cfg-list/cfg-list.component';
import { CfgFormComponent } from '../cfg/cfg-form/cfg-form.component';
import { NavManageComponent } from '../header/nav-manage/nav-manage.component';
import { BlogIndexComponent } from '../blog/blog-index/blog-index.component';
import { SharedModule } from '../shared/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CommentIndexComponent } from '../comments/comment-index/comment-index.component';


@NgModule({
  declarations: [
    BlogFormComponent,
    CfgListComponent,
    CfgFormComponent,
    NavManageComponent,
    BlogIndexComponent,
    CommentIndexComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    SharedModule,
    ManageRoutingModule
  ],
})
export class ManageModule { }
