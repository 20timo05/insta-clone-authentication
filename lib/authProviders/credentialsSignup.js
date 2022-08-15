import Everify from "everify";
const everify = new Everify(process.env.EVERIFY_API_KEY);

async function checkAlreadyExists(data, method, dialCode) {
  // check if user already exists
  const alreadyExistsResponse = await fetch(
    `${process.env.BASE_URL}/api/lib/checkUser?${new URLSearchParams({
      data,
      method,
      dialCode
    })}`
  );
  const { exists } = await alreadyExistsResponse.json();
  if (!alreadyExistsResponse.ok) throw new Error(alreadyExistsResponse.error);

  return exists;
}

export default {
  id: "credentialsSignup",
  name: "credentialsSignup",
  async authorize(userObj) {
    const { username, email, phoneNumber, dialCode, verificationCode } =
      userObj;

    // check if user already exists
    const usernameAlreadyExists = await checkAlreadyExists(
      username,
      "username"
    );
    if (usernameAlreadyExists) throw new Error("Username is already taken");

    const emailAlreadyExists = await checkAlreadyExists(email, "email");
    if (emailAlreadyExists) throw new Error("Email is already taken!");

    const phoneNumberAlreadyExists = await checkAlreadyExists(
      phoneNumber,
      "phoneNumber",
      dialCode
    );
    if (phoneNumberAlreadyExists)
      throw new Error("PhoneNumber is already taken!");

    // -----------------------------------------------------------------------------------
    // check verification Code
    if (email && email !== "undefined") {
      const response = await fetch(
        `${process.env.BASE_URL}/api/two_factor_auth/email/checkVerification`,
        {
          method: "POST",
          body: JSON.stringify({ email, verificationCode }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);
    } else {
      console.log("check verification Code")
      const { status } = await everify.checkVerification({
        phoneNumber: `${dialCode}${phoneNumber}`,
        code: verificationCode,
      });

      if (status !== "SUCCESS") throw new Error("Verification Code invalid!");
    }

    // -----------------------------------------------------------------------------------
    // create the User
    const signupResponse = await fetch(
      `${process.env.BASE_URL}/api/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const signupData = await signupResponse.json();

    if (!signupResponse.ok) {
      console.log(signupData)
      throw new Error(signupResponse.error || "Something went wrong");
    }

    return { data: username, method: "username" };
  },
};
