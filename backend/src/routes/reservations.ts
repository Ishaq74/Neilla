import express from 'express';
import { auth } from '../lib/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();

// Get all reservations (admin only)
router.get('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany({ orderBy: { createdAt: 'desc' } });
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ error: 'No reservations found' });
    }
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get reservation by ID (admin only)
router.get('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const reservation = await prisma.reservation.findUnique({ where: { id: req.params.id } });
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new reservation (admin only)
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { date, time, clientId, serviceId, formationId, notes } = req.body;
    if (!date || !time || !clientId || (!serviceId && !formationId)) {
      return res.status(400).json({
        error: 'Date, time, clientId, and either serviceId or formationId are required'
      });
    }
    const newReservation = await prisma.reservation.create({
      data: {
        date: new Date(date),
        time,
        status: 'PENDING',
        clientId,
        serviceId: serviceId || undefined,
        formationId: formationId || undefined,
        notes: notes || undefined,
      },
    });
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update reservation (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { date, time, status, notes, clientId, serviceId, formationId } = req.body;
    const updateData: any = {};
    if (date) updateData.date = new Date(date);
    if (time) updateData.time = time;
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (clientId) updateData.clientId = clientId;
    if (serviceId !== undefined) updateData.serviceId = serviceId;
    if (formationId !== undefined) updateData.formationId = formationId;
    const updatedReservation = await prisma.reservation.update({
      where: { id: req.params.id },
      data: updateData,
    });
    res.json(updatedReservation);
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete reservation (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.reservation.delete({ where: { id: req.params.id } });
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update reservation status (admin only)
router.patch('/:id/status', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'].includes(status)) {
      return res.status(400).json({ error: 'Valid status is required' });
    }
    const updatedReservation = await prisma.reservation.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(updatedReservation);
  } catch (error) {
    console.error('Error updating reservation status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as reservationRoutes };