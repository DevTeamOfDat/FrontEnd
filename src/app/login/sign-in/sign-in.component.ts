import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { TaikhoanService } from 'app/services/taikhoan/taikhoan.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formLogin: FormGroup;
  taikhoan: taikhoanModel;
  submitted = false;
  constructor(private fb: FormBuilder, private taikhoanService: TaikhoanService, private router: Router, private toaster: ToastrService) {

  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(new RegExp(/^(.{10,})$/))]],
      mat_khau: [null, [Validators.required, Validators.pattern(new RegExp(/^(.{8,})$/))]],
    });
  }

  Login() {
    this.submitted = true;
    if (this.formLogin.invalid) {
      this.toaster.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    this.taikhoan = {
      email: this.formLogin.controls.email.value,
      mat_khau: this.formLogin.controls.mat_khau.value
    };
    this.taikhoanService.login(this.taikhoan).subscribe(res => {
      if (res.token) {
        localStorage.setItem('Token', res.token);
        this.toaster.success('Đăng nhập thành công');
        this.router.navigate(['/admin']);
      }
      if(res.error) {
        this.toaster.error("Sai mật khẩu, vui lòng nhập lại");
      }  
    },
    err => {
      this.toaster.error("tài khoản không tồn tại");
    });
  }

}
