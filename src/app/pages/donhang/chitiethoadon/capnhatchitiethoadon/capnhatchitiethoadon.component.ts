import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { chitiethoadonModel } from 'app/model/donhang/chitiethoadon/chitiethoadon-models';
import { hoadonModel } from 'app/model/donhang/hoadon/hoadon-model';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChitiethoadonService } from 'app/services/donhang/chitiethoadon/chitiethoadon.service';
import { SanPhamService } from 'app/services/san-pham/san-pham/san-pham.service';
import { HoadonService } from 'app/services/donhang/hoadon/hoadon.service';
import { dactrungsanphamModel } from 'app/model/san-pham/dactrungsanpham/dactrungsanpham-model';
import { DactrungsanphamService } from 'app/services/san-pham/dactrungsanpham/dactrungsanpham.service';

@Component({
  selector: 'ngx-capnhatchitiethoadon',
  templateUrl: './capnhatchitiethoadon.component.html',
  styleUrls: ['./capnhatchitiethoadon.component.scss']
})
export class CapnhatchitiethoadonComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachchitiethoadon: Array<chitiethoadonModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachhoadon: Array<hoadonModel> = [];
  danhsachsanpham: Array<sanphamModel> = [];
  danhsachdactrungsanpham: Array<dactrungsanphamModel> = [];

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
  ma_san_pham: any;
  model: chitiethoadonModel;
  arrCheck = [];
  arrdactrung = [];
  update_id:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private chitiethoadonService: ChitiethoadonService,
    private dactrungsanphamService: DactrungsanphamService,
    private sanphamService: SanPhamService,
    private hoadonService: HoadonService,) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachhoadon();
    this.fetchDanhsachsanpham();
  }



  fetchDanhsachhoadon(){
    this.isLoading =  true;
    this.hoadonService.getAll().subscribe(data => {
      this.danhsachhoadon = data.data;
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

  fetchDanhsachkdactrungsanpham(){
    this.isLoading =  true;
    this.dactrungsanphamService.detail(this.ma_san_pham).subscribe(data => {
      this.danhsachdactrungsanpham = data.data;
      console.log(this.danhsachdactrungsanpham);
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
        this.title = `Thêm mới thông tin chi tiết hóa đơn`;
        this.update_id = this.arrCheck.length+1;
        this.ma_san_pham = this.model.ma_san_pham;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin chi tiết hóa đơn`;
        this.update_id = this.model.ma_hoa_don;
        this.ma_san_pham = this.model.ma_san_pham;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin chi tiết hóa đơn`;
        this.update_id = this.model.ma_hoa_don;
         this.ma_san_pham = this.model.ma_san_pham;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: chitiethoadonModel, type = null): void {
    this.arrCheck = this.danhsachchitiethoadon;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    
    this.ma_san_pham = this.model.ma_san_pham;
    
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_hoa_don === null || model.ma_hoa_don === undefined) {
      
      this.formGroup = this.fb.group({
        ma_hoa_don:[ null, [Validators.required]],
        danh_sach_loai_dac_trung: [ null, [Validators.required]],
        ma_san_pham: [ null, [Validators.required]],
        gia_ban: [ null],
        so_luong: [ null, [Validators.required]],
        
      });
    } else {
      this.ma_san_pham = this.model.ma_san_pham;
      this.fetchDanhsachkdactrungsanpham();
      this.formGroup = this.fb.group({
        ma_hoa_don:[{value: this.model.ma_hoa_don, disabled: this.isInfo}, [Validators.required]],
        danh_sach_loai_dac_trung:[{value: this.model.danh_sach_loai_dac_trung, disabled: this.isInfo}, [Validators.required]],
        ma_san_pham: [{value: this.model.ma_san_pham, disabled: this.isInfo}, [Validators.required]],
        gia_ban: [{value: this.model.gia_ban, disabled: this.isInfo}, ],
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
    let chitiethoadon: chitiethoadonModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      chitiethoadon = {
        id: this.model.id,
        ma_hoa_don:this.formGroup.get('ma_hoa_don')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
        danh_sach_loai_dac_trung: this.formGroup.get('danh_sach_loai_dac_trung')?.value,
        gia_ban: this.formGroup.get('gia_ban')?.value,
        so_luong: this.formGroup.get('so_luong')?.value,
        
      };
    } else {
      
      chitiethoadon = {
        ma_hoa_don:this.formGroup.get('ma_hoa_don')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
        danh_sach_loai_dac_trung: this.formGroup.get('danh_sach_loai_dac_trung')?.value,
        gia_ban: this.formGroup.get('gia_ban')?.value,
        so_luong: this.formGroup.get('so_luong')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].id === chitiethoadon.id) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('id đã tồn tại');
        return;
      }
      console.log(chitiethoadon);
      this.chitiethoadonService.create(chitiethoadon).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Thêm mới thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
    if (this.isEdit) {
      this.chitiethoadonService.update(chitiethoadon.id, chitiethoadon).subscribe(res => {
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
