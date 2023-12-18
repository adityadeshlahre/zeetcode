import { api } from "~/trpc/server";
import UserRegister from "../_components/profile/create-user";

export default function Siginup() {
  return (
    <>
      <h1>user registration page</h1>
      <UserRegister />
    </>
  );
}
