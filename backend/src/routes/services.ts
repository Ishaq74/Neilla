import express from 'express';
import { auth } from '../lib/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { createdAt: 'desc' } });
    if (!services || services.length === 0) {
      return res.status(404).json({ error: 'No services found' });
    }
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const service = await prisma.service.findUnique({ where: { id: req.params.id } });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new service (admin only)
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    if (!name || !description || !price || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newService = await prisma.service.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        duration: parseInt(duration),
        isActive: true,
      },
    });
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update service (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { name, description, price, duration, isActive } = req.body;
    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = parseFloat(price);
    if (duration) updateData.duration = parseInt(duration);
    if (isActive !== undefined) updateData.isActive = isActive;
    const updatedService = await prisma.service.update({
      where: { id: req.params.id },
      data: updateData,
    });
    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete service (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as serviceRoutes };