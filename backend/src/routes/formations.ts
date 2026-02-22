import express from 'express';
import { auth } from '../lib/auth';
import { prisma } from '../lib/prisma';
const router = express.Router();

// Get all formations
router.get('/', async (req, res) => {
  try {
    const formations = await prisma.formation.findMany({ orderBy: { createdAt: 'desc' } });
    if (!formations || formations.length === 0) {
      return res.status(404).json({ error: 'No formations found' });
    }
    res.status(200).json(formations);
  } catch (error) {
    console.error('Error fetching formations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get formation by ID
router.get('/:id', async (req, res) => {
  try {
    const formation = await prisma.formation.findUnique({ where: { id: req.params.id } });
    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }
    res.status(200).json(formation);
  } catch (error) {
    console.error('Error fetching formation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new formation (admin only)
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { title, description, duration, level, price, maxStudents } = req.body;
    if (!title || !description || !duration || !level || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newFormation = await prisma.formation.create({
      data: {
        title,
        description,
        duration: parseInt(duration),
        level,
        price: parseFloat(price),
        maxStudents: maxStudents ? parseInt(maxStudents) : 10,
        isActive: true,
      },
    });
    res.status(201).json(newFormation);
  } catch (error) {
    console.error('Error creating formation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update formation (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { title, description, duration, level, price, maxStudents, isActive } = req.body;
    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (duration) updateData.duration = parseInt(duration);
    if (level) updateData.level = level;
    if (price) updateData.price = parseFloat(price);
    if (maxStudents) updateData.maxStudents = parseInt(maxStudents);
    if (isActive !== undefined) updateData.isActive = isActive;
    const updatedFormation = await prisma.formation.update({
      where: { id: req.params.id },
      data: updateData,
    });
    res.json(updatedFormation);
  } catch (error) {
    console.error('Error updating formation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete formation (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.formation.delete({ where: { id: req.params.id } });
    res.json({ message: 'Formation deleted successfully' });
  } catch (error) {
    console.error('Error deleting formation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as formationRoutes };