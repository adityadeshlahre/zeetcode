import { NextRequest } from "next/server";
import { CreateChallenge } from "../../_components/challenges/createChallenges";

export default function challenges() {
  return (
    <div>
      challenges loading
      <CreateChallenge />
    </div>
  );
}
