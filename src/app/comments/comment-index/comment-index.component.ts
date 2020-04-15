import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../comment';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommentService } from '../comment.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-comments',
  templateUrl: './comment-index.component.html',
  styleUrls: ['./comment-index.component.scss']
})
export class CommentIndexComponent implements OnInit {
  displayedColumns: string[] = ['name', 'body', 'email', 'parent_type', 'createdAt'];
  columnsToDisplay: string[] = ['name', 'body', 'email', 'parent_id', 'parent_type', 'createdAt', 'action'];
  dataSource = new MatTableDataSource();
  comments: Comment[] = []
  commentCount = '0';
  currentPage = 1;
  listParam: any = {
    page: this.currentPage || 1,
  }

  constructor(private commentService: CommentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.listParam = {
          page: (params.get('page') && parseInt(params.get('page'))) || 1
        }
        this.currentPage = Number.parseInt(params.get('page') || '1');
        return this.commentService.getComments(this.listParam)
      })
    ).subscribe(res=>{
      this.comments = res;
      this.dataSource = new MatTableDataSource<Comment>(res);
    })
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.commentService.getCommentsCount(this.listParam)
      })
    ).subscribe(res=>{
      this.commentCount = res
    })
  }

  deleteComment(id) {
    if (confirm('确认要删除此评论吗？')) {
      this.commentService.deleteCommentById(id).subscribe(res => {
        this.comments = this.comments.filter(ele=>ele._id != res._id)
        this.dataSource = new MatTableDataSource<Comment>(this.comments);
      })
    }
  }

  changePage(pageEvent: PageEvent): void{
    this.listParam = {
      page: pageEvent.pageIndex + 1
    }
    this.currentPage = pageEvent.pageIndex + 1;
    this.commentService.getComments(this.listParam).subscribe(res=>{
      this.comments = res;
      this.dataSource = new MatTableDataSource<Comment>(res);
    })
  }
}
