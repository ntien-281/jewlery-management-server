CREATE DATABASE QLCHVANGBACDAQUI;
use QLCHVANGBACDAQUI;

CREATE TABLE CTBAOCAOKHO (
  Thang INT NOT NULL,
  Nam INT NOT NULL,
  SanPham VARCHAR(50) NOT NULL,
  TonDau INT,
  TonCuoi INT,
  MuaVao INT,
  BanRa INT,
  PRIMARY KEY (Thang, Nam, SanPham)
);

CREATE TABLE BAOCAOTHANG (
  Thang INT NOT NULL,
  Nam INT NOT NULL,
  SoKH INT,
  SoSP INT,
  DoanhThu INT,
  LoiNhuan INT,
  PRIMARY KEY (Thang, Nam)
);

CREATE TABLE THAMSO (
  ID INT PRIMARY KEY,
  TenThamSo VARCHAR(50) NOT NULL,
  GiaTri INT NOT NULL
);

CREATE TABLE LOAIDV (
  ID INT PRIMARY KEY,
  TenLoai VARCHAR(50) NOT NULL,
  DonGia INT NOT NULL
);

CREATE TABLE CTPHIEUDICHVU (
  SoPhieu INT NOT NULL,
  LoaiDV INT NOT NULL,
  SoLuong INT NOT NULL,
  ThanhTien INT,
  TraTruoc INT NOT NULL,
  ConLai INT,
  NgayGiao DATE,
  TinhTrang INT NOT NULL,
  PRIMARY KEY (SoPhieu, LoaiDV)
);

CREATE TABLE PHIEUDICHVU (
  SoPhieu INT PRIMARY KEY,
  NgayLap DATE NOT NULL,
  KhachHang VARCHAR(50),
  SDT VARCHAR(50),
  TongTien INT,
  TinhTrang INT
);

CREATE TABLE NHACUNGCAP (
  ID VARCHAR(50) PRIMARY KEY,
  Ten VARCHAR(50) NOT NULL,
  DiaChi VARCHAR(50) NOT NULL,
  SDT VARCHAR(50) NOT NULL
);

CREATE TABLE PHIEUMUA (
  SoPhieu INT PRIMARY KEY,
  NgayLap DATE NOT NULL,
  NhaCC VARCHAR(50) NOT NULL,
  TongTien INT
);

CREATE TABLE LOAISP (
  MaLoai INT PRIMARY KEY,
  TenLoai VARCHAR(50) NOT NULL,
  DVTinh VARCHAR(50) NOT NULL,
  PhanTram INT NOT NULL
);

CREATE TABLE SANPHAM (
  MaSP VARCHAR(50) PRIMARY KEY,
  TenSP VARCHAR(50) NOT NULL,
  LoaiSP INT NOT NULL,
  DonGiaMua INT NOT NULL,
  SoLuongKho INT NOT NULL
);

CREATE TABLE CTPHIEUMUA (
  SoPhieu INT NOT NULL,
  SanPham VARCHAR(50) NOT NULL,
  SoLuong INT NOT NULL,
  DonGia INT NOT NULL,
  ThanhTien INT,
  PRIMARY KEY (SoPhieu, SanPham)
);

CREATE TABLE CTPHIEUBAN (
  SoPhieu INT NOT NULL,
  SanPham VARCHAR(50) NOT NULL,
  SoLuong INT NOT NULL,
  DonGia INT,
  ThanhTien INT,
  PRIMARY KEY (SoPhieu, SanPham)
);

CREATE TABLE PHIEUBAN (
  SoPhieu INT PRIMARY KEY,
  NgayLap DATE NOT NULL,
  KhachHang VARCHAR(50),
  TongTien INT
);

CREATE TABLE NHOMNGUOIDUNG (
  MaNhom INT PRIMARY KEY,
  TenNhom VARCHAR(50) NOT NULL
);

CREATE TABLE NGUOIDUNG (
  TenDangNhap VARCHAR(50) PRIMARY KEY,
  MatKhau VARCHAR(50) NOT NULL,
  MaNhom INT NOT NULL
);

CREATE TABLE CHUCNANG (
  MaChucNang INT PRIMARY KEY,
  TenChucNang VARCHAR(50) NOT NULL,
  MoTa VARCHAR(50) NOT NULL
);

CREATE TABLE PHANQUYEN (
  MaNhom INT,
  MaChucNang INT NOT NULL,
  PRIMARY KEY (MaNhom, MaChucNang)
);


-- foreign key
ALTER TABLE SANPHAM ADD FOREIGN KEY (LoaiSP) REFERENCES LOAISP(MaLoai);
ALTER TABLE PHIEUMUA ADD FOREIGN KEY (NhaCC) REFERENCES NHACUNGCAP(ID);
ALTER TABLE CTBAOCAOKHO ADD FOREIGN KEY (SanPham) REFERENCES SANPHAM(MaSP);
ALTER TABLE CTBAOCAOKHO ADD FOREIGN KEY PK_THANG (Thang) REFERENCES BAOCAOTHANG(Thang);
CREATE INDEX Nam ON baocaothang(nam);
ALTER TABLE CTBAOCAOKHO ADD FOREIGN KEY PK_NAM (Nam) REFERENCES BAOCAOTHANG(Nam);
ALTER TABLE CTPHIEUMUA ADD FOREIGN KEY (SoPhieu) REFERENCES PHIEUMUA(SoPhieu);
ALTER TABLE CTPHIEUMUA ADD FOREIGN KEY (SanPham) REFERENCES SANPHAM(MaSP);
ALTER TABLE CTPHIEUBAN ADD FOREIGN KEY (SanPHam) REFERENCES SANPHAM(MaSP);
ALTER TABLE CTPHIEUBAN ADD FOREIGN KEY (SoPhieu) REFERENCES PHIEUBAN(SoPhieu);
ALTER TABLE CTPHIEUDICHVU ADD FOREIGN KEY (SoPhieu) REFERENCES PHIEUDICHVU(SoPhieu);
ALTER TABLE CTPHIEUDICHVU ADD FOREIGN KEY (LoaiDV) REFERENCES LOAIDV(ID);
ALTER TABLE NGUOIDUNG ADD FOREIGN KEY (MaNhom) REFERENCES NHOMNGUOIDUNG(MaNhom);
ALTER TABLE PHANQUYEN ADD FOREIGN KEY (MaNhom) REFERENCES NHOMNGUOIDUNG(MaNhom);
ALTER TABLE PHANQUYEN ADD FOREIGN KEY (MaChucNang) REFERENCES CHUCNANG(MaChucNang);


-- check
ALTER TABLE CTBAOCAOKHO ADD CONSTRAINT chk_TonDau CHECK (TonDau >= 0);
ALTER TABLE CTBAOCAOKHO ADD CONSTRAINT chk_TonCuoi CHECK (TonCuoi >= 0);
ALTER TABLE CTBAOCAOKHO ADD CONSTRAINT chk_MuaVao CHECK (MuaVao >= 0);
ALTER TABLE CTBAOCAOKHO ADD CONSTRAINT chk_BanRa CHECK (BanRa >= 0);
ALTER TABLE BAOCAOTHANG ADD CONSTRAINT chk_SoKH CHECK (SoKH >= 0);
ALTER TABLE BAOCAOTHANG ADD CONSTRAINT chk_SoSP CHECK (SoSP >= 0);
ALTER TABLE BAOCAOTHANG ADD CONSTRAINT chk_DoanhThu CHECK (DoanhThu >= 0);
ALTER TABLE THAMSO ADD CONSTRAINT chk_GiaTri CHECK (GiaTri >= 0);
ALTER TABLE LOAIDV ADD CONSTRAINT chk_DonGia_LoaiDV CHECK (DonGia >= 0);
ALTER TABLE CTPHIEUDICHVU ADD CONSTRAINT chk_SoLuongDichVu CHECK (SoLuong > 0);
ALTER TABLE CTPHIEUDICHVU ADD CONSTRAINT chk_TraTruoc CHECK (TraTruoc >= 0);
ALTER TABLE CTPHIEUDICHVU ADD CONSTRAINT chk_TinhTrang_DV CHECK (TinhTrang >= 0 AND TinhTrang <= 1);
ALTER TABLE PHIEUDICHVU ADD CONSTRAINT chk_SDT_KH CHECK (SDT LIKE '0%' AND LENGTH(SDT) = 10);
ALTER TABLE PHIEUDICHVU ADD CONSTRAINT chk_TinhTrang_PDV CHECK (TinhTrang >= 0 AND TinhTrang <= 1);
ALTER TABLE NHACUNGCAP ADD CONSTRAINT chk_SDT_NCC CHECK (SDT LIKE '0%' AND LENGTH(SDT) = 10);
ALTER TABLE SANPHAM ADD CONSTRAINT chk_DonGiaMua CHECK (DonGiaMua >= 0);
ALTER TABLE SANPHAM ADD CONSTRAINT chk_SoLuongKho CHECK (SoLuongKho >= 0);
ALTER TABLE CTPHIEUMUA ADD CONSTRAINT chk_SoLuong CHECK (SoLuong > 0);
ALTER TABLE CTPHIEUMUA ADD CONSTRAINT chk_DonGiaCTMua CHECK (DonGia >= 0);
ALTER TABLE CTPHIEUBAN ADD CONSTRAINT chk_SoLuongBan CHECK (SoLuong > 0);
ALTER TABLE CTPHIEUBAN ADD CONSTRAINT chk_DonGiaCTBan CHECK (DonGia >= 0);


-- trigger 
DELIMITER //
CREATE TRIGGER DonGia_CTPHIEUBAN
BEFORE INSERT ON CTPHIEUBAN
FOR EACH ROW
BEGIN
    SET @DonGiaMua = NULL;
    SET @PhanTram = NULL;
    SELECT DonGiaMua, PhanTram INTO @DonGiaMua, @PhanTram
    FROM SANPHAM INNER JOIN LOAISP ON SANPHAM.LoaiSP = LOAISP.MaLoai
    WHERE SANPHAM.MaSP = NEW.SanPham;
    SET NEW.DonGia = @DonGiaMua + (@DonGiaMua*@PhanTram/100);
END//

CREATE TRIGGER TongTien_PHIEUBAN
BEFORE INSERT ON CTPHIEUBAN
FOR EACH ROW
BEGIN
    SET @TongTien = NULL;
    SELECT SUM(ThanhTien) INTO @TongTien FROM CTPHIEUBAN WHERE SoPhieu = NEW.SoPhieu;
    UPDATE PHIEUBAN SET TongTien = @TongTien WHERE SoPhieu = NEW.SoPhieu;
END//

CREATE TRIGGER ThanhTien_CTPHIEUBAN
BEFORE INSERT ON CTPHIEUBAN
FOR EACH ROW
BEGIN
    SET @DonGiaMua = NULL;
    SET @PhanTram = NULL;
    SELECT DonGiaMua, PhanTram INTO @DonGiaMua, @PhanTram
    FROM SANPHAM INNER JOIN LOAISP ON SANPHAM.LoaiSP = LOAISP.MaLoai
    WHERE SANPHAM.MaSP = NEW.SanPham;
    SET NEW.ThanhTien = NEW.SoLuong * (@DonGiaMua + (@DonGiaMua*@PhanTram/100));
END//

CREATE TRIGGER TongTien_PHIEUMUA
BEFORE INSERT ON CTPHIEUMUA
FOR EACH ROW
BEGIN
    SET @TongTien = NULL;
    SELECT SUM(ThanhTien) INTO @TongTien FROM CTPHIEUMUA WHERE SoPhieu = NEW.SoPhieu;
    UPDATE PHIEUMUA SET TongTien = @TongTien WHERE SoPhieu = NEW.SoPhieu;
END//

CREATE TRIGGER ThanhTien_CTPHIEUMUA
BEFORE INSERT ON CTPHIEUMUA
FOR EACH ROW
BEGIN
    SET @DonGia = NULL;
    SELECT DonGia INTO @DonGia FROM SANPHAM WHERE MaSP = NEW.SanPham;
    SET NEW.ThanhTien = NEW.SoLuong * @DonGia;
END//

CREATE TRIGGER TongTien_PHIEUDICHVU
BEFORE INSERT ON CTPHIEUDICHVU
FOR EACH ROW
BEGIN
    SET @TongTien = NULL;
    SELECT SUM(ThanhTien) INTO @TongTien FROM CTPHIEUDICHVU WHERE SoPhieu = NEW.SoPhieu;
    UPDATE PHIEUDICHVU SET TongTien = @TongTien WHERE SoPhieu = NEW.SoPhieu;
END//

CREATE TRIGGER calc_ThanhTien_CTPHIEUDICHVU
BEFORE INSERT ON CTPHIEUDICHVU
FOR EACH ROW
BEGIN
    DECLARE don_gia INT;
    SELECT DonGia INTO don_gia FROM LoaiDV WHERE ID = NEW.LoaiDV;
    SET NEW.ThanhTien = NEW.SoLuong * don_gia;
END//

CREATE TRIGGER chk_NgayGiao_bi
BEFORE INSERT ON CTPHIEUDICHVU
FOR EACH ROW
BEGIN
    DECLARE ngay_lap DATE;
    SELECT NgayLap INTO ngay_lap FROM PHIEUDICHVU WHERE SoPhieu = NEW.SoPhieu;
    IF NEW.NgayGiao < ngay_lap THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ngày giao phải lớn hơn ngày lập phiếu';
    END IF;
END//

CREATE TRIGGER chk_NgayGiao_bu
BEFORE UPDATE ON CTPHIEUDICHVU
FOR EACH ROW
BEGIN
    DECLARE ngay_lap DATE;
    SELECT NgayLap INTO ngay_lap FROM PHIEUDICHVU WHERE SoPhieu = NEW.SoPhieu;
    IF NEW.NgayGiao < ngay_lap THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ngày giao phải lớn hơn ngày lập phiếu';
    END IF;
END//


CREATE TRIGGER chk_NgayLap_PHIEUMUA_bi
BEFORE INSERT ON PHIEUMUA
FOR EACH ROW
BEGIN
    IF NEW.NgayLap > CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NgayLap must be less than or equal to CURDATE()';
    END IF;
END//

CREATE TRIGGER chk_NgayLap_PHIEUMUA_bu
BEFORE UPDATE ON PHIEUMUA
FOR EACH ROW
BEGIN
    IF NEW.NgayLap > CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NgayLap must be less than or equal to CURDATE()';
    END IF;
END//

CREATE TRIGGER chk_NgayLap_PHIEUBAN_bi
BEFORE INSERT ON PHIEUBAN
FOR EACH ROW
BEGIN
    IF NEW.NgayLap > CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NgayLap must be less than or equal to CURDATE()';
    END IF;
END//

CREATE TRIGGER chk_NgayLap_PHIEUBAN_bu
BEFORE UPDATE ON PHIEUBAN
FOR EACH ROW
BEGIN
    IF NEW.NgayLap > CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NgayLap must be less than or equal to CURDATE()';
    END IF;
END//

CREATE TRIGGER chk_NgayLap_PHIEUDICHVU_bi
BEFORE INSERT ON PHIEUDICHVU
FOR EACH ROW
BEGIN
    IF NEW.NgayLap > CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NgayLap must be less than or equal to CURDATE()';
    END IF;
END//

CREATE TRIGGER chk_NgayLap_PHIEUDICHVU_bu
BEFORE UPDATE ON PHIEUDICHVU
FOR EACH ROW
BEGIN
    IF NEW.NgayLap > CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NgayLap must be less than or equal to CURDATE()';
    END IF;
END//

CREATE TRIGGER tg_SoLuongKho_Update_After_Insert_Mua
AFTER INSERT ON CTPHIEUMUA
FOR EACH ROW
BEGIN
    UPDATE SANPHAM SET SoLuongKho = SoLuongKho + NEW.SoLuong
    WHERE MaSP = NEW.SanPham;
END//
CREATE TRIGGER tg_SoLuongKho_Update_After_Insert_Ban
AFTER INSERT ON CTPHIEUBAN
FOR EACH ROW
BEGIN
    UPDATE SANPHAM SET SoLuongKho = SoLuongKho - NEW.SoLuong
    WHERE MaSP = NEW.SanPham;
END//

DELIMITER ;




