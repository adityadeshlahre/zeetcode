import { api } from "~/trpc/server";
import AdminRegister from "../../_components/profile/create-admin";
import AdminLogin from "~/app/_components/profile/admin-login";

export default function Siginup() {
  return (
    <>
      <h1>admin login page</h1>
      <AdminLogin />
    </>
  );
}
