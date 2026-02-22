import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all user roles assignments
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const roles = await prisma.userRoleAssignment.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Assign a role to a user
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !role) return res.status(400).json({ error: 'Champs requis manquants' });
    const assignment = await prisma.userRoleAssignment.create({ data: { userId, role } });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update a user role assignment
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const assignment = await prisma.userRoleAssignment.update({ where: { id: req.params.id }, data: { role } });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete a user role assignment
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.userRoleAssignment.delete({ where: { id: req.params.id } });
    res.json({ message: 'Rôle supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
