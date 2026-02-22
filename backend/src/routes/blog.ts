import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all blog categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.blogCategory.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// CRUD Blog Posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: 'Article non trouvé' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, slug, content, excerpt, coverImageUrl, authorId, category, status, tags, publishedAt } = req.body;
    if (!title || !slug || !content || !authorId) return res.status(400).json({ error: 'Champs requis manquants' });
    const post = await prisma.blogPost.create({ data: { title, slug, content, excerpt, coverImageUrl, authorId, category, status, tags, publishedAt } });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, slug, content, excerpt, coverImageUrl, authorId, category, status, tags, publishedAt } = req.body;
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: { title, slug, content, excerpt, coverImageUrl, authorId, category, status, tags, publishedAt },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    res.json({ message: 'Article supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// CRUD Blog Categories
router.post('/categories', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, slug, color, description } = req.body;
    if (!name || !slug) return res.status(400).json({ error: 'Champs requis manquants' });
    const category = await prisma.blogCategory.create({ data: { name, slug, color, description } });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/categories/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, slug, color, description } = req.body;
    const category = await prisma.blogCategory.update({
      where: { id: req.params.id },
      data: { name, slug, color, description },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/categories/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.blogCategory.delete({ where: { id: req.params.id } });
    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// CRUD Blog Comments
router.get('/:postId/comments', async (req, res) => {
  try {
    const comments = await prisma.blogComment.findMany({ where: { postId: req.params.postId }, orderBy: { createdAt: 'asc' } });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/:postId/comments', authenticateToken, async (req, res) => {
  try {
    const { userId, content, parentId } = req.body;
    if (!userId || !content) return res.status(400).json({ error: 'Champs requis manquants' });
    const comment = await prisma.blogComment.create({ data: { postId: req.params.postId, userId, content, parentId } });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/comments/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { content, isApproved } = req.body;
    const comment = await prisma.blogComment.update({
      where: { id: req.params.id },
      data: { content, isApproved },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/comments/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.blogComment.delete({ where: { id: req.params.id } });
    res.json({ message: 'Commentaire supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
