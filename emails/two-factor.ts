import { twoFactorTokenExpiryString } from "@/tokens.config"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorTokenEmail = async (
  name: string | null,
  email: string,
  token: string,
) => {
  if (!name) {
    name = "there"
  }

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style='background-color:rgb(244,247,249);font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-top:40px;padding-bottom:40px'>
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      Your 2FA verification code

    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="background-color:rgb(255,255,255);border-radius:8px;padding:40px;max-width:600px;margin-left:auto;margin-right:auto;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 2px 0 rgb(0,0,0,0.05)">
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align:center;margin-bottom:20px">
              <tbody>
                <tr>
                  <td>
                    <h1
                      style="font-size:28px;font-weight:700;color:rgb(44,62,80);margin-bottom:20px">
                      Your 2FA Code
                    </h1>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:16px;margin-bottom:15px;line-height:24px;margin-top:16px">
                      Hello ${name},
                    </p>
                    <p
                      style="font-size:16px;margin-bottom:15px;line-height:24px;margin-top:16px">
                      You&#x27;ve requested a two-factor authentication code to
                      access your account. Please use the following code:
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align:center;margin-top:30px;margin-bottom:30px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:36px;font-weight:700;color:rgb(231,76,60);letter-spacing:5px;background-color:rgb(249,249,249);padding-top:10px;padding-bottom:10px;border-radius:4px;line-height:24px;margin-bottom:16px;margin-top:16px">
                      ${token}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr
              style="border-width:1px;border-color:rgb(224,224,224);margin-top:30px;margin-bottom:30px;width:100%;border:none;border-top:1px solid #eaeaea" />
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:16px;margin-bottom:15px;line-height:24px;margin-top:16px">
                      This code will expire in ${twoFactorTokenExpiryString}.
                    </p>
                    <p
                      style="font-size:16px;margin-bottom:15px;line-height:24px;margin-top:16px">
                      If you didn&#x27;t request this code, please ignore this
                      email and consider changing your password.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top:30px;text-align:center;font-size:14px;color:rgb(127,140,141)">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="margin-bottom:5px;font-size:14px;line-height:24px;margin-top:16px">
                      If you&#x27;re having trouble, please contact our support
                      team.
                    </p>
                    <p
                      style="margin:0px;font-size:14px;line-height:24px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px">
                      123 Company St., Suite 100, City, State 12345
                    </p>
                    <p
                      style="margin:0px;font-size:14px;line-height:24px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px">
                      ©
                      <!-- -->2025<!-- -->
                      Octoware - All rights reserved.
                    </p>
                    <p
                      style="margin-top:10px;font-size:14px;line-height:24px;margin-bottom:16px">
                      <a
                        href="#"
                        style="color:rgb(52,152,219);text-decoration-line:underline"
                        >Unsubscribe</a
                      >
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>
`,
  })
}
