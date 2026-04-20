const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVwwErb4Sn16_lKNl9BPn4TFF1VP8RSq5joW3vg7YZj224Rrgriz65cumIxNHyqGI32bOJpgDC1vXD/pub?gid=672058948&single=true&output=csv';

async function loadReviews() {
    const container = document.getElementById('reviews-container');
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        
        // Clean CSV parsing
        const rows = data.split('\n').filter(row => row.trim() !== '').slice(1);
        
        if (rows.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #888;">No verified reviews in the secure database yet.</p>';
            return;
        }

        container.innerHTML = ''; 

        rows.forEach(row => {
            // regex to handle commas inside quotes
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (columns.length >= 2) {
                const name = columns[1] ? columns[1].replace(/"/g, '').trim() : "Verified Client";
                const text = columns[2] ? columns[2].replace(/"/g, '').trim() : "No comment.";
                
                const card = document.createElement('div');
                card.className = 'four columns review-card';
                card.innerHTML = `
                    <i class="fa-solid fa-quote-left" style="color: #c5a059;"></i>
                    <p style="font-style: italic; font-size: 0.95rem;">"${text}"</p>
                    <strong style="color: #1a2a44;">- ${name}</strong>
                `;
                container.appendChild(card);
            }
        });
    } catch (error) {
        container.innerHTML = '<p style="text-align: center;">Database connection secure. Please refresh to load testimonials.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadReviews);
