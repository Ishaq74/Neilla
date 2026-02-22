import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany({
      include: { quoteItems: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get a single quote by id
router.get('/:id', async (req, res) => {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: req.params.id },
      include: { quoteItems: true },
    });
    if (!quote) return res.status(404).json({ error: 'Devis non trouvé' });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Create a new quote (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId, quoteNumber, issueDate, validUntil, status, subtotal, taxAmount, taxRate, total, notes, quoteItems } = req.body;
    if (!quoteNumber || !issueDate || !validUntil) return res.status(400).json({ error: 'Champs requis manquants' });
    const quote = await prisma.quote.create({
      data: {
        clientId,
        quoteNumber,
        issueDate,
        validUntil,
        status,
        subtotal,
        taxAmount,
        taxRate,
        total,
        notes,
        quoteItems: {
          create: quoteItems || []
        }
      },
      include: { quoteItems: true }
    });
    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Update a quote (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId, quoteNumber, issueDate, validUntil, status, subtotal, taxAmount, taxRate, total, notes, quoteItems } = req.body;
    const quote = await prisma.quote.update({
      where: { id: req.params.id },
      data: {
        clientId,
        quoteNumber,
        issueDate,
        validUntil,
        status,
        subtotal,
        taxAmount,
        taxRate,
        total,
        notes,
        // Pour la mise à jour des items, il faudrait une logique plus fine (ici on ne fait rien)
      },
      include: { quoteItems: true }
    });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Delete a quote (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.quote.delete({ where: { id: req.params.id } });
    res.json({ message: 'Devis supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
