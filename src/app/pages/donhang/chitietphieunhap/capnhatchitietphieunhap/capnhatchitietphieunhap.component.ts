import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { chitietphieunhapModel } from 'app/model/donhang/chitietphieunhap/chitietphieunhap-model';
import { phieunhapModel } from 'app/model/donhang/phieunhap/phieunhap-model';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChitietphieunhapService } from 'app/services/donhang/chitietphieunhap/chitietphieunhap.service';
import { SanPhamService } from 'app/services/san-pham/san-pham/san-pham.service';
import { PhieunhapService } from 'app/services/donhang/phieunhap/phieunhap.service';

@Component({
  selector: 'ngx-capnhatchitietphieunhap',
  templateUrl: './capnhatchitietphieunhap.component.html',
  styleUrls: ['./capnhatchitietphieunhap.component.scss']
})
export class CapnhatchitietphieunhapComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachchitietphieunhap: Array<chitietphieunhapModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachphieunhap: Array<phieunhapModel> = [];
  danhsachsanpham: Array<sanphamModel> = [];

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
  model: chitietphieunhapModel;
  arrCheck = [];
  update_id:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private chitietphieunhapService: ChitietphieunhapService,
    private sanphamService: SanPhamService,
    private phieunhapService: PhieunhapService,) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachphieunhap();
    this.fetchDanhsachsanpham();
  }



  fetchDanhsachphieunhap(){
    this.isLoading =  true;
    this.phieunhapService.getAll().subscribe(data => {
      this.danhsachphieunhap = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachsanpham(){
    this.isLoading =  true;
    this.sanphamService.getAll().subscribe(data => {
      this.danhsachsanpham = data.data;
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
        this.title = `Thêm mới thông tin chi tiết phiếu nhập`;
        this.update_id = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin chi tiết phiếu nhập`;
        this.update_id = this.model.ma_phieu_nhap;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin phiếu nhập`;
        this.update_id = this.model.ma_phieu_nhap;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: chitietphieunhapModel, type = null): void {
    this.arrCheck = this.danhsachchitietphieunhap;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_phieu_nhap === null || model.ma_phieu_nhap === undefined) {
      this.formGroup = this.fb.group({
        id: [ null, [Validators.required]],
        ma_phieu_nhap:[ null, [Validators.required]],
        ma_san_pham: [ null, [Validators.required]],
        gia_nhap: [ null, [Validators.required]],
        so_luong: [ null, [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        id: [{value: this.model.id, disabled: this.isInfo}, [Validators.required]],
        ma_phieu_nhap:[{value: this.model.ma_phieu_nhap, disabled: this.isInfo}, [Validators.required]],
        ma_san_pham: [{value: this.model.ma_san_pham, disabled: this.isInfo}, [Validators.required]],
        gia_nhap: [{value: this.model.gia_nhap, disabled: this.isInfo}, [Validators.required]],
        so_luong: [{value: this.model.so_luong, disabled: this.isInfo}, [Validators.required]],

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
    let chitietphieunhap: chitietphieunhapModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      chitietphieunhap = {
        id: this.formGroup.get('id')?.value,
        ma_phieu_nhap:this.formGroup.get('ma_phieu_nhap')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
        gia_nhap: this.formGroup.get('gia_nhap')?.value,
        so_luong: this.formGroup.get('so_luong')?.value,
      };
    } else {
      chitietphieunhap = {
        id: this.formGroup.get('id')?.value,
        ma_phieu_nhap:this.formGroup.get('ma_phieu_nhap')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
        gia_nhap: this.formGroup.get('gia_nhap')?.value,
        so_luong: this.formGroup.get('so_luong')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].id === chitietphieunhap.id) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('id đã tồn tại');
        return;
      }
      this.chitietphieunhapService.create(chitietphieunhap).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Thêm mới thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error(err);
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
    if (this.isEdit) {
      this.chitietphieunhapService.update(chitietphieunhap.ma_phieu_nhap, chitietphieunhap).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Sửa thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error(err);
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }

}
