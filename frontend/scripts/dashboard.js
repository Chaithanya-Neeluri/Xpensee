// Dashboard JavaScript

const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const timeFilter = document.getElementById('timeFilter');
const categoryFilter = document.getElementById('categoryFilter');
const totalSpentEl = document.getElementById('totalSpent');
const totalCountEl = document.getElementById('totalCount');
const transactionsList = document.getElementById('transactionsList');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const loadingSpinner = document.getElementById('loadingSpinner');
const toast = document.getElementById('toast');

// Get token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Check authentication
function checkAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = '/';
        return false;
    }
    return true;
}

// Get user info
function loadUserInfo() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        userName.textContent = user.name;
    }
}

// Show loading spinner
function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

// Hide loading spinner
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

// Show toast message
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Format currency
function formatCurrency(amount) {
    return `₹${parseFloat(amount).toFixed(2)}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

// Set today's date as default
function setDefaultDate() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

// Add expense
expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!checkAuth()) return;

    const formData = {
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        description: document.getElementById('description').value.trim(),
        date: document.getElementById('date').value,
    };

    try {
        showLoading();
        
        const response = await fetch(`${API_BASE_URL}/expenses/add-expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Expense added successfully:', data); // Debug log
            showToast('Expense added successfully!', 'success');
            expenseForm.reset();
            setDefaultDate();
            
            // Small delay to ensure backend has processed the expense
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Reload expenses and charts
            await Promise.all([
                loadExpenses(),
                loadExpenseSummary(),
            ]);
        } else {
            console.error('Failed to add expense:', data); // Debug log
            showToast(data.message || 'Failed to add expense', 'error');
        }
    } catch (error) {
        console.error('Add expense error:', error);
        showToast('Network error. Please try again.', 'error');
    } finally {
        hideLoading();
    }
});

// Load expenses
async function loadExpenses() {
    if (!checkAuth()) return;

    try {
        const timeFilterValue = timeFilter.value;
        const categoryFilterValue = categoryFilter.value;

        let url = `${API_BASE_URL}/expenses/get-expenses`;
        const params = [];
        
        if (timeFilterValue !== 'all') {
            params.push(`filter=${timeFilterValue}`);
        }
        if (categoryFilterValue !== 'All') {
            params.push(`category=${categoryFilterValue}`);
        }
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        console.log('Fetching expenses from:', url); // Debug log
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch expenses. Status:', response.status);
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return;
        }

        const data = await response.json();
        console.log('Expenses data received:', data); // Debug log
        console.log('Number of expenses:', data.expenses ? data.expenses.length : 0); // Debug log
        
        displayExpenses(data.expenses || []);
    } catch (error) {
        console.error('Load expenses error:', error);
        showToast('Error loading expenses', 'error');
    }
}

// Display expenses
function displayExpenses(expenses) {
    if (expenses.length === 0) {
        transactionsList.innerHTML = '<p class="empty-state">No expenses found for the selected filters.</p>';
        return;
    }

    transactionsList.innerHTML = expenses
        .map((expense) => {
            return `
                <div class="transaction-item">
                    <div class="transaction-info">
                        <div class="transaction-category">${expense.category}</div>
                        ${expense.description ? `<div class="transaction-description">${expense.description}</div>` : ''}
                        <div class="transaction-date">${formatDate(expense.date)}</div>
                    </div>
                    <div class="transaction-amount">${formatCurrency(expense.amount)}</div>
                </div>
            `;
        })
        .join('');
}

// Load expense summary
async function loadExpenseSummary() {
    if (!checkAuth()) return;

    try {
        const timeFilterValue = timeFilter.value;
        const categoryFilterValue = categoryFilter.value;

        let url = `${API_BASE_URL}/expenses/get-expense-summary`;
        const params = [];
        
        if (timeFilterValue !== 'all') {
            params.push(`filter=${timeFilterValue}`);
        }
        if (categoryFilterValue !== 'All') {
            params.push(`category=${categoryFilterValue}`);
        }
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        console.log('Fetching expense summary from:', url); // Debug log
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch expense summary. Status:', response.status);
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return;
        }

        const data = await response.json();
        console.log('Expense summary data received:', data); // Debug log

        // Update stats
        totalSpentEl.textContent = formatCurrency(data.total || 0);
        totalCountEl.textContent = `${data.count || 0} ${(data.count || 0) === 1 ? 'expense' : 'expenses'}`;

        // Update charts
        if (typeof updateCharts === 'function') {
            console.log('Calling updateCharts with summary:', data.summary, 'total:', data.total); // Debug log
            updateCharts(data.summary || [], data.total || 0);
        } else {
            console.error('updateCharts function not found. Is chart.js loaded?');
        }
    } catch (error) {
        console.error('Load expense summary error:', error);
        showToast('Error loading expense summary', 'error');
    }
}

// Filter change handlers
timeFilter.addEventListener('change', async () => {
    await Promise.all([
        loadExpenses(),
        loadExpenseSummary(),
    ]);
});

categoryFilter.addEventListener('change', async () => {
    await Promise.all([
        loadExpenses(),
        loadExpenseSummary(),
    ]);
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
});

// Initialize dashboard
async function initDashboard() {
    if (!checkAuth()) return;

    loadUserInfo();
    setDefaultDate();
    
    // Wait a bit for charts to initialize
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await Promise.all([
        loadExpenses(),
        loadExpenseSummary(),
    ]);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure Chart.js and chart initialization is complete
    setTimeout(initDashboard, 200);
});

