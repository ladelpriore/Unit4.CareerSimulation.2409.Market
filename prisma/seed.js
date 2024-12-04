

const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numProducts = 20) => {
  const products = Array.from({ length: numProducts }, (_, i) => ({
    title: `Product ${i + 1}`,
    description: `Product description ${i + 1}`,
    price: (i + 1) * 10,
  }));

  await prisma.product.createMany({ data: products });
};
  

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });