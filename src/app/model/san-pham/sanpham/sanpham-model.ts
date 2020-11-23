export interface sanphamModel{
    ma_san_pham? : bigint,
    ma_thuong_hieu? : bigint,
    ma_loai_san_pham? : bigint,
    ten_san_pham? :string,
    gia_ban? :number,
    so_luong? :number,
    ten_thuong_hieu? : string,
    ten_loai_san_pham?: string,
    isActive? : number,
    checked?:  boolean
 }