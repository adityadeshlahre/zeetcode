import { api } from "~/trpc/server";
import AdminRegister from "../../_components/profile/create-admin";

export default function Siginup() {
  return (
    <>
      <h1>Admin registration page</h1>
      <AdminRegister />
    </>
  );
}
