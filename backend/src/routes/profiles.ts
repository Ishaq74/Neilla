import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all profiles
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get a single profile by id
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: req.params.id } });
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create a new profile (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId, firstName, lastName, email, avatarUrl, phone } = req.body;
    if (!userId || !firstName || !lastName || !email) return res.status(400).json({ error: 'Champs requis manquants' });
    const profile = await prisma.profile.create({ data: { userId, firstName, lastName, email, avatarUrl, phone } });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update a profile (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { firstName, lastName, email, avatarUrl, phone } = req.body;
    const profile = await prisma.profile.update({
      where: { id: req.params.id },
      data: { firstName, lastName, email, avatarUrl, phone },
    });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete a profile (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.profile.delete({ where: { id: req.params.id } });
    res.json({ message: 'Profil supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
