import { api } from "~/trpc/server";

export default function Siginup() {
  const userSignup = api.user.createUser.mutate();
}
