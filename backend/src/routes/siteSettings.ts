import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../lib/auth';

const prisma = new PrismaClient();
const router = express.Router();

// Get all site settings
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany({ orderBy: { category: 'asc' } });
    if (!settings || settings.length === 0) {
      return res.status(404).json({ error: 'No settings found' });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get a single site setting by id
router.get('/:id', async (req, res) => {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { id: req.params.id } });
    if (!setting) return res.status(404).json({ error: 'Paramètre non trouvé' });
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create a new site setting (admin only)
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { key, value, category } = req.body;
    if (!key || !category) return res.status(400).json({ error: 'Champs requis manquants' });
    const setting = await prisma.siteSetting.create({ data: { key, value, category } });
    res.status(201).json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update a site setting (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { key, value, category } = req.body;
    const setting = await prisma.siteSetting.update({
      where: { id: req.params.id },
      data: { key, value, category },
    });
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete a site setting (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.siteSetting.delete({ where: { id: req.params.id } });
    res.json({ message: 'Paramètre supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
