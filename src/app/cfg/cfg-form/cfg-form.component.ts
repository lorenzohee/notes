import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CfgService } from '../cfg.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cfg-form',
  templateUrl: './cfg-form.component.html',
  styleUrls: ['./cfg-form.component.scss']
})
export class CfgFormComponent implements OnInit {
  cfgForm = this.fb.group({
    title: ['', Validators.required],
    key: ['', Validators.required],
    valu: ['', Validators.required],
    note: ['']
  })
  constructor(private fb: FormBuilder, private cfgService: CfgService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getCfgById()
  }

  onSubmit() {
    if (this.cfgForm.value._id) {
      this.cfgService.updateCfg(this.cfgForm.value, this.cfgForm.value._id).subscribe(res => {
        this.router.navigate([`/manage/cfgs`]);
      })
    } else {
      this.cfgService.createCfg(this.cfgForm.value).subscribe(res => {
        this.router.navigate([`/manage/cfgs`]);
      })
    }
  }
  getCfgById() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cfgService.getCfgById(id).subscribe(res => {
        this.cfgForm = this.fb.group({
          _id: [res._id],
          title: [res.title, Validators.required],
          key: [res.key, Validators.required],
          valu: [res.valu, Validators.required],
          note: [res.note]
        })
      })
    }
  }

  goback(){}
}
