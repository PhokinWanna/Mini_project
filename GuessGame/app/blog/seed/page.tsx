import seed from "@/utils/seed-blog" 

export default async function Seed() {
 
    //  2: Seed user and post ===
    await seed();

    return (<>
        Seeding complete!
    </>)
}