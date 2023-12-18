import { api } from "~/trpc/server";
import UserRegister from "../_components/profile/create-user";
import UserLogin from "../_components/profile/user-login";

export default function Siginup() {
  return (
    <>
      <h1>user login page</h1>
      <UserLogin />
    </>
  );
}
