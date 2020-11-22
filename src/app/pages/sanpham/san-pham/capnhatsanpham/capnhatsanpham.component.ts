import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanPhamService } from 'app/services/san-pham/san-pham/san-pham.service';
import { LoaiSanPhamService } from 'app/services/san-pham/loai-san-pham/loai-san-pham.service';
import { loaisanphamModel } from 'app/model/san-pham/loaisanpham/loaisanpham-model';
import { ThuongHieuService } from 'app/services/san-pham/thuong-hieu/thuong-hieu.service';
import { thuonghieuModel } from 'app/model/san-pham/thuong-hieu/thuonghieu-model';

@Component({
  selector: 'ngx-capnhatsanpham',
  templateUrl: './capnhatsanpham.component.html',
  styleUrls: ['./capnhatsanpham.component.scss']
})
export class CapnhatsanphamComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachsanpham: Array<sanphamModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachthuonghieu: Array<thuonghieuModel> = [];
  danhsachloaisanpham: Array<loaisanphamModel> = [];
  checkButton = false;
  closeResult: String;
  modalReference!: any;
  formGroup: FormGroup;
  isAdd = false;
  isEdit = false;
  isInfo = false;
  submitted = false;
  isLoading=false;
  title = '';
  type: any;
  model: sanphamModel;
  arrCheck = [];
  update_ma_san_pham:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private sanphamService: SanPhamService,
    private thuonghieuService: ThuongHieuService,
    private loaisanphamService: LoaiSanPhamService) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachthuonghieu();
    this.fetchDanhsachloaisanpham();
  }

  fetchDanhsachthuonghieu(){
    this.isLoading =  true;
    this.thuonghieuService.getAll().subscribe(data => {
      this.danhsachthuonghieu = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachloaisanpham(){
    this.isLoading =  true;
    this.loaisanphamService.getAll().subscribe(data => {
      this.danhsachloaisanpham = data.data;
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
        this.title = `Thêm mới thông tin sản phẩm`;
        // this.update_ma_san_pham = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin sản phẩm`;
        // this.update_ma_san_pham = this.model.ma_san_pham;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin sản phẩm`;
        // this.update_ma_san_pham = this.model.ma_san_pham;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: sanphamModel, type = null): void {
    this.arrCheck = this.danhsachsanpham;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_san_pham === null || model.ma_san_pham === undefined) {
      this.formGroup = this.fb.group({
        ma_thuong_hieu: [ null, [Validators.required]],
        ma_loai_san_pham: [ null, [Validators.required]],
        ten_san_pham: [ null, [Validators.required]],
        gia_ban: [ null],
        so_luong: [ null],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ma_thuong_hieu: [{value: this.model.ma_thuong_hieu, disabled: this.isInfo}, [Validators.required]],
        ma_loai_san_pham: [{value: this.model.ma_loai_san_pham, disabled: this.isInfo}, [Validators.required]],
        ten_san_pham: [{value: this.model.ten_san_pham, disabled: this.isInfo}, [Validators.required]],
        gia_ban: [{value: this.model.gia_ban, disabled: this.isInfo}],
        so_luong: [{value: this.model.so_luong, disabled: this.isInfo}],
      });


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
    let sanpham: sanphamModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      sanpham = {
        ma_san_pham : this.model.ma_san_pham,
        ma_thuong_hieu: this.formGroup.get('ma_thuong_hieu')?.value,
        ma_loai_san_pham: this.formGroup.get('ma_loai_san_pham')?.value,
        ten_san_pham: this.formGroup.get('ten_san_pham')?.value,
      };
      
    } else {
      sanpham = {
        ma_san_pham : this.model.ma_san_pham,
        ma_thuong_hieu: this.formGroup.get('ma_thuong_hieu')?.value,
        ma_loai_san_pham: this.formGroup.get('ma_loai_san_pham')?.value,
        ten_san_pham: this.formGroup.get('ten_san_pham')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_san_pham === sanpham.ma_san_pham) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã sản phẩm đã tồn tại');
        return;
      }
      this.sanphamService.create(sanpham).subscribe(res => {
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
      this.sanphamService.update(sanpham.ma_san_pham, sanpham).subscribe(res => {
        this.closeModalReloadData();
        this.toastr.success(res.success);
        this.modalReference.dismiss();
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }


}
