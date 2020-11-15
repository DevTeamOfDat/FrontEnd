export interface hoadonModel{
    ma_hoa_don?: bigint,
    ma_nhan_vien?: number,
    ma_khach_hang?: number,
    ngay_lap?: Date,
    loai_don?: number,
    trang_thai?: number,
    tong_tien?: number,
    ten_nhan_vien?: string,
    ten_khach_hang?: string,
    isActive? : boolean,
    checked?:  boolean
 }