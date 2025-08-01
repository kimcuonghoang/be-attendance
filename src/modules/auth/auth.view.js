export const generateResetPasswordEmail = (resetLink, expiresIn) => {
  return /*html*/ `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Đặt lại mật khẩu</title>
    <style>
      body {
        font-family: "Segoe UI", sans-serif;
        background-color: #f2f4f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      .header {
        background-color: #2563eb;
        color: #ffffff;
        text-align: center;
        padding: 30px 20px;
      }
      .header img {
        max-width: 140px;
        margin-bottom: 10px;
      }
      .header h1 {
        font-size: 24px;
        margin: 0;
      }
      .content {
        padding: 30px;
        color: #333333;
      }
      .content h2 {
        font-size: 22px;
        margin-top: 0;
        margin-bottom: 10px;
      }
      .content p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 16px;
      }
      .button {
        display: inline-block;
        padding: 14px 28px;
        background-color: #2563eb;
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }
      .button:hover {
        background-color: #1d4ed8;
      }
      .footer {
        background-color: #f9fafb;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #666666;
      }
      .footer a {
        color: #2563eb;
        text-decoration: none;
        margin: 0 6px;
      }
      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://via.placeholder.com/150x50?text=Your+Logo" alt="Logo" />
        <h1>Yêu cầu đặt lại mật khẩu</h1>
      </div>
      <div class="content">
        <h2>Xin chào,</h2>
        <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình. Vui lòng nhấn vào nút bên dưới để tiến hành:</p>
        <p style="text-align: center;">
          <a href="${resetLink}" class="button">Đặt lại mật khẩu</a>
        </p>
        <p>Link này sẽ hết hạn sau <strong>${expiresIn}</strong>. Nếu bạn không thực hiện yêu cầu này, bạn có thể bỏ qua email.</p>
        <p>Nếu nút không hoạt động, hãy sao chép và dán đường dẫn này vào trình duyệt:</p>
        <p style="word-break: break-all;"><a href="${resetLink}">${resetLink}</a></p>
        <p>Trân trọng,<br/>Đội ngũ CodeFarm</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} CodeFarm. All rights reserved.</p>
        <p>
          <a href="https://codefarm.edu.vn">Trang chủ</a> |
          <a href="mailto:support@codefarm.edu.vn">Liên hệ</a> |
          <a href="https://codefarm.edu.com/privacy">Chính sách bảo mật</a>
        </p>
        <p>Toà 7F đường Hà Lê - Kim Hoàng - Vân Canh - Hoài Đức - Hà Nội</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export const generatePasswordResetSuccessEmail = () => /*html*/ `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CF - Mật khẩu đã được đặt lại</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #28a745;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .header img {
        max-width: 150px;
      }
      .content {
        padding: 30px;
        color: #333333;
      }
      .content h2 {
        font-size: 24px;
        margin-top: 0;
      }
      .content p {
        font-size: 16px;
        line-height: 1.6;
      }
      .footer {
        background-color: #f8f9fa;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #666666;
      }
      .footer a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://codefarm.edu.vn/_next/static/media/Logo.50657ef8.svg" alt="Logo" />
        <h1>CodeFarm - Mật khẩu đã được đặt lại</h1>
      </div>
      <div class="content">
        <h2>Xin chào,</h2>
        <p>
          Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập vào tài khoản của mình với mật khẩu mới.
        </p>
        <p>
          Nếu bạn không thực hiện hành động này, vui lòng liên hệ với chúng tôi ngay lập tức qua email
          <a href="mailto:support@codefarm.edu.vn">support@codefarm.edu.vn</a>.
        </p>
        <p>Trân trọng,<br />Đội ngũ hỗ trợ</p>
      </div>
      <div class="footer">
        <p>
          © ${new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <p>
          <a href="https://codefarm.edu.vn">Trang chủ</a> |
          <a href="mailto:support@codefarm.edu.vn">Liên hệ</a> |
          <a href="https://codefarm.edu.vn/privacy">Chính sách bảo mật</a>
        </p>
        <p>Toà 7F đường Hà Lê - Kim Hoàng - Vân Canh - Hoài Đức - Hà Nội</p>
      </div>
    </div>
  </body>
  </html>
`;
