import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { trangthaiModel } from 'app/model/donhang/trangthai/trangthai-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TrangthaiService } from 'app/services/donhang/trangthai/trangthai.service';

@Component({
  selector: 'ngx-capnhattrangthai',
  templateUrl: './capnhattrangthai.component.html',
  styleUrls: ['./capnhattrangthai.component.scss']
})
export class CapnhattrangthaiComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachtrangthai: Array<trangthaiModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
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
  model: trangthaiModel;
  arrCheck = [];
  update_id:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private trangthaiService: TrangthaiService,) {
    }

  ngOnInit(): void {
    this.submitted = false;
    
    
  }
  updateFormType(type: any) {
    switch (type) {
      case 'add':
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        this.title = `Thêm mới thông tin trạng thái`;
        this.update_id = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin trạng thái`;
        this.update_id = this.model.id;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin đặc trưng`;
        this.update_id = this.model.id;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: trangthaiModel, type = null): void {
    this.arrCheck = this.danhsachtrangthai;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.id === null || model.id === undefined) {
      this.formGroup = this.fb.group({
        id: [ null, [Validators.required]],
        gia_tri: [ null, [Validators.required]],
        mo_ta: [null,  [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        id:  [{value: this.model.id, disabled: this.isInfo}, [Validators.required]],
        gia_tri: [{value: this.model.gia_tri, disabled: this.isInfo}, [Validators.required]],
        mo_ta: [{value: this.model.mo_ta, disabled: this.isInfo}, [Validators.required]],

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
    let trangthai: trangthaiModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      trangthai = {
        id: this.formGroup.get('id')?.value,
        gia_tri: this.formGroup.get('gia_tri')?.value,
        mo_ta: this.formGroup.get('mo_ta').value,
      };
    } else {
      trangthai = {
        id: this.formGroup.get('id')?.value,
        gia_tri: this.formGroup.get('gia_tri')?.value,
        mo_ta: this.formGroup.get('mo_ta').value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].id === trangthai.id) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('id đã tồn tại');
        return;
      }
      this.trangthaiService.create(trangthai).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Thêm mới thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
    if (this.isEdit) {
      this.trangthaiService.update(trangthai.id, trangthai).subscribe(res => {
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
