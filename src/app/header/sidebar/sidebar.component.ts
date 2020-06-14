import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../blog/blog.service';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  tagCloud$: Observable<string[]>;
  articleTypes$: Observable<any>;
  value = ''
  constructor(private blogService: BlogService, private router: Router) { }

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

  searchBlog(){
    this.router.navigate(['/blogs',{search: this.value}])
  }

}
