import Everify from "everify";
const everify = new Everify(process.env.EVERIFY_API_KEY);

export default {
  id: "codeLogin",
  name: "codeLogin",
  async authorize({ data, method, dialCode, verificationCode }) {
    // check if user actually exists
    const isUserResponse = await fetch(
      `${process.env.BASE_URL}/api/lib/checkUser?${new URLSearchParams({
        data,
        method,
        dialCode,
      })}`
    );
    const { exists, result } = await isUserResponse.json();

    if (!isUserResponse.ok) throw new Error(isUserResponse.error);
    if (!exists) throw new Error("No user found!");

    // check verification Code
    if (method === "email") {
      const response = await fetch(
        `${process.env.BASE_URL}/api/two_factor_auth/email/checkVerification`,
        {
          method: "POST",
          body: JSON.stringify({ email: data, verificationCode }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.error);
    } else {
      const { status } = await everify.checkVerification({
        phoneNumber: `${dialCode}${data}`,
        code: verificationCode,
      });

      if (status !== "SUCCESS") throw new Error("Verification Code invalid!");
    }

    return { data, method, dialCode };
  },
};
