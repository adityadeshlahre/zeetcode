import { NextRequest } from "next/server";
import { CreateChallenge } from "../../_components/challenges/create-challenges";

export default function challenges(request: NextRequest) {
  return (
    <div>
      challenges loading
      <CreateChallenge />
    </div>
  );
}
