import { signIn, signOut, useSession } from "next-auth/react";
import { FC } from "react";

const VALID_USERS = ["thurber.carlos@gmail.com", "abarsallo26@gmail.com", "abarsallo.dev@gmail.com"];

export const AuthWrapper: FC = ({ children }) => {
  const { data: session } = useSession();

  const validSession = VALID_USERS.includes(session?.user?.email);

  return (
    <>
      <nav className="flex justify-start">
        {!session && <button onClick={() => signIn()}>Sign In</button>}
        {session && <button onClick={() => signOut()}>Sign Out</button>}
      </nav>
      {validSession && children}
    </>
  );
};

export default AuthWrapper;
