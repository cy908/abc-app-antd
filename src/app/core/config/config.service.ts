import { Injectable } from '@angular/core';

import { Config } from './config-model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config = new Config();

  constructor() { }

  setConfig(config: Config) {
    this.config = config;
  }

  getConfig(): Config {
    return this.config;
  }

}
