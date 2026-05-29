import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const contents = [
    { key: "hero_pre_headline", value: "Design at the speed of thought" },
    { key: "hero_main_headline", value: "Build Faster" },
    { key: "hero_sub_headline", value: "Create fully functional, SEO-optimized websites in seconds with our advanced AI engine." },
  ];

  for (const item of contents) {
    await prisma.websiteContent.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: item,
    });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
