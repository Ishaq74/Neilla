module.exports = {
  migrations: {
    seed: 'tsx ./backend/prisma/seed.ts',
  },
  datasource: {
    url: 'file:./backend/prisma/dev.db',
  },
};
