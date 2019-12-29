import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VERSION as VERSION_ZORRO, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private modalSrv: NzModalService,
  ) {
    renderer.setAttribute(
      el.nativeElement,
      'ng-zorro-version',
      VERSION_ZORRO.full
    );
  }

  ngOnInit() {
    this.initModalSrv();
  }

  private initModalSrv() {
    this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ).subscribe(() => {
      this.modalSrv.closeAll();
    });
  }

}
