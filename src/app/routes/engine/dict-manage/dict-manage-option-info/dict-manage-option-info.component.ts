import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { DictManageUrl } from '../dict-manage-url';
import { Dict, DictOption } from '../dict-model';

@Component({
  selector: 'app-dict-manage-option-info',
  templateUrl: './dict-manage-option-info.component.html',
  styleUrls: ['./dict-manage-option-info.component.less']
})
export class DictManageOptionInfoComponent implements OnInit {

  loading = false;
  dictId = 0;
  id = 0;
  dictOption: DictOption = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.dictId = +this.route.snapshot.paramMap.get('dictId');
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDictOption();
  }

  private getDictOption() {
    let dictOption = new DictOption();
    dictOption.dictId = this.dictId;
    dictOption.id = this.id;
    const url = DictManageUrl.URL_DICT_OPTION_INFO;
    this.loading = true;
    this.http.post<Dict>(url, dictOption)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.dictOption = data;
      });
  }

  goBack() {
    history.back();
  }

}
