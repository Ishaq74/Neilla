import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all service categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      include: { services: true },
      orderBy: { name: 'asc' },
    });
    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: 'No categories found' });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get a single service category by id
router.get('/:id', async (req, res) => {
  try {
    const category = await prisma.serviceCategory.findUnique({
      where: { id: req.params.id },
      include: { services: true },
    });
    if (!category) return res.status(404).json({ error: 'Catégorie non trouvée' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create a new service category (admin only)
import { auth } from '../lib/auth';
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Le nom est requis' });
    const category = await prisma.serviceCategory.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update a service category (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.serviceCategory.update({
      where: { id: req.params.id },
      data: { name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete a service category (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.serviceCategory.delete({ where: { id: req.params.id } });
    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
