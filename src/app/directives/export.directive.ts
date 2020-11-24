import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import { ExportService } from 'app/services/excel/excel.service';

@Directive({
  selector: '[appExport]'
})
export class ExportDirective {

  constructor(private exportService: ExportService) {
  }

  @Input('appExport') listExcel: any[];
  @Input() fileName: string;

  // tslint:disable-next-line:typedef
  @HostListener('click', ['$event']) onClick($event) {
    ('clicked: ' + $event);
    this.exportService.exportExcel(this.listExcel, this.fileName);
  }

}
