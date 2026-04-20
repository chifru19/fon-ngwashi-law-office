const SHEET_URL = 'YOUR_GOOGLE_SHEET_CSV_URL_HERE';

async function loadReviews() {
    const container = document.getElementById('reviews-container');
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip header row

        container.innerHTML = ''; // Clear loading message

        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 2) {
                const name = columns[0];
                const text = columns[1];
                
                const card = document.createElement('div');
                card.className = 'four columns review-card';
                card.innerHTML = `
                    <i class="fa-solid fa-quote-left" style="color: #c5a059;"></i>
                    <p style="font-style: italic;">"${text.trim()}"</p>
                    <strong style="color: #1a2a44;">- ${name.trim()}</strong>
                `;
                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Error loading reviews:', error);
        container.innerHTML = '<p style="text-align: center;">Reviews temporarily unavailable.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadReviews);
