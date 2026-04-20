const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVwwErb4Sn16_lKNl9BPn4TFF1VP8RSq5joW3vg7YZj224Rrgriz65cumIxNHyqGI32bOJpgDC1vXD/pub?gid=672058948&single=true&output=csv';

async function loadReviews() {
    const container = document.getElementById('reviews-container');
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        const rows = data.split('\n').filter(row => row.trim() !== '').slice(1);
        
        container.innerHTML = ''; 

        rows.forEach(row => {
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (columns.length >= 3) {
                const name = columns[1]?.replace(/"/g, '').trim() || "Verified Client";
                const reviewText = columns[2]?.replace(/"/g, '').trim() || "";
                const lawyerReply = columns[3]?.replace(/"/g, '').trim() || ""; // Column D
                
                const card = document.createElement('div');
                card.className = 'six columns review-card';
                
                let replyHtml = '';
                if (lawyerReply && lawyerReply.length > 2) {
                    replyHtml = `
                        <div class="lawyer-reply">
                            <strong>Response from Counsel:</strong>
                            <p>${lawyerReply}</p>
                        </div>
                    `;
                }

                card.innerHTML = `
                    <div class="review-body">
                        <i class="fa-solid fa-quote-left" style="color: #c5a059;"></i>
                        <p class="client-text">"${reviewText}"</p>
                        <span class="client-name">- ${name}</span>
                        ${replyHtml}
                    </div>
                `;
                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Data Fetch Error');
    }
}
document.addEventListener('DOMContentLoaded', loadReviews);
