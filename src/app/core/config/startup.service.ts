import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from './config.service';

@Injectable()
export class StartupService {

  constructor(
    private title: Title,
    private http: HttpClient,
    private configSrv: ConfigService,
  ) { }

  load(): Promise<any> {
    const configUrl = 'assets/config.json';
    return new Promise(resolve => {
      this.title.setTitle('');
      zip(
        this.http.get(configUrl),
      ).pipe(
        catchError(([configData]) => {
          resolve(null);
          return [configData];
        }),
      ).subscribe(
        ([configData]) => {
          this.configSrv.setConfig(configData);
          this.title.setTitle(configData.title);
        },
        () => { },
        () => {
          resolve(null);
        },
      );
    });
  }

}
