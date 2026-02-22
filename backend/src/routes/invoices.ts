import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../lib/auth';

const prisma = new PrismaClient();
const router = express.Router();

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({ orderBy: { createdAt: 'desc' }, include: { items: true } });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get invoice by id
router.get('/:id', async (req, res) => {
  try {
    const invoice = await prisma.invoice.findUnique({ where: { id: req.params.id }, include: { items: true } });
    if (!invoice) return res.status(404).json({ error: 'Facture non trouvée' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create invoice (admin only)
router.post('/', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { clientId, invoiceNumber, issueDate, dueDate, status, subtotal, taxAmount, taxRate, total, notes, items } = req.body;
    if (!clientId || !invoiceNumber || !issueDate || !dueDate) return res.status(400).json({ error: 'Champs requis manquants' });
    const invoice = await prisma.invoice.create({
      data: {
        clientId, invoiceNumber, issueDate, dueDate, status, subtotal, taxAmount, taxRate, total, notes,
        items: { create: items || [] }
      },
      include: { items: true }
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update invoice (admin only)
router.put('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { clientId, invoiceNumber, issueDate, dueDate, status, subtotal, taxAmount, taxRate, total, notes } = req.body;
    const invoice = await prisma.invoice.update({
      where: { id: req.params.id },
      data: { clientId, invoiceNumber, issueDate, dueDate, status, subtotal, taxAmount, taxRate, total, notes },
      include: { items: true }
    });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete invoice (admin only)
router.delete('/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.invoice.delete({ where: { id: req.params.id } });
    res.json({ message: 'Facture supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// CRUD Invoice Items
router.post('/:invoiceId/items', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { description, quantity, unitPrice, total } = req.body;
    if (!description || !quantity || !unitPrice) return res.status(400).json({ error: 'Champs requis manquants' });
    const item = await prisma.invoiceItem.create({ data: { invoiceId: req.params.invoiceId, description, quantity, unitPrice, total } });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/items/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    const { description, quantity, unitPrice, total } = req.body;
    const item = await prisma.invoiceItem.update({ where: { id: req.params.id }, data: { description, quantity, unitPrice, total } });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/items/:id', auth.express.requireAuth, auth.express.requireRole('admin'), async (req, res) => {
  try {
    await prisma.invoiceItem.delete({ where: { id: req.params.id } });
    res.json({ message: 'Ligne supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
