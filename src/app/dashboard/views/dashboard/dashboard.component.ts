import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../_infra/shared/components/carga/loader/loader.service';
import { ScrollService } from 'src/app/_infra/layout/basico/components/services/scroll-service.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{

  listasValores: any;
  hasScroll: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private scrollService: ScrollService
  ) {
  }


  ngOnInit(): void {
    this.loaderService.hide();
    this.scrollService.scrolling$.subscribe(flag => {
      this.hasScroll = flag;
    });
  }

}
