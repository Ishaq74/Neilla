import express from 'express';
import { auth } from '../lib/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();

// Get all clients (admin only)
router.get('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } });
    if (!clients || clients.length === 0) {
      return res.status(404).json({ error: 'No clients found' });
    }
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get client by ID (admin only)
router.get('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const client = await prisma.client.findUnique({ where: { id: req.params.id } });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new client
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }
    const newClient = await prisma.client.create({
      data: {
        firstName,
        lastName,
        email,
        phone: typeof phone === 'string' ? phone : undefined,
      },
    });
    res.status(201).json(newClient);
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update client (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (phone !== undefined) updateData.phone = typeof phone === 'string' ? phone : undefined;
    const updatedClient = await prisma.client.update({
      where: { id: req.params.id },
      data: updateData,
    });
    res.json(updatedClient);
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete client (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.client.delete({ where: { id: req.params.id } });
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as clientRoutes };