import { api } from "~/trpc/server";
import UserRegister from "../_components/profile/createUser";
import UserLogin from "../_components/profile/userLogin";

export default function Siginup() {
  return (
    <>
      <h1>user login page</h1>
      <UserLogin />
    </>
  );
}
