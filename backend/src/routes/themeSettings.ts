import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../lib/auth';

const prisma = new PrismaClient();
const router = express.Router();

// Get all theme settings
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.themeSetting.findMany({ orderBy: { name: 'asc' } });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get a single theme setting by id
router.get('/:id', async (req, res) => {
  try {
    const setting = await prisma.themeSetting.findUnique({ where: { id: req.params.id } });
    if (!setting) return res.status(404).json({ error: 'Thème non trouvé' });
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create a new theme setting (admin only)
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name, colors, fonts, isActive } = req.body;
    if (!name || !colors || !fonts) return res.status(400).json({ error: 'Champs requis manquants' });
    const setting = await prisma.themeSetting.create({ data: { name, colors, fonts, isActive } });
    res.status(201).json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update a theme setting (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name, colors, fonts, isActive } = req.body;
    const setting = await prisma.themeSetting.update({
      where: { id: req.params.id },
      data: { name, colors, fonts, isActive },
    });
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete a theme setting (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.themeSetting.delete({ where: { id: req.params.id } });
    res.json({ message: 'Thème supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
