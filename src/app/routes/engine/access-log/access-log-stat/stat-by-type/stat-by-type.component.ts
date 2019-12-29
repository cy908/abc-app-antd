import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as G2 from '@antv/g2';

import { AccessLogStat } from '../../access-log-model';
import { AccessLogUrl } from '../../access-log-url';

@Component({
  selector: 'app-stat-by-type',
  templateUrl: './stat-by-type.component.html',
  styleUrls: ['./stat-by-type.component.less']
})
export class StatByTypeComponent implements OnInit, AfterViewInit {

  @ViewChild('chartContainer', { static: true })
  private chartContainer: ElementRef<HTMLDivElement>;

  @Input()
  chartType: 'line' | 'column' = 'line';

  private get type(): string {
    if (this.chartType == 'line') {
      return 'time';
    } else if (this.chartType == 'column') {
      return 'timeCat';
    }
  }

  @Input()
  chartHeight = 300;

  @Input()
  statType: 'byYear' | 'byMonth' | 'byDay' | 'byHour' | 'byMinute' = 'byYear';

  private get format(): string {
    if (this.statType == 'byYear') {
      return 'YYYY年';
    } else if (this.statType == 'byMonth') {
      return 'YYYY年MM月'
    } else if (this.statType == 'byDay') {
      return 'YYYY-MM-DD'
    } else if (this.statType == 'byHour') {
      return 'HH'
    } else if (this.statType == 'byMinute') {
      return 'HH:mm'
    } else {
      return null;
    }
  }

  loading = false;
  accessLogStats: AccessLogStat[];
  private chart: G2.Chart;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getAccessLogStats();
  }

  ngAfterViewInit() {
    this.showChart();
  }

  private showChart() {
    if (!this.accessLogStats) {
      return;
    }
    const data = [];
    for (const item of this.accessLogStats) {
      data.push({
        name: 'PV',
        time: item.accessTime,
        value: item.accessPV,
      });
      data.push({
        name: 'IP',
        time: item.accessTime,
        value: item.accessIP,
      });
    }
    if (!!this.chart) {
      this.chart.changeData(data);
      return;
    }
    const chart = new G2.Chart({
      container: this.chartContainer.nativeElement,
      padding: 'auto',
    });
    chart.source(data);
    chart.scale('time', {
      type: this.type,
      mask: this.format,
    });
    chart.scale('value', {
      min: 0,
    });
    if (this.chartType == 'line') {
      chart.tooltip({
        crosshairs: {
          type: 'line',
        }
      });
      chart.line().position('time*value').color('name').shape('smooth').label('value');
      chart.point().position('time*value').color('name').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1,
      });
    } else if (this.chartType == 'column') {
      chart.interval().position('time*value').color('name').label('value').opacity(1).adjust([{
        type: 'dodge',
        marginRatio: 0,
      }]);
    }
    chart.render();
    this.chart = chart;
  }

  refreshChart() {
    this.getAccessLogStats();
  }

  onChartWidthChange(width: number) {
    if (!!this.chart) {
      this.chart.changeWidth(width);
    }
  }

  onChartHeightChange(height: number) {
    if (!!this.chart) {
      this.chart.changeHeight(height);
    }
  }

  private getAccessLogStats() {
    let accessLogStat = new AccessLogStat();
    accessLogStat.statType = this.statType;
    const url = AccessLogUrl.URL_ACCESS_LOG_STAT;
    this.loading = true;
    this.http.post<AccessLogStat[]>(url, accessLogStat)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.accessLogStats = data;
        this.showChart();
      });
  }

}
