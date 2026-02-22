import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../lib/auth';

const prisma = new PrismaClient();
const router = express.Router();

// Get all media
router.get('/', async (req, res) => {
  try {
    const media = await prisma.mediaLibrary.findMany({ orderBy: { createdAt: 'desc' } });
    if (!media || media.length === 0) {
      return res.status(404).json({ error: 'No media found' });
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get a single media by id
router.get('/:id', async (req, res) => {
  try {
    const media = await prisma.mediaLibrary.findUnique({ where: { id: req.params.id } });
    if (!media) return res.status(404).json({ error: 'Fichier non trouvé' });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create a new media (admin only)
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name, fileUrl, fileType, fileSize, altText, category } = req.body;
    if (!name || !fileUrl || !fileType) return res.status(400).json({ error: 'Champs requis manquants' });
    const media = await prisma.mediaLibrary.create({ data: { name, fileUrl, fileType, fileSize, altText, category } });
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update a media (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name, fileUrl, fileType, fileSize, altText, category } = req.body;
    const media = await prisma.mediaLibrary.update({
      where: { id: req.params.id },
      data: { name, fileUrl, fileType, fileSize, altText, category },
    });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete a media (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.mediaLibrary.delete({ where: { id: req.params.id } });
    res.json({ message: 'Fichier supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
