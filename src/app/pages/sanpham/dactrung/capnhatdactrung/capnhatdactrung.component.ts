import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { dactrungModel } from 'app/model/san-pham/dac-trung/dactrung-model';
import { DactrungService } from 'app/services/san-pham/dactrung/dactrung.service';

@Component({
  selector: 'ngx-capnhatdactrung',
  templateUrl: './capnhatdactrung.component.html',
  styleUrls: ['./capnhatdactrung.component.scss']
})
export class CapnhatdactrungComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachdactrung: Array<dactrungModel>;
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
  model: dactrungModel;
  arrCheck = [];
  update_loai_dac_trung:any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dactrungService: DactrungService,) {
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
        this.title = `Thêm mới thông tin đặc trưng`;
        // this.update_loai_dac_trung = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin đặc trưng`;
        // this.update_loai_dac_trung = this.model.loai_dac_trung;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin đặc trưng`;
        // this.update_loai_dac_trung = this.model.loai_dac_trung;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: dactrungModel, type = null): void {
    this.arrCheck = this.danhsachdactrung;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.loai_dac_trung === null || model.loai_dac_trung === undefined) {
      this.formGroup = this.fb.group({
        ten_dac_trung: [ null, [Validators.required]],
        mo_ta: [null],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ten_dac_trung: [{value: this.model.ten_dac_trung, disabled: this.isInfo}, [Validators.required]],
        mo_ta: [{value: this.model.mo_ta, disabled: this.isInfo}],

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
    let dactrung: dactrungModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      dactrung = {
        loai_dac_trung: this.model.loai_dac_trung,
        ten_dac_trung: this.formGroup.get('ten_dac_trung')?.value,
        mo_ta: this.formGroup.get('mo_ta').value,
      };
    } else {
      dactrung = {
        ten_dac_trung: this.formGroup.get('ten_dac_trung')?.value,
        mo_ta: this.formGroup.get('mo_ta').value,
      };
      
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].loai_dac_trung === dactrung.loai_dac_trung) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Loại đặc trưng đã tồn tại');
        return;
      }
      this.dactrungService.create(dactrung).subscribe(res => {
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
      this.dactrungService.update(dactrung.loai_dac_trung, dactrung).subscribe(res => {
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
