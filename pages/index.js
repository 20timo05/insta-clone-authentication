import Head from "next/head";
import { signOut } from "next-auth/react";

export default function Home() {
  const logOutHandler = async () => {
    await signOut();
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <button onClick={logOutHandler}>Log Out</button>
    </>
  );
}
