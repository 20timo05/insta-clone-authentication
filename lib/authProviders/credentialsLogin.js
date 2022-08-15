import { verifyPassword } from "../auth";

export default {
  id: "credentialsLogin",
  name: "credentialsLogin",
  async authorize({ data, method, password, dialCode }) {
    // check if user actually exists
    const isUserResponse = await fetch(
      `${process.env.BASE_URL}/api/lib/checkUser?${new URLSearchParams({
        data,
        method,
        dialCode
      })}`
    );
    const { exists, result } = await isUserResponse.json();

    if (!isUserResponse.ok) throw new Error(isUserResponse.error);
    if (!exists) throw new Error("No user found!");

    // verify Password
    const isValid = await verifyPassword(password, result[0].password);

    if (!isValid) throw new Error("Invalid password!");

    return { data, method, dialCode };
  },
};
