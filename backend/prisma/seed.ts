import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // SiteContent (exemple)
    await prisma.siteContent.deleteMany({});
    await prisma.siteContent.createMany({
      data: [
        {
          page: 'home',
          section: 'services_intro',
          content: JSON.stringify({
            title: "L'Excellence au Service de",
            title_highlight: "Votre Beauté",
            subtitle: "Chaque prestation est une œuvre d'art personnalisée. J'utilise exclusivement des produits haut de gamme, hypoallergéniques et respectueux de votre peau pour un résultat impeccable et durable.",
            badge: "Mes Services"
          })
        },
        {
          page: 'home',
          section: 'hero',
          content: JSON.stringify({
            title: "Maquillage professionnel haut de gamme",
            subtitle: "Sublimez votre beauté naturelle avec une experte passionnée."
          })
        }
      ]
    });
  // Services
  await prisma.service.createMany({
    data: [
      {
        name: 'Maquillage Mariée',
        description: 'Un maquillage sublime et longue tenue pour le plus beau jour de votre vie. Essai inclus.',
        price: 250,
        duration: 120,
        isActive: true,
      },
      {
        name: 'Maquillage Événement',
        description: 'Sublimez-vous pour vos soirées, galas, et occasions spéciales avec un look sur-mesure.',
        price: 120,
        duration: 60,
        isActive: true,
      },
      {
        name: 'Consultation VIP',
        description: 'Analyse morphologique personnalisée et conseils beauté adaptés à votre style de vie.',
        price: 180,
        duration: 90,
        isActive: true,
      },
      {
        name: 'Shooting Photo',
        description: 'Maquillage professionnel optimisé pour la photographie et la vidéo haute définition.',
        price: 150,
        duration: 75,
        isActive: true,
      },
    ]
  });

  // Formations
  await prisma.formation.createMany({
    data: [
      {
        title: 'Initiation au Maquillage',
        description: 'Apprenez les bases essentielles du maquillage pour sublimer votre beauté au quotidien. Techniques de teint, regard et lèvres.',
        duration: 4,
        level: 'Débutant',
        price: 290,
        maxStudents: 4,
        isActive: true,
      },
      {
        title: 'Perfectionnement Avancé',
        description: 'Maîtrisez les techniques avancées : contouring, smoky eye, et looks sophistiqués pour toutes les occasions.',
        duration: 6,
        level: 'Intermédiaire',
        price: 450,
        maxStudents: 3,
        isActive: true,
      },
      {
        title: 'Formation Pro Complète',
        description: 'Formation intensive pour devenir maquilleuse professionnelle. Certification incluse avec portfolio personnel.',
        duration: 35,
        level: 'Avancé',
        price: 2500,
        maxStudents: 2,
        isActive: true,
      },
    ]
  });

  // Clients (exemple)
  await prisma.client.deleteMany({}); // Nettoyage pour éviter les doublons
  await prisma.client.createMany({
    data: [
      {
        firstName: 'Marie',
        lastName: 'Dupont',
        email: 'marie.dupont@email.com',
        phone: '06 12 34 56 78',
      },
      {
        firstName: 'Sarah',
        lastName: 'Martin',
        email: 'sarah.martin@email.com',
        phone: '06 98 76 54 32',
      },
    ]
  });

  // Utilisateurs (admin par défaut)
  await prisma.user.deleteMany({});
  await prisma.user.createMany({
    data: [
      {
        firstName: 'Admin',
        lastName: 'Principal',
        email: 'admin@beauty.com',
        password: '$2a$10$hash', // à remplacer par un vrai hash bcrypt
        role: 'ADMIN',
      },
    ],
  });

  // Ajoute ici d'autres seeds (invoices, reservations, siteContent, etc.) si besoin
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
