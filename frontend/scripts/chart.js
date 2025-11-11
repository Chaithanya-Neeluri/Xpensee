// Chart.js Configuration

let barChart = null;
let pieChart = null;
let chartsInitialized = false;

// Initialize charts
function initCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }

    // Check if canvas elements exist
    const barCanvas = document.getElementById('barChart');
    const pieCanvas = document.getElementById('pieChart');
    
    if (!barCanvas || !pieCanvas) {
        console.error('Chart canvas elements not found');
        return;
    }

    // Destroy existing charts if they exist
    if (barChart) {
        barChart.destroy();
    }
    if (pieChart) {
        pieChart.destroy();
    }

    try {
        // Bar Chart
        const barCtx = barCanvas.getContext('2d');
        if (!barCtx) {
            console.error('Could not get 2d context for bar chart');
            return;
        }
        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Amount (₹)',
                    data: [],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(251, 146, 60, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                    ],
                    borderColor: [
                        'rgba(99, 102, 241, 1)',
                        'rgba(139, 92, 246, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(251, 146, 60, 1)',
                        'rgba(34, 197, 94, 1)',
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `₹${context.parsed.y.toFixed(2)}`;
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toFixed(0);
                            },
                        },
                    },
                },
            },
        });

        // Pie Chart
        const pieCtx = pieCanvas.getContext('2d');
        if (!pieCtx) {
            console.error('Could not get 2d context for pie chart');
            return;
        }
        pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(251, 146, 60, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                    ],
                    borderColor: [
                        'rgba(99, 102, 241, 1)',
                        'rgba(139, 92, 246, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(251, 146, 60, 1)',
                        'rgba(34, 197, 94, 1)',
                    ],
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12,
                                family: 'Poppins',
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                if (total === 0) return `${label}: ₹0.00 (0%)`;
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
                            },
                        },
                    },
                },
            },
        });

        chartsInitialized = true;
        console.log('Charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Update charts with new data
function updateCharts(summary, total) {
    // Ensure charts are initialized - try multiple times if needed
    if (!chartsInitialized || !barChart || !pieChart) {
        console.log('Charts not initialized, attempting to initialize...');
        initCharts();
        
        // If still not initialized after a short delay, try again
        if (!chartsInitialized || !barChart || !pieChart) {
            setTimeout(() => {
                if (!chartsInitialized || !barChart || !pieChart) {
                    initCharts();
                    if (chartsInitialized && barChart && pieChart) {
                        updateChartsData(summary, total);
                    }
                } else {
                    updateChartsData(summary, total);
                }
            }, 200);
            return;
        }
    }

    updateChartsData(summary, total);
}

// Helper function to update chart data
function updateChartsData(summary, total) {
    if (!barChart || !pieChart) {
        console.error('Charts not available for update');
        return;
    }

    console.log('updateChartsData called with summary:', summary, 'total:', total); // Debug log

    // Check if summary is valid
    if (!summary || !Array.isArray(summary)) {
        console.error('Invalid summary data:', summary);
        return;
    }

    // Filter out categories with zero amount
    const filteredSummary = summary.filter((item) => item && item.total > 0);
    
    console.log('Filtered summary:', filteredSummary); // Debug log
    
    // If no data, show empty charts
    if (filteredSummary.length === 0) {
        console.log('No data to display in charts');
        barChart.data.labels = [];
        barChart.data.datasets[0].data = [];
        barChart.update('none');
        
        pieChart.data.labels = [];
        pieChart.data.datasets[0].data = [];
        pieChart.update('none');
        return;
    }
    
    const labels = filteredSummary.map((item) => item.category);
    const amounts = filteredSummary.map((item) => item.total);
    
    console.log('Chart labels:', labels); // Debug log
    console.log('Chart amounts:', amounts); // Debug log

    // Define color arrays
    const colors = [
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(34, 197, 94, 0.8)',
    ];
    const borderColors = [
        'rgba(99, 102, 241, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(251, 146, 60, 1)',
        'rgba(34, 197, 94, 1)',
    ];

    // Get colors for the number of categories we have
    const chartColors = labels.map((_, index) => colors[index % colors.length]);
    const chartBorderColors = labels.map((_, index) => borderColors[index % borderColors.length]);

    // Update Bar Chart
    barChart.data.labels = labels;
    barChart.data.datasets[0].data = amounts;
    barChart.data.datasets[0].backgroundColor = chartColors;
    barChart.data.datasets[0].borderColor = chartBorderColors;
    barChart.update('active');

    // Update Pie Chart
    pieChart.data.labels = labels;
    pieChart.data.datasets[0].data = amounts;
    pieChart.data.datasets[0].backgroundColor = chartColors;
    pieChart.data.datasets[0].borderColor = chartBorderColors;
    pieChart.update('active');
    
    console.log('Charts updated successfully'); // Debug log
}

// Initialize charts when DOM is ready and Chart.js is loaded
function initializeChartsWhenReady() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.log('Waiting for Chart.js to load...');
        setTimeout(initializeChartsWhenReady, 50);
        return;
    }

    // Check if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initCharts, 100);
        });
    } else {
        // DOM is already ready, initialize charts after a short delay
        setTimeout(initCharts, 100);
    }
}

// Start initialization when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChartsWhenReady);
} else {
    initializeChartsWhenReady();
}

