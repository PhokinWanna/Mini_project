import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const scores = await prisma.score.findMany({
    include: {
      user: true,
    },
    orderBy: {
      value: "desc",
    },
    take: 10,
  });

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-center text-2xl font-bold">Leaderboard</h2>
      <table className="table-auto w-full mt-5 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Rank</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border border-gray-200 px-4 py-2 text-center">{index + 1}</td>
              <td className="border border-gray-200 px-4 py-2">{score.user.name}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">{score.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
