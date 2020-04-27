import { Component, OnInit } from '@angular/core';
import { CfgService } from '../cfg.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';

@Component({
  selector: 'app-cfg-list',
  templateUrl: './cfg-list.component.html',
  styleUrls: ['./cfg-list.component.scss']
})
export class CfgListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'key', 'valu'];
  columnsToDisplay: string[] = ['title', 'key', 'valu', 'action'];
  dataSource = new MatTableDataSource();
  cfgCount = '0';
  currentPage = 1;
  listParam: any = {
    page: this.currentPage || 1,
  }
  constructor(private cfgService: CfgService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.listParam = {
          page: (params.get('page') && parseInt(params.get('page'))) || 1
        }
        this.currentPage = Number.parseInt(params.get('page') || '1');
        this.getCfgData();
        this.getCfgCount();
        return of()
      })
    ).subscribe()
  }

  deleteCfg(id) {
    if (confirm('确认要删除此cfg吗？')) {
      this.cfgService.deleteCfgById(id).subscribe(res => {
        this.getCfgData();
        this.getCfgCount();
      })
    }
  }

  changePage(pageEvent: PageEvent): void{
    this.listParam = {
      page: pageEvent.pageIndex + 1
    }
    this.currentPage = pageEvent.pageIndex + 1;
    this.getCfgData()
  }

  getCfgData() {
    this.cfgService.getCfgList(this.listParam).subscribe(res=>{
      this.dataSource.data = res;
    })
  }

  getCfgCount(){
    this.cfgService.getCfgCount(this.listParam).subscribe(res=>{
      this.cfgCount = res
    })
  }
}
