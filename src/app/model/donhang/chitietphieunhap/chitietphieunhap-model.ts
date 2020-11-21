export interface chitietphieunhapModel{
    id?: bigint,
    ma_phieu_nhap?: number,
    ma_san_pham?: number,
    gia_nhap? : number,
    mau? : string,
    size?: string,
    danh_sach_loai_dac_trung?: [any,any],
    so_luong?: number,
    ten_san_pham?: string,
    isActive? : boolean,
    ten_dac_trung?:string,
    checked?:  boolean
 }