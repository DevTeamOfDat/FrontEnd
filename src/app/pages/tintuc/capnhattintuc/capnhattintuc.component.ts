import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { tintucModel } from 'app/model/tintuc/tintuc-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TintucService } from 'app/services/tintuc/tintuc.service';

@Component({
  selector: 'ngx-capnhattintuc',
  templateUrl: './capnhattintuc.component.html',
  styleUrls: ['./capnhattintuc.component.scss']
})
export class CapnhattintucComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachtintuc: Array<tintucModel>;
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
  model: tintucModel;
  arrCheck = [];
  update_id:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private tintucService: TintucService,) {
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
        this.title = `Thêm mới thông tin tin tức`;
        // this.update_id= this.arrCheck.length+1;
        console.log(this.arrCheck);
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        // this.title = `Xem chi tiết thông tin tin tức`;
        this.update_id = this.model.id;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin tin tức`;
        // this.update_id = this.model.id;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: tintucModel, type = null): void {
    this.arrCheck = this.danhsachtintuc;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.id === null || model.id === undefined) {
      this.formGroup = this.fb.group({
        tieu_de: [ null, [Validators.required]],
        noi_dung: [ null, [Validators.required]],
        highlight: [ null, [Validators.required]],
        thumbnail: [ null, [Validators.required]],
        url : [ null, [Validators.required]],
        ngay_dang: [ null, [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        tieu_de: [{value: this.model.tieu_de, disabled: this.isInfo}, [Validators.required]],
        noi_dung: [{value: this.model.noi_dung, disabled: this.isInfo}, [Validators.required]],
        highlight: [{value: this.model.highlight, disabled: this.isInfo}, [Validators.required]],
        thumbnail: [{value: this.model.thumbnail, disabled: this.isInfo}, [Validators.required]],
        url : [{value: this.model.url, disabled: this.isInfo}, [Validators.required]],
        ngay_dang: [{value: this.model.ngay_dang, disabled: this.isInfo}, [Validators.required]],
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
    let tintuc: tintucModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      tintuc = {
        id: this.model.id,
        tieu_de: this.formGroup.get('tieu_de')?.value,
        noi_dung: this.formGroup.get('noi_dung')?.value,
        highlight:this.formGroup.get('highlight')?.value,
        thumbnail:this.formGroup.get('thumbnail')?.value,
        url : this.formGroup.get('url')?.value,
        ngay_dang: this.formGroup.get('ngay_dang')?.value,
      };
    } else {
      tintuc = {
        id: this.model.id,
        tieu_de: this.formGroup.get('tieu_de')?.value,
        noi_dung: this.formGroup.get('noi_dung')?.value,
        highlight:this.formGroup.get('highlight')?.value,
        thumbnail:this.formGroup.get('thumbnail')?.value,
        url : this.formGroup.get('url')?.value,
        ngay_dang: this.formGroup.get('ngay_dang')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].id === tintuc.id) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('id đã tồn tại');
        return;
      }
      console.log(tintuc);
      this.tintucService.create(tintuc).subscribe(res => {
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
      this.tintucService.update(tintuc.id, tintuc).subscribe(res => {
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
