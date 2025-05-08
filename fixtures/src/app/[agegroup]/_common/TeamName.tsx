import { Team } from "@/domain/types/Team";

export function TeamName(team: Team) {
  if (!team.isAdultTeam) {
    return <p>{team.name}</p>;
  } else {
    return (
      <div className="flex space-x-2">
        <p>{team.name}</p>
        {/* The following comment is required to enforce the tailwind JIT compiler to keep these colours */}
        {/* bg-pink-600 bg-orange-600 bg-purple-600 bg-yellow-300 bg-blue-600 bg-red-600 bg-white bg-black */}
        <div className={"size-5 rounded-full " + team.getColour()} />
      </div>
    );
  }
}
