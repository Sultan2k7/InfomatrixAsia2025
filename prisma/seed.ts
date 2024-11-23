import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.request.deleteMany({});
  await prisma.vehicle.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Deleted existing data');

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await hash('password123', 10),
        role: Role.ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Manager User',
        email: 'manager@example.com',
        password: await hash('password123', 10),
        role: Role.MANAGER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Driver User',
        email: 'driver@example.com',
        password: await hash('password123', 10),
        role: Role.DRIVER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Regular User',
        email: 'user@example.com',
        password: await hash('password123', 10),
        role: Role.USER,
      },
    }),
  ]);

  console.log('Created users');

  // Create requests
  const requestTypes = ['Maintenance', 'Fuel', 'Route Change', 'Emergency'];
  const requestUrgencies = ['Low', 'Medium', 'High', 'Critical'];
  const requestStatuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

  for (let i = 0; i < 20; i++) {
    await prisma.request.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        title: `Request ${i + 1}`,
        description: `This is a sample request description for request ${i + 1}`,
        status: requestStatuses[Math.floor(Math.random() * requestStatuses.length)],
        type: requestTypes[Math.floor(Math.random() * requestTypes.length)],
        urgency: requestUrgencies[Math.floor(Math.random() * requestUrgencies.length)],
        media: {}, // Add a default value for the media field
      },
    });
  }

  console.log('Created requests');

  // Create vehicles
  const vehicleTypes = ['Truck', 'Van', 'Car', 'Bus'];
  const vehicleStatuses = ['active', 'maintenance', 'inactive'];

  for (let i = 0; i < 10; i++) {
    const startLat = 43 + Math.random() * 10;
    const startLon = 76 + Math.random() * 10;
    const endLat = 43 + Math.random() * 10;
    const endLon = 76 + Math.random() * 10;

    await prisma.vehicle.create({
      data: {
        driverId: users.find((u) => u.role === Role.DRIVER)!.id,
        vehicleNumber: `KZ ${Math.floor(Math.random() * 1000)}`,
        currentMission: Math.random() > 0.5 ? `Mission ${i + 1}` : null,
        location: `Location ${i + 1}`,
        speed: Math.floor(Math.random() * 120),
        malfunctions: Math.floor(Math.random() * 5),
        vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
        status: vehicleStatuses[Math.floor(Math.random() * vehicleStatuses.length)],
        latitude: startLat + (Math.random() - 0.5) * 2,
        longitude: startLon + (Math.random() - 0.5) * 2,
        startLatitude: startLat,
        startLongitude: startLon,
        endLatitude: endLat,
        endLongitude: endLon,
        route: JSON.stringify(
          Array.from({ length: 5 }, () => [
            startLat + (Math.random() - 0.5) * 2,
            startLon + (Math.random() - 0.5) * 2,
          ])
        ),
        routeIndex: Math.floor(Math.random() * 5),
        bearing: Math.random() * 360,
        weather: JSON.stringify({
          temperature: Math.random() * 30,
          humidity: Math.random() * 100,
          precipitation: Math.random() * 100,
        }),
        engineLoad: Math.floor(Math.random() * 100),
        arrivalTime: `${Math.floor(Math.random() * 24)
          .toString()
          .padStart(2, '0')}:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, '0')}`,
      },
    });
  }

  console.log('Created vehicles');
  console.log('Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });