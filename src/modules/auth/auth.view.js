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
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #f4f6f9;
        margin: 0;
        padding: 20px;
        color: #333;
      }
      .container {
        max-width: 620px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      .header {
        background: linear-gradient(135deg, #2563eb, #1e40af);
        color: #ffffff;
        text-align: center;
        padding: 40px 20px;
      }
      .header img {
        max-width: 140px;
        margin-bottom: 15px;
      }
      .header h1 {
        font-size: 26px;
        font-weight: 600;
        margin: 0;
      }
      .content {
        padding: 36px 32px;
      }
      .content h2 {
        font-size: 22px;
        margin: 0 0 12px;
        color: #111827;
      }
      .content p {
        font-size: 15px;
        line-height: 1.7;
        margin: 0 0 16px;
        color: #374151;
      }
      .button {
        display: inline-block;
        padding: 14px 28px;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 10px;
        font-weight: 600;
        font-size: 16px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
      }
      .link-box {
        background: #f9fafb;
        padding: 12px 14px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        word-break: break-all;
        font-size: 14px;
      }
      .footer {
        background: #f9fafb;
        padding: 24px;
        text-align: center;
        font-size: 14px;
        color: #6b7280;
      }
      .footer p {
        margin: 6px 0;
      }
      .footer a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 500;
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
        <p>Bạn vừa gửi yêu cầu đặt lại mật khẩu cho tài khoản của mình. Vui lòng nhấn vào nút bên dưới để tiến hành:</p>
        <p style="text-align: center; margin: 28px 0;">
          <a href="${resetLink}" class="button">Đặt lại mật khẩu</a>
        </p>
        <p>Link này sẽ hết hạn sau <strong>${expiresIn}</strong>. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.</p>
        <p>Nếu nút không hoạt động, hãy sao chép và dán đường dẫn sau vào trình duyệt:</p>
        <div class="link-box">
          <a href="${resetLink}">${resetLink}</a>
        </div>
        <p style="margin-top: 24px;">Trân trọng,<br/>Đội ngũ CodeFarm</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} CodeFarm. All rights reserved.</p>
        <p>
          <a href="https://codefarm.edu.vn">Trang chủ</a> •
          <a href="mailto:support@codefarm.edu.vn">Liên hệ</a> •
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
