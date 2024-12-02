import prisma from "@/utils/db";

export async function getServerSideProps() {
  const recipes = await prisma.recipe.findMany();
  return { props: { recipes } };
}

const RecipesPage = ({ recipes }: { recipes: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {recipes.map((recipe) => (
      <div key={recipe.id} className="border p-4">
        <h2>{recipe.title}</h2>
        <p>{recipe.ingredients}</p>
        <p>{recipe.steps}</p>
      </div>
    ))}
  </div>
);

export default RecipesPage;
