const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVwwErb4Sn16_lKNl9BPn4TFF1VP8RSq5joW3vg7YZj224Rrgriz65cumIxNHyqGI32bOJpgDC1vXD/pub?gid=672058948&single=true&output=csv';

async function loadReviews() {
    const container = document.getElementById('reviews-container');
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        
        // Split by lines and skip the header
        const rows = data.split('\n').filter(row => row.trim() !== '').slice(1);
        
        if (rows.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #888;">No verified reviews yet. Be the first to leave one!</p>';
            return;
        }

        container.innerHTML = ''; // Clear loading message

        rows.forEach(row => {
            // Clean up the CSV row data
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (columns.length >= 2) {
                const name = columns[1] ? columns[1].replace(/"/g, '').trim() : "Verified Client";
                const text = columns[2] ? columns[2].replace(/"/g, '').trim() : "No comment provided.";
                
                const card = document.createElement('div');
                card.className = 'four columns review-card';
                card.style = 'background: white; padding: 20px; border: 1px solid #eee; border-radius: 8px; margin-bottom: 20px; min-height: 150px;';
                card.innerHTML = `
                    <i class="fa-solid fa-quote-left" style="color: #c5a059;"></i>
                    <p style="font-style: italic; font-size: 0.9rem;">"${text}"</p>
                    <strong style="color: #1a2a44; font-size: 0.8rem;">- ${name}</strong>
                `;
                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Fetch Error:', error);
        container.innerHTML = '<p style="text-align: center;">Unable to load reviews at this time.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadReviews);
