const sheetName = 'Sheet1';
const scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);
    const nextRow = sheet.getLastRow() + 1;

    // Lấy các giá trị từ form
    const name = e.parameter['name'] || '';
    const email = e.parameter['email'] || '';
    const date = new Date();

    // Lưu dữ liệu vào Google Sheets
    const newRow = [name, email];
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // Đường dẫn URL của hình ảnh banner từ Google Drive
    const bannerUrl = 'https://drive.google.com/file/d/1uh9m304TeJXEVziYV74wBTnMbArL6_Cv/view?usp=drive_link';

    // Chỉ gửi hình ảnh banner trong email
      const subject = 'Nhận Ebook miễn phí!';
    const body = `
    <html>
      <body>
        <p>
          <img src="${bannerUrl}" alt="Banner" style="max-width: 100%; height: auto;">
        </p>
        <p>
          Chào bạn, <br><br>
          Cảm ơn bạn đã đăng ký nhận Ebook từ chúng tôi! Hy vọng bạn sẽ tìm thấy một điều chạm vào mình - đủ để thôi thúc bạn bắt đầu thay đổi, không phải từ thế giới bên ngoài, mà từ chính góc rễ bên trong.
        </p>
        <p>
          Nếu bạn cần một người đồng hành sâu sắc trong hành trình khám phá bản thân, <strong>Coach Moon</strong> luôn sẵn sàng lắng nghe.
        </p>
        <p>
          Thân mến,<br>
          <strong>Coach Moon Phạm</strong>
        </p>
        <p>
          <strong>Thông tin liên hệ:</strong><br>
          <a href="https://www.facebook.com/minh.nguyet.771282/">Fanpage: Coach Moon Phạm</a><br>
          Zalo: 0903 885 044
        </p>
      </body>
    </html>`;

      // Gửi email
      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: body
      });

      // Trả về kết quả thành công
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
        .setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
      // Nếu có lỗi, trả về kết quả lỗi
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'error', 'error': err.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    } finally {
      // Giải phóng khóa
      lock.releaseLock();
    }
  }
 

