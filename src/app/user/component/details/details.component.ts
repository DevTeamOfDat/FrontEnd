import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,ParamMap} from '@angular/router'
import { dactrungsanphamModel } from 'app/model/san-pham/dactrungsanpham/dactrungsanpham-model';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';
import { DactrungsanphamService } from 'app/services/san-pham/dactrungsanpham/dactrungsanpham.service';
import { SanPhamService } from 'app/services/san-pham/san-pham/san-pham.service';
@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor( private router: ActivatedRoute, private sanphamService: SanPhamService ,  private dactrungsanphamService: DactrungsanphamService) { }
  sanpham: Array<sanphamModel> = [];
  dactrungsanpham:Array<dactrungsanphamModel>=[];
  id="";
  name="";
 
  ngOnInit(): void {
    this.getID();
    this.fetchSanpham();
    this.fetchDactrung();
  }
  getID(){
    this.router.paramMap.subscribe((params:ParamMap) => {
      this.id = params.get("ma_san_pham");
      this.name=params.get("ten_san_pham");
      
    })

  }
  fetchSanpham(){
   
    this.sanphamService.detail(this.id).subscribe(data => {
      this.sanpham = data.data;
    
    })
  }
  fetchDactrung(){
    this.dactrungsanphamService.detail(this.id).subscribe(data => {
      this.dactrungsanpham = data.data;
      console.log("dactrung" + this.dactrungsanpham);
    })
  }




}
