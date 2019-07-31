const changeEmailLetter = (link) => `
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:600px; margin-top:30px; margin-bottom: 30px; width:100%; padding:0;" class="mcnCodeBlock">
<tbody>
    <tr>
        <td style="width: 100%; display: block; text-align: center;">
          <img style="width: 40%;" src="https://firebasestorage.googleapis.com/v0/b/eatngo-fbbeb.appspot.com/o/logo_cropped.png?alt=media&token=53b331e4-1d54-47bc-85d3-91f3641ad3a5">
        </td>
    </tr>
</tbody>
<tbody class="mcnTextBlockOuter">
<tr>
   <td valign="top" class="mcnTextBlockInner">
   <table align="justify" class="mcnTextContent" style="min-width:600px; margin-top:-30px; margin-bottom: 30px; width:100%; padding:0;">
<tbody>
    <tr>
      <td style="font-size: 14px; color: #000; text-align: center; line-height: 42px;">Please click to this link to change your password.</td>
    </tr>
    <tr>
      <td style="font-size: 16px; color: #000; text-align: center; line-height: normal;">
        <a href="${link}" style="margin-top: 20px; display: block; text-decoration: none; background: #c9a275; width: 40%; margin: 30px auto 0; color: #000; padding: 15px; border-radius: 30px;">
           Reset my Password!
        </a>
      </td>
    </tr>
    <tr>
      <td style="height: 40px"></td>
    </tr>
    <tr>
      <td style="font-size: 12px; color: #000; text-align: center; line-height: 18px;">You are receiving this because of you (or someone else) have requested the reset of the password for your account.</td>
    </tr>
    <tr>
      <td style="font-size: 12px; color: #000; text-align: center; line-height: 18px;">If you did not request this, please ignore this email and your password will remain unchanged.</td>
    </tr>
  </tbody>
</table>`

module.exports= changeEmailLetter;