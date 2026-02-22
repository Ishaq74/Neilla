import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all team members
router.get('/', async (req, res) => {
  try {
    const members = await prisma.teamMember.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get a single team member by id
router.get('/:id', async (req, res) => {
  try {
    const member = await prisma.teamMember.findUnique({ where: { id: req.params.id } });
    if (!member) return res.status(404).json({ error: 'Membre non trouvé' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create a new team member (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId, displayName, role, bio, avatarUrl, isActive } = req.body;
    if (!userId || !displayName || !role) return res.status(400).json({ error: 'Champs requis manquants' });
    const member = await prisma.teamMember.create({ data: { userId, displayName, role, bio, avatarUrl, isActive } });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update a team member (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { displayName, role, bio, avatarUrl, isActive } = req.body;
    const member = await prisma.teamMember.update({
      where: { id: req.params.id },
      data: { displayName, role, bio, avatarUrl, isActive },
    });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete a team member (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.teamMember.delete({ where: { id: req.params.id } });
    res.json({ message: 'Membre supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
