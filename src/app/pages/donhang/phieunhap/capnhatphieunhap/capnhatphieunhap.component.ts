import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { nhacungcapModel } from 'app/model/nhacungcap/nhacungcap-model';
import { trangthaiModel } from 'app/model/donhang/trangthai/trangthai-model';
import { phieunhapModel } from 'app/model/donhang/phieunhap/phieunhap-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PhieunhapService } from 'app/services/donhang/phieunhap/phieunhap.service';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';
import { TrangthaiService } from 'app/services/donhang/trangthai/trangthai.service';
import { NhaCungCapService } from 'app/services/nha-cung-cap/nha-cung-cap.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-capnhatphieunhap',
  templateUrl: './capnhatphieunhap.component.html',
  styleUrls: ['./capnhatphieunhap.component.scss'],
  providers: [DatePipe]
})
export class CapnhatphieunhapComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachphieunhap: Array<phieunhapModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachtaikhoan: Array<taikhoanModel> = [];
  danhsachnhacungcap: Array<nhacungcapModel> = [];
  checknhacungcap: Array<nhacungcapModel> = [];
  danhsachtrangthai: Array<trangthaiModel> = [];
  arrbyKH: Array<taikhoanModel> = [];
  arrbyNV: Array<taikhoanModel> = [];
  checkButton = false;
  closeResult: String;
  modalReference!: any;
  formGroup: FormGroup;
  isAdd = false;
  isEdit = false;
  isInfo = false;
  isCheck = false;
  submitted = false;
  isLoading=false;
  title = '';
  myDate = new Date();
  type: any;
  model: phieunhapModel;
  arrCheck = [];
  update_ma_phieu_nhap:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private phieunhapService: PhieunhapService,
    private nhanvienService: TaikhoanService,
    private trangthaiService: TrangthaiService,
    private nhacungcapService: NhaCungCapService,
    private datePipe: DatePipe) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachnhanvien();
    this.fetchDanhsachtrangthai();
    this.fetchDanhsachnhacungcap();
  }


  fetchDanhsachnhanvien(){
    this.isLoading =  true;
    this.nhanvienService.getAll().subscribe(data => {
      this.danhsachtaikhoan = data.data;
      this.arrbyNV = this.danhsachtaikhoan.filter(function (khachhang) {
        return khachhang.loai_tai_khoan === "NV";
      });
    },   
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachtrangthai(){
    this.isLoading =  true;
    this.trangthaiService.getAll().subscribe(data => {
      this.danhsachtrangthai = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachnhacungcap(){
    this.isLoading =  true;
    this.danhsachnhacungcap =[];
    this.nhacungcapService.getAll().subscribe(data => {
      this.checknhacungcap = data.data;
      for(let item of this.checknhacungcap){
        if(item.isActive===1){
            this.danhsachnhacungcap.push(item);
        }
      }
    
  },
    err => {
        this.isLoading = false;
      })
  }

  updateFormType(type: any) {
    switch (type) {
      case 'add':
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        this.title = `Thêm mới thông tin phiếu nhập`;
         this.update_ma_phieu_nhap = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        if(this.model.ghi_chu === ""){
          this.isCheck = true;
        }
        else{
          this.isCheck = false;
        }
        this.title = `Xem chi tiết thông tin phiếu nhập`;
         this.update_ma_phieu_nhap = this.model.ma_phieu_nhap;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin phiếu nhập`;
         this.update_ma_phieu_nhap = this.model.ma_phieu_nhap;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: phieunhapModel, type = null): void {
    this.arrCheck = this.danhsachphieunhap;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
    
    if (model.ma_phieu_nhap === null || model.ma_phieu_nhap === undefined) {
      this.formGroup = this.fb.group({
        ma_phieu_nhap: [ null],
        ma_nha_cung_cap: [ null, [Validators.required]],
        ngay_nhap: [this.datePipe.transform(Date.now(),"yyyy/MM/dd")],
        ma_nhan_vien: [ null],
        ten_nhan_vien:[ null],
        tong_tien: [null],
        ghi_chu: [null],
        
      });
    } else {
      
      this.formGroup = this.fb.group({
        ma_phieu_nhap: [{value: this.model.ma_phieu_nhap, disabled: this.isInfo}],
        ma_nha_cung_cap: [{value: this.model.ma_nha_cung_cap, disabled: this.isInfo}, [Validators.required]],
        ngay_nhap: [{value: this.model.ngay_nhap, disabled: this.isInfo}],
        tong_tien: [{value: this.model.tong_tien, disabled: this.isInfo}],
        ma_nhan_vien: [{value: this.model.ma_nhan_vien, disabled: this.isInfo}],
        ten_nhan_vien:[{value: this.model.ten_nhan_vien, disabled: this.isInfo}],
        ghi_chu: [{value: this.model.ghi_chu, disabled: this.isInfo}],

      });
      (this.formGroup);
    }
  }


  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'md',
    });
    this.modalReference.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  save() {
    let check = false;
    let phieunhap: phieunhapModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      phieunhap = {
        ma_phieu_nhap: this.model.ma_phieu_nhap, 
        ma_nha_cung_cap: this.formGroup.get('ma_nha_cung_cap')?.value,
        ghi_chu:this.formGroup.get('ghi_chu')?.value,
      };
    } else {
      phieunhap = {
        ma_phieu_nhap: this.model.ma_phieu_nhap,
        ma_nha_cung_cap: this.formGroup.get('ma_nha_cung_cap')?.value,
        ghi_chu:this.formGroup.get('ghi_chu')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_phieu_nhap === phieunhap.ma_phieu_nhap) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('id đã tồn tại');
        return;
      }
      this.phieunhapService.create(phieunhap).subscribe(res => {
        this.closeModalReloadData();
        this.toastr.success(res.success);
        this.modalReference.dismiss();
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
    if (this.isEdit) {
      this.phieunhapService.update(phieunhap.ma_phieu_nhap, phieunhap).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Sửa thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }


}
