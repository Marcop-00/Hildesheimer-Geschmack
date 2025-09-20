const { PrismaClient, CuisineType, Role } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create multiple owners
  const owners = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        role: Role.OWNER,
        image: 'http://localhost:3000/assets/users/user_1.jpg',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password123', 10),
        role: Role.OWNER,
        image: 'http://localhost:3000/assets/users/user_2.jpg',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Robert Brown',
        email: 'robert.brown@example.com',
        password: await bcrypt.hash('password123', 10),
        role: Role.OWNER,
        image: 'http://localhost:3000/assets/users/user_3.jpg',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        password: await bcrypt.hash('password123', 10),
        role: Role.OWNER,
        image: 'http://localhost:3000/assets/users/user_4.jpg',
      },
    }),
  ]);

  // Create multiple customers
  const customers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice Smith',
        email: 'alice.smith@example.com',
        password: await bcrypt.hash('password123', 10),
        role: Role.CUSTOMER,
        image: 'http://localhost:3000/assets/users/user_5.jpeg',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Charlie Davis',
        email: 'charlie.davis@example.com',
        password: await bcrypt.hash('password123', 10),
        role: Role.CUSTOMER,
        image: 'http://localhost:3000/assets/users/user_6.jpeg',
      },
    }),
  ]);

  // Create admin user
  const adminExists = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
  if (!adminExists) {
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpassword', 10),
        role: Role.ADMIN,
        image: 'http://localhost:3000/assets/users/admin.jpeg',
      },
    });
  }

  // Create multiple restaurants
  const restaurants = await Promise.all([
    prisma.restaurant.create({
      data: {
        name: 'Pasta Paradise',
        description: 'Authentic Italian pasta with fresh ingredients.',
        image: 'http://localhost:3000/assets/restaurants/images/pasta-restaurant_1.jpeg',
        menu: 'http://localhost:3000/assets/restaurants/menus/pasta-menu.pdf',
        address: '456 Pasta Ln, Italy Town',
        workingHour: '11:00 AM - 11:00 PM',
        website: 'https://pastaparadise.com',
        phone: '+1234567891',
        cuisineType: CuisineType.ITALIAN,
        glutenFree: false,
        lactoseFree: true,
        soyFree: true,
        ownerId: owners[1].id,
      },
    }),
    prisma.restaurant.create({
      data: {
        name: 'Sushi Central',
        description: 'Fresh sushi and sashimi with traditional flavors.',
        image: 'http://localhost:3000/assets/restaurants/images/sushi-restaurant_1.jpg',
        menu: 'http://localhost:3000/assets/restaurants/menus/sushi-menu.pdf',
        address: '789 Ocean Dr, Tokyo Town',
        workingHour: '12:00 PM - 10:00 PM',
        website: 'https://sushicentral.com',
        phone: '+1234567892',
        cuisineType: CuisineType.SUSHI,
        glutenFree: true,
        lactoseFree: true,
        soyFree: false,
        ownerId: owners[2].id,
      },
    }),
    prisma.restaurant.create({
      data: {
        name: 'BBQ Heaven',
        description: 'The best barbecue joint in town!',
        image: 'http://localhost:3000/assets/restaurants/images/bbq-restaurant_1.jpg',
        menu: 'http://localhost:3000/assets/restaurants/menus/bbq-menu.pdf',
        address: '101 Smokehouse Rd, Texas',
        workingHour: '10:00 AM - 9:00 PM',
        website: 'https://bbqheaven.com',
        phone: '+1234567893',
        cuisineType: CuisineType.BARBECUE,
        glutenFree: false,
        lactoseFree: false,
        soyFree: false,
        ownerId: owners[3].id,
      },
    }),
    prisma.restaurant.create({
      data: {
        name: 'Vegan Delight',
        description: 'A paradise for plant-based food lovers.',
        image: 'http://localhost:3000/assets/restaurants/images/vegan-restaurant_1.png',
        menu: 'http://localhost:3000/assets/restaurants/menus/vegan-menu.pdf',
        address: '555 Greenway, Veganville',
        workingHour: '9:00 AM - 8:00 PM',
        website: 'https://vegandelight.com',
        phone: '+1234567894',
        cuisineType: CuisineType.VEGETARIAN,
        glutenFree: true,
        lactoseFree: true,
        soyFree: true,
        ownerId: owners[0].id,
      },
    }),
  ]);

  // Add ratings
  await Promise.all([
    prisma.rating.create({ data: { value: 5, restaurantId: restaurants[0].id, userId: customers[0].id } }),
    prisma.rating.create({ data: { value: 4, restaurantId: restaurants[1].id, userId: customers[1].id } }),
    prisma.rating.create({ data: { value: 3, restaurantId: restaurants[2].id, userId: customers[0].id } }),
    prisma.rating.create({ data: { value: 5, restaurantId: restaurants[3].id, userId: customers[1].id } }),
  ]);

   // Add comments
   await Promise.all([
    prisma.comment.create({ data: { content: 'Amazing food and great service!', restaurantId: restaurants[0].id, userId: customers[0].id } }),
    prisma.comment.create({ data: { content: 'Loved the sushi, very fresh!', restaurantId: restaurants[1].id, userId: customers[1].id } }),
    prisma.comment.create({ data: { content: 'BBQ was okay, but a bit too smoky for my taste.', restaurantId: restaurants[2].id, userId: customers[0].id } }),
    prisma.comment.create({ data: { content: 'Best vegan dishes I have ever had!', restaurantId: restaurants[3].id, userId: customers[1].id } }),
  ]);

  await Promise.all([
    prisma.feedback.create({data: { message: 'A very good app!' }})
  ]);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error while seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
