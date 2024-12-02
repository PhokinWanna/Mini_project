import prisma from "@/utils/db";

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { title, ingredients, steps, createdBy } = req.body;
    const recipe = await prisma.recipe.create({
      data: { title, ingredients, steps, createdBy },
    });
    res.status(201).json(recipe);
  } else if (req.method === 'GET') {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json(recipes);
  }
}
