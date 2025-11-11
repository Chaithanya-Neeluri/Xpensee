const express = require('express');
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Add new expense
router.post('/add-expense', async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    // Validation
    if (!amount || !category) {
      return res.status(400).json({ message: 'Amount and category are required' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const validCategories = ['Food', 'Travel', 'Entertainment', 'Bills', 'Others'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Create expense
    const expense = new Expense({
      userId: req.userId,
      amount: parseFloat(amount),
      category,
      description: description || '',
      date: date ? new Date(date) : new Date(),
    });

    await expense.save();

    console.log(`Expense added for user ${req.userId}:`, {
      id: expense._id,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });

    res.status(201).json({
      message: 'Expense added successfully',
      expense: {
        id: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date,
      },
    });
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
});

// Get all expenses for logged-in user
router.get('/get-expenses', async (req, res) => {
  try {
    const { filter, category, startDate, endDate } = req.query;

    let query = { userId: req.userId };
    let dateFilter = {};

    // Apply category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Apply date filter
    const now = new Date();
    if (filter === 'day') {
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      dateFilter = { date: { $gte: startOfDay, $lte: endOfDay } };
    } else if (filter === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      dateFilter = { date: { $gte: startOfWeek } };
    } else if (filter === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0);
      dateFilter = { date: { $gte: startOfMonth } };
    }

    // Custom date range
    if (startDate && endDate) {
      dateFilter = {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    }

    const finalQuery = { ...query, ...dateFilter };

    const expenses = await Expense.find(finalQuery)
      .sort({ date: -1 })
      .select('-userId -__v')
      .lean();

    console.log(`Found ${expenses.length} expenses for user ${req.userId}`);
    console.log('Query:', finalQuery);
    res.json({ expenses });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
});

// Get expense summary for charts
router.get('/get-expense-summary', async (req, res) => {
  try {
    const { filter, startDate, endDate, category } = req.query;

    // Convert userId to ObjectId for aggregation (MongoDB aggregation requires exact type match)
    const userIdObjectId = new mongoose.Types.ObjectId(req.userId);

    // Build base query with ObjectId
    let matchQuery = { userId: userIdObjectId };

    // Apply date filter only if filter is specified and not 'all'
    if (filter && filter !== 'all') {
      const now = new Date();
      if (filter === 'day') {
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);
        matchQuery.date = { $gte: startOfDay, $lte: endOfDay };
      } else if (filter === 'week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        matchQuery.date = { $gte: startOfWeek };
      } else if (filter === 'month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        matchQuery.date = { $gte: startOfMonth };
      }
    }

    // Custom date range (overrides filter if provided)
    if (startDate && endDate) {
      matchQuery.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Apply category filter if provided and not "All"
    if (category && category !== 'All') {
      matchQuery.category = category;
    }

    // Log query details (ObjectId won't stringify well, so convert it)
    const queryForLog = {
      ...matchQuery,
      userId: userIdObjectId.toString()
    };
    console.log('Aggregation matchQuery:', JSON.stringify(queryForLog, null, 2));
    console.log('UserId (string):', req.userId);
    console.log('UserId (ObjectId):', userIdObjectId.toString());

    // Get category-wise summary using aggregation
    const categorySummary = await Expense.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    console.log('Category summary from aggregation:', categorySummary);

    // Get total amount
    const totalResult = await Expense.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    console.log('Total result from aggregation:', totalResult);

    const total = totalResult.length > 0 ? totalResult[0].total : 0;
    const count = totalResult.length > 0 ? totalResult[0].count : 0;

    // Format category summary
    const categories = ['Food', 'Travel', 'Entertainment', 'Bills', 'Others'];
    const summary = categories.map((cat) => {
      const found = categorySummary.find((item) => item._id === cat);
      return {
        category: cat,
        total: found ? found.total : 0,
        count: found ? found.count : 0,
      };
    });

    console.log(`Expense summary for user ${req.userId}:`, { summary, total, count });
    res.json({
      summary,
      total,
      count,
    });
  } catch (error) {
    console.error('Get expense summary error:', error);
    res.status(500).json({ message: 'Error fetching expense summary', error: error.message });
  }
});

module.exports = router;

