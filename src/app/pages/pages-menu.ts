import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Tính năng',
    group: true,
  },
  {
    title: 'Đơn hàng',
    icon: 'layout-outline',
    children: [
      // {
      //   title: 'Loại đơn',
      //   link: '/pages/donhang/loaidon/danhsachloaidon',
      // },
      {
        title: 'Phiếu nhập',
        link: '/pages/donhang/phieunhap/danhsachphieunhap',
      },
      {
        title: 'Chi tiết phiếu nhập',
        link: '/pages/donhang/chitietphieunhap/danhsachchitietphieunhap',
      },
      {
        title: 'Hóa Đơn',
        link: '/pages/donhang/hoadon/danhsachhoadon',
      },
      {
        title: 'Chi tiết hóa Đơn',
        link: '/pages/donhang/chitiethoadon/danhsachchitiethoadon',
      },
      // {
      //   title: 'Trạng thái',
      //   link: '/pages/donhang/trangthai/danhsachtrangthai',
      // },
    ],
  },
  {
    title: 'Tài khoản',
    icon: 'layout-outline',
    children: [
      {
        title: 'Danh sách tài khoản',
        link: '/pages/taikhoan/taikhoan/danhsachtaikhoan',
      },
      {
        title: 'Loại tài khoản',
        link: '/pages/taikhoan/loaitaikhoan/danhsachloaitaikhoan',
      },
    ],
  },
  {
    title: 'Khuyến mãi',
    icon: 'home-outline',
    children: [
      {
        title: 'Khuyến mãi sản phẩm',
        link: '/pages/khuyenmai/khuyenmaisanpham/danhsachkhuyenmaisanpham',
      },
      {
        title: 'Ngày khuyến mãi',
        link: '/pages/khuyenmai/ngaykhuyenmai/danhsachngaykhuyenmai',
      },
      {
        title: 'Voicher',
        link: '/pages/khuyenmai/voicher/danhsachvoucher',
      },
      
      
    ],
  },
  {
    title: 'Nhân viên',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
  },
  {
    title: 'Nhà cung cấp',
    icon: 'keypad-outline',
    link: '/pages/nhacungcap/danhsachnhacungcap',
  },
  {
    title: 'Tin tức',
    icon: 'keypad-outline',
    link: '/pages/tintuc/danhsachtintuc',
  },
  {
    title: 'Sản phẩm',
    icon: 'browser-outline',
    children: [
      {
        title: 'Danh sách sản phẩm',
        link: '/pages/sanpham/san-pham/danhsachsanpham',
      },
      {
        title: 'Đặc trưng',
        link: '/pages/sanpham/dactrung/danhsachdactrung',
      },
      {
        title: 'Đặc trưng sản phẩm',
        link: '/pages/sanpham/dactrungsanpham/danhsachdactrungsanpham',
      },
      {
        title: 'Loại sản phẩm',
        link: '/pages/sanpham/loaisanpham/danhsachloaisanpham',
      },
      {
        title: 'Hình ảnh sản phẩm',
        link: '/pages/sanpham/hinhanhsanpham/danhsachhinhanhsanpham',
      },
      // {
      //   title: 'Nhận xét',
      //   link: '/pages/sanpham/nhanxet/danhsachnhanxet',
      // },
      // {
      //   title: 'Nhập hàng',
      //   link: '/pages/modal-overlays/popover',
      // },
      // {
      //   title: 'Chuyển hàng',
      //   link: '/pages/modal-overlays/toastr',
      // },
      {
        title: 'Thương hiệu',
        link: '/pages/sanpham/thuonghieu/danhsachthuonghieu',
      },
      
    ],
  },
  {
    title: 'Report',
    icon: 'home-outline',
    children: [
      {
        title: 'Báo cáo hàng tồn kho',
        link: '/pages/report/baocaohangtonkho',
      },
      {
        title: 'Báo cáo phiếu nhập',
        link: '/pages/report/baocaophieunhap',
      },
      {
        title: 'Báo cáo hóa dơn',
        link: '/pages/report/baocaohoadon',
      },
      {
        title: 'Báo cáo nhân viên',
        link: '/pages/report/baocaonhanvien',
      },
      
      
    ],
  },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
