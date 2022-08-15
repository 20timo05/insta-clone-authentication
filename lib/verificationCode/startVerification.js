export default async function startVerification(props) {
  const { username, email, phoneNumber, dialCode} = props;
  const isEmail = !!email && email !== "undefined";

  if (isEmail) {
    // email
    const startVerificationResponse = await fetch(
      "/api/two_factor_auth/email/start-verification",
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!startVerificationResponse.ok)
      return console.log(startVerificationResponse);
  } else {
    // phone number
    const startVerificationResponse = await fetch(
      "/api/two_factor_auth/phoneNumber/start-verification",
      {
        method: "POST",
        body: JSON.stringify({
          phoneNumber: `${dialCode}${phoneNumber}`,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    
    if (!startVerificationResponse.ok)
      return console.log(startVerificationResponse);
  }
};