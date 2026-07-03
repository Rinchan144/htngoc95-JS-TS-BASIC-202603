// ============================================================
// Đúng: Dữ liệu đầu vào mô phỏng trường hợp thật (test report).
//        rawEnvName = "   " và rawCriticalMessage = "   " là 2 trường hợp
//        cần xử lý rỗng/mặc định. Lựa chọn dữ liệu test rất tốt.
let rawProjectName = "   Neko CRM   ";
let rawEnvName = "   ";
let rawPassRate = "82";
let rawHasReport = "true";
let rawCriticalMessage = "   ";
let browserUsed = "chrome"; // "chrome", "firefox", "safari", "edge"

// Đúng: trim() bỏ dấu cách 2 đầu -> "Neko CRM".
let projectName = rawProjectName.trim();
// Đúng: trim() cho ra "" (chuỗi rỗng là falsy) -> || "Development" lấy giá trị
//        mặc định. Đây là ứng dụng truthy/falsy rất chuẩn. Khớp yêu cầu.
let envName = rawEnvName.trim() || "Development";
// Đúng: Number("82") -> 82. Đúng yêu cầu chuyển chuỗi sang số.
let passRate = Number(rawPassRate);
// Đúng: trim + toLowerCase rồi so === "true" -> boolean. Rất chắc: xử lý cả
//        chữ "TRUE", " True " ... đồng thời ép về boolean thật (không phải string).
let hasReport = rawHasReport.trim().toLowerCase() === "true";

// Đúng: Logic kiểm tra critical bug đầy đủ 3 nhánh:
//        - null/undefined -> false (an toàn, không crash khi .trim())
//        - trim() === "" -> false (chỉ toàn dấu cách cũng coi là không có bug)
//        - còn lại -> true.
// Đúng: Kiểm tra null/undefined TRƯỚC khi .trim() -> tránh crash khi giá trị
//        là null/undefined. Đây là điểm nhiều bạn bỏ sót, em làm rất tốt!
let hasCriticalBug;
if (rawCriticalMessage === null || rawCriticalMessage === undefined) {
  hasCriticalBug = false;
} else if (rawCriticalMessage.trim() === "") {
  hasCriticalBug = false;
} else {
  hasCriticalBug = true;
}

// Đúng: if/else nhiều cấp đúng thứ tự mốc cao xuống thấp (95 -> 80 -> 60 -> còn lại).
//        passRate = 82 -> rơi vào nhánh >= 80 -> "GOOD". Khớp output.
let grade;
if (passRate >= 95) {
  grade = "EXCELLENT";
} else if (passRate >= 80) {
  grade = "GOOD";
} else if (passRate >= 60) {
  grade = "NEEDS IMPROVEMENT";
} else {
  grade = "CRITICAL";
}

// Đúng: switch đúng cú pháp, gộp case "chrome" + "edge" cùng ra "Chromium"
//        (fall-through không có break giữa 2 case). Có default cho an toàn.
//        browserUsed = "chrome" -> "Chromium". Khớp output.
let engine;
switch (browserUsed) {
  case "chrome":
  case "edge":
    engine = "Chromium";
    break;
  case "firefox":
    engine = "Gecko";
    break;
  case "safari":
    engine = "WebKit";
    break;
  default:
    engine = "Unknown";
}
// Đúng: Dùng ternary cho nhãn "Có report" / "Chưa có report". Gọn và đúng.
// Góp ý nhỏ: Biến reportMessage được tính nhưng KHÔNG được dùng trong output
//        (output dùng hasReport ? "Có Report" : "Không có Report" ở dòng 69).
//        Nên dùng lại reportMessage hoặc xoá biến thừa này.
let reportMessage = hasReport ? "Có report" : "Chưa có report";

// Đúng: isReadyToRelease = true chỉ khi (passRate >= 80) VÀ (không critical bug)
//        VÀ (có report). Em viết ngược lại: false nếu <80, false nếu có bug,
//        false nếu !hasReport, còn lại true. Logic tương đương, đúng yêu cầu.
// Góp ý nhỏ: Cách viết "liệt kê các trường hợp false rồi else true" hơi dài.
//        Có thể gộp bằng && (đã học ở bài toán tử logic):
//          isReadyToRelease = passRate >= 80 && !hasCriticalBug && hasReport;
//        Cách này ngắn hơn và đọc tự nhiên như một câu: "sẵn sàng khi đủ 80,
//        không có bug nghiêm trọng, VÀ có report". Chỉ là gợi ý gọn hơn, code
//        hiện tại vẫn đúng 100%.
let isReadyToRelease;
if (passRate < 80) {
  isReadyToRelease = false;
} else if (hasCriticalBug) {
  isReadyToRelease = false;
} else if (!hasReport) {
  isReadyToRelease = false;
} else {
  isReadyToRelease = true;
}
// Đúng: toFixed(2) cố định 2 chữ số thập phân -> "82.00", cộng "%" -> "82.00%".
//        Đúng yêu cầu format pass rate.
let passRateFormatted = passRate.toFixed(2) + "%";
// Đúng: Template literal in multiline đúng format. Dòng trống giữa Engine và
//        Pass Rate khớp output. Các nhãn Critical Bug / Ready dùng ternary.
console.log(`Project: ${projectName}
Environment: ${envName}
Browser: ${browserUsed}
Engine: ${engine}

Pass Rate: ${passRateFormatted}
Grade: ${grade}
Has Report: ${hasReport ? "Có Report" : "Không có Report"}
Critical Bug: ${hasCriticalBug ? "Có bug nghiêm trọng" : "Không có bug nghiêm trọng"}

Ready: ${isReadyToRelease ? "YES" : "NO"}`);

// ============================================================
// TỔNG HỢP REVIEW — BÀI 3 (HW-3-data-cleaning)
// ============================================================
// Kết quả: ĐẠT — output chạy ra khớp 100%, file chạy sạch không lỗi.
//
// Điểm tốt:
//   - Ứng dụng truthy/falsy rất chuẩn: envName = trim() || "Development"
//     để gán mặc định khi rỗng.
//   - hasReport: trim + toLowerCase + === "true" -> ép về boolean thật, chắc chắn.
//   - hasCriticalBug: kiểm tra null/undefined TRƯỚC khi .trim() -> tránh crash.
//     Đây là điểm nhiều bạn bỏ sót, em làm rất tốt!
//   - grade: if/else nhiều cấp đúng thứ tự mốc cao xuống thấp.
//   - switch: gộp case chrome + edge (fall-through) đúng, có default.
//   - isReadyToRelease: logic đủ 3 điều kiện (passRate, critical bug, report).
//   - Format passRate dùng toFixed(2) đúng yêu cầu.
//   - Template literal multiline đúng layout, có dòng trống phân tách.
//
// Cần cải thiện:
//   - Biến reportMessage (dòng 47-49) được tính nhưng KHÔNG dùng trong output.
//     Nên dùng lại nó ở dòng Has Report, hoặc xoá biến thừa để code gọn.
//   - isReadyToRelease có thể gộp 4 nhánh if/else thành 1 dòng dùng &&:
//       isReadyToRelease = passRate >= 80 && !hasCriticalBug && hasReport;
//     (chỉ là gợi ý gọn hơn, code hiện tại vẫn đúng 100%).
//
// Tổng kết: Bài làm xuất sắc, nắm chắc if/else, switch, truthy/falsy và xử lý
//           dữ liệu rỗng/null an toàn. Code sạch, output khớp đề.
// ============================================================
