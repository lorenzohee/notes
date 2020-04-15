import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from '../comments/comment.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  commentForm = this.fb.group({
    body: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]]
  })
  constructor(private fb: FormBuilder, private commentService: CommentService, public snackBar: MatSnackBar) { }
  navDisplay = true;
  ngOnInit() { }

  onSubmit() {
    this.commentService.createComment(this.commentForm.value).subscribe(res => {
      this.commentForm.reset();
      this.snackBar.open('消息已发出，请等待管理员和您联系', '关闭', {
        duration: 5000,
      });
    })
  }

  windowScrollListener() {
    fromEvent(window, 'scroll')
      .subscribe((event) => {
        if( this.scollPostion().top>100){
          this.navDisplay = false
        }else {
          this.navDisplay = true
        }
    });
  }

  scollPostion() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return {
        top: t,
        left: l,
        width: w,
        height: h
    };
  }
}

