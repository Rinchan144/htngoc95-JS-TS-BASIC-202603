//Bài 1

// Dữ liệu đầu vào:

// Giá gốc (Lấy từ UI - String): " 1.000.000 đ "
// Phần trăm giảm (Lấy từ DB - Number): 20 (tức là 20%)
// Giá sau giảm (Lấy từ UI - String): " 800.000 đ "
// Yêu cầu: Viết code để:

// Làm sạch và chuyển đổi Giá gốc về Number.
// Tính toán giá mong đợi: Giá gốc * (100 - 20) / 100.

let giaTien = "1.000.000 đ";
let giamGia = "20%";
let giaSauGiam = "800.000 đ";

//***Cach 1: Dùng Number để chuyển đổi chuỗi thành số***
let giaTien = "1.000.000 đ";
let giamGia = "20%";

let giaTienDaLamSach = giaTien.replaceAll(".", "").replace(" đ", "");
let giamGiaDaLamSach = giamGia.replace("%", "");
let giaMongDoi = Number(giaTienDaLamSach) * (100 - Number(giamGiaDaLamSach)) / 100;
console.log(giaMongDoi);
//Tính gộp cho ngắn gọn hơn
let giaMongDoi1 = Number(giaTien.replaceAll(".", "").replace(" đ", "")) * (100 - Number(giamGia.replace("%", ""))) / 100;
console.log(giaMongDoi1);

//***Cach 2: Dùng regex để tách số và đơn vị***
let giaTien1 = giaTien.match(/\d+/g).join("");
let giamGia1 = giamGia.match(/\d+/g).join("");
let giaSauGiam1 = giaSauGiam.match(/\d+/g).join("");

let giaMongDoi1 = Number(giaTien1) * (100 - Number(giamGia1)) / 100;
console.log(giaMongDoi1);

//Bài 2
// let tenSanPham = "   macbook pro m3   ";
// let giaGoc = "Price: 30,000,000 vnđ";
// let soLuong = "Sl: 2 máy";
// let maGiamGia = "DISCOUNT CODE: 10% OFF";

// HÓA ĐƠN THANH TOÁN - ID: #0002
// Sản phẩm: MACBOOK PRO M3
// Đơn giá: 30000000
// Số lượng: 2
// Tổng tiền (Gốc): 60000000
// Giảm giá: 10%
// THÀNH TIỀN: 54.000.000 VNĐ

let tenSanPham = "   macbook pro m3   ";
let giaGoc = "Price: 30,000,000 vnđ";
let soLuong = "Sl: 2 máy";
let maGiamGia = "DISCOUNT CODE: 10% OFF";
let maHoaDon = "#0002";

let tenSanPham1 = tenSanPham.trim().toUpperCase();
let giaGoc1 = Number(
    giaGoc
        .replace("Price:", "")
        .replace("vnđ", "")
        .replaceAll(",", "")
        .trim()
);
let soLuong1 = Number(soLuong.replace("Sl:", "").replace("máy", "").trim());
let maGiamGia1 = Number(maGiamGia.replace("DISCOUNT CODE:", "").replace("% OFF", "").trim());
let tongTienGoc = giaGoc1 * soLuong1;
let thanhTien = tongTienGoc * (1 - maGiamGia1 / 100);

console.log(`HÓA ĐƠN THANH TOÁN - ID: ${maHoaDon}`);
console.log(`Sản phẩm: ${tenSanPham1}
Sản phẩm: ${tenSanPham1}
Đơn giá: ${giaGoc1} VNĐ
Số lượng: ${soLuong1}
Tổng tiền (Gốc): ${tongTienGoc}
Giảm giá: ${maGiamGia1}%
THÀNH TIỀN: ${thanhTien.toLocaleString("vi-VN")} VNĐ`);