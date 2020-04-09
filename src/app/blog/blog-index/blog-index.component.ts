import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Blog } from '../blog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BlogService } from '../blog.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blog-index',
  templateUrl: './blog-index.component.html',
  styleUrls: ['./blog-index.component.scss']
})
export class BlogIndexComponent implements OnInit {

  blogCount = '0';
  currentPage = 1
  displayedColumns: string[] = ['_id', 'title', 'blogType', 'createdAt'];
  columnsToDisplay: string[] = ['_id', 'title', 'blogType', 'createdAt', 'action'];
  dataSource = new MatTableDataSource();
  listParam: any = {
    page: this.currentPage || 1,
  }
  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.listParam = {
          page: (params.get('page') && parseInt(params.get('page'))) || 1,
          blogType: params.get('blogType'),
          tags: params.get('tags')
        }
        this.currentPage = Number.parseInt(params.get('page') || '1');
        return this.blogService.getBlogList(this.listParam)
      })
    ).subscribe(res=>{
      this.dataSource = new MatTableDataSource<Blog>(res);
    })
    this.route.paramMap.pipe(
      switchMap(params => {
        delete this.listParam.page;
        this.listParam = {
          blogType: params.get('blogType'),
          tags: params.get('tags')
        }
        return this.blogService.getBlogCount(this.listParam)
      })
    ).subscribe(res=>{
      this.blogCount = res
    })
  }
  deleteBlog(id) {
    if (confirm('确认要删除此blog吗？')) {
      this.blogService.deleteBlogById(id).subscribe(res => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      })
    }
  }

  changePage(pageEvent: PageEvent): void{
    this.listParam = {
      page: pageEvent.pageIndex + 1
    }
    this.currentPage = pageEvent.pageIndex + 1;
    this.blogService.getBlogList(this.listParam).subscribe(res=>{
      this.dataSource = new MatTableDataSource<Blog>(res);
    })
  }
}
