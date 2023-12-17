import { NextRequest } from "next/server";
import { useRouter } from "next/router";
import { api } from "~/trpc/server";

export const UserPage = ({ req }: { req: NextRequest }) => {
  const { query } = useRouter();
  const id: string = query.id as string;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default UserPage;
