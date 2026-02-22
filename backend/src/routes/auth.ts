import express from 'express';

const router = express.Router();


import { auth } from '../lib/auth';

// Register (signUp)
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }
    const { data, error } = await auth.api.signUp({
      body: { email, password, username, firstName, lastName }
    });
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ user: data.user });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
  }
});

// Login (signIn)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
    const { data, error } = await auth.api.signIn({
      body: { email, password }
    });
    if (error) return res.status(401).json({ error: error.message });
    res.json({ user: data.user, session: data.session });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
  }
});

// Logout
router.post('/logout', auth.express.requireAuth, async (req, res) => {
  try {
    await auth.api.signOut({ req, res });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la déconnexion' });
  }
});

// Get current session
router.get('/session', auth.express.requireAuth, async (req, res) => {
  try {
    const session = await auth.api.getSession({ req });
    res.json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur session' });
  }
});

// Get current user
router.get('/me', auth.express.requireAuth, async (req, res) => {
  try {
    const user = await auth.api.getUser({ req });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur user' });
  }
});

export { router as authRoutes };