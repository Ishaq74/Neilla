import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../lib/auth';

const prisma = new PrismaClient();
const router = express.Router();

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get a single testimonial by id
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.findUnique({ where: { id: req.params.id } });
    if (!testimonial) return res.status(404).json({ error: 'Témoignage non trouvé' });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create a new testimonial (admin only)
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name, content, rating, isActive } = req.body;
    if (!name || !content) return res.status(400).json({ error: 'Champs requis manquants' });
    const testimonial = await prisma.testimonial.create({ data: { name, content, rating, isActive } });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update a testimonial (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name, content, rating, isActive } = req.body;
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: { name, content, rating, isActive },
    });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete a testimonial (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ message: 'Témoignage supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
