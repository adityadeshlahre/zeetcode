import { NextRequest } from "next/server";
import AdminProfile from "~/app/_components/profile/adminProfile";

export default function profile() {
  return (
    <div>
      profile loading
      <AdminProfile />
    </div>
  );
}
