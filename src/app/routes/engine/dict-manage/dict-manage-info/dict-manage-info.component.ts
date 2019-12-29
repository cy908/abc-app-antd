import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { DictManageUrl } from '../dict-manage-url';
import { Dict, DictOption } from '../dict-model';

@Component({
  selector: 'app-dict-manage-info',
  templateUrl: './dict-manage-info.component.html',
  styleUrls: ['./dict-manage-info.component.less']
})
export class DictManageInfoComponent implements OnInit {

  loading = false;
  dictId = 0;
  dict: Dict = null;
  dictType: DictOption = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.dictId = +this.route.snapshot.paramMap.get('id');
    this.getDict();
  }

  private getDict() {
    let dict = new Dict();
    dict.id = this.dictId;
    const url = DictManageUrl.URL_DICT_INFO;
    this.loading = true;
    this.http.post<Dict>(url, dict)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.dict = data;
        if (!!this.dict) {
          this.getDictType();
        }
      });
  }

  private getDictType() {
    let dictOption = new DictOption();
    dictOption.id = this.dict.type;
    const url = DictManageUrl.URL_DICT_TYPE;
    this.loading = true;
    this.http.post<DictOption>(url, dictOption)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.dictType = data;
      });
  }

  goBack() {
    if (!!this.dict) {
      this.router.navigate([DictManageUrl.URL_DICT_LIST, this.dict.type]);
    } else {
      history.back();
    }
  }

}
