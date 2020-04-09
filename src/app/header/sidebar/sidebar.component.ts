import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../blog/blog.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  tagCloud$: Observable<string[]>;
  articleTypes$: Observable<any>;
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getSiteTags()
    this.getArticlesByType()
  }
  
  getSiteTags() {
    this.tagCloud$ = this.blogService.tagCloud();
  }

  getArticlesByType() {
    this.articleTypes$ = this.blogService.getArticlesByType();
  }

}
