import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all site content
router.get('/', async (req, res) => {
  try {
    const content = await prisma.siteContent.findMany({ orderBy: { page: 'asc', section: 'asc' } });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get content by id
router.get('/:id', async (req, res) => {
  try {
    const content = await prisma.siteContent.findUnique({ where: { id: req.params.id } });
    if (!content) return res.status(404).json({ error: 'Contenu non trouvé' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create new content (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page, section, content } = req.body;
    if (!page || !section || !content) return res.status(400).json({ error: 'Champs requis manquants' });
    const newContent = await prisma.siteContent.create({ data: { page, section, content } });
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update content (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page, section, content } = req.body;
    const updated = await prisma.siteContent.update({
      where: { id: req.params.id },
      data: { page, section, content },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete content (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.siteContent.delete({ where: { id: req.params.id } });
    res.json({ message: 'Contenu supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
