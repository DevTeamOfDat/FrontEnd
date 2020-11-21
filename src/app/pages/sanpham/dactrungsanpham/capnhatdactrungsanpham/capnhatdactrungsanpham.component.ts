import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { dactrungsanphamModel } from 'app/model/san-pham/dactrungsanpham/dactrungsanpham-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DactrungsanphamService } from 'app/services/san-pham/dactrungsanpham/dactrungsanpham.service';
import { NhaCungCapService } from 'app/services/nha-cung-cap/nha-cung-cap.service';
import { SanPhamService } from 'app/services/san-pham/san-pham/san-pham.service';
import { DactrungService } from 'app/services/san-pham/dactrung/dactrung.service';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';
import { dactrungModel } from 'app/model/san-pham/dac-trung/dactrung-model';

@Component({
  selector: 'ngx-capnhatdactrungsanpham',
  templateUrl: './capnhatdactrungsanpham.component.html',
  styleUrls: ['./capnhatdactrungsanpham.component.scss']
})
export class CapnhatdactrungsanphamComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachdactrungsanpham: Array<dactrungsanphamModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachsanpham: Array<sanphamModel> = [];
  danhsachdactrung: Array<dactrungModel> = [];
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
  model: dactrungsanphamModel;
  arrCheck = [];
  update_id: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dactrungsanphamService: DactrungsanphamService,
    private dactrungService: DactrungService,
    private sanphamService: SanPhamService) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhSachDacTrung();
    this.fetchDanhsachsanpham();
  }

  fetchDanhSachDacTrung(){
    this.isLoading =  true;
    this.dactrungService.getAll().subscribe(data => {
      this.danhsachdactrung = data.data;
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
        this.title = `Thêm mới thông tin đặc trưng sản phẩm`;
        this.update_id = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin đặc trưng sản phẩm`;
        this.update_id = this.model.id;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin đặc trưng sản phẩm`;
        this.update_id = this.model.id;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: dactrungsanphamModel, type = null): void {
    this.arrCheck = this.danhsachdactrungsanpham;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.id === null || model.id === undefined) {
      this.formGroup = this.fb.group({
        id: [ null, [Validators.required]],
        loai_dac_trung: [ null, [Validators.required]],
        ma_san_pham: [ null, [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        id: [{value: this.model.id, disabled: this.isInfo}, [Validators.required]],
        loai_dac_trung: [{value: this.model.loai_dac_trung, disabled: this.isInfo}, [Validators.required]],
        ma_san_pham: [{value: this.model.ma_san_pham, disabled: this.isInfo}, [Validators.required]],
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
    let dactrungsanpham: dactrungsanphamModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      dactrungsanpham = {
        id: this.formGroup.get('id')?.value,
        loai_dac_trung: this.formGroup.get('loai_dac_trung')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
      };
    } else {
      dactrungsanpham = {
        id: this.formGroup.get('id')?.value,
        loai_dac_trung: this.formGroup.get('loai_dac_trung')?.value,
        ma_san_pham: this.formGroup.get('ma_san_pham')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].id === dactrungsanpham.id) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('id đã tồn tại');
        return;
      }
      this.dactrungsanphamService.create(dactrungsanpham).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Thêm mới thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
    if (this.isEdit) {
      this.dactrungsanphamService.update(dactrungsanpham.id, dactrungsanpham).subscribe(res => {
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
