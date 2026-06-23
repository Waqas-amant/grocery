const VerificationEmail = (username, otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eeeeee;
        }
        .header h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px 0;
            line-height: 1.6;
        }
        .content p {
            margin: 0 0 15px;
        }
        .otp-box {
            text-align: center;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #2c3e50;
            background: #f8f9fa;
            padding: 15px 30px;
            border-radius: 4px;
            border: 1px dashed #cbd5e0;
            display: inline-block;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            border-top: 1px solid #eeeeee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Hii ${username} Verify Your Email Address</h1>
            
        </div>
        <div class="content">
            <p>Hello <strong>${username}</strong>,</p>
            <p>Thank you for registering with our Borobazar! Please use the following One-Time Password (OTP) to verify your email address and complete your setup.</p>
            
            <div class="otp-box">
                <span class="otp-code">${otp}</span>
            </div>
            
            <p>This code is valid for 10 minutes. If you did not request this verification, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Your Grocery Borobazar. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};

export default VerificationEmail;
