const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVwwErb4Sn16_lKNl9BPn4TFF1VP8RSq5joW3vg7YZj224Rrgriz65cumIxNHyqGI32bOJpgDC1vXD/pub?gid=672058948&single=true&output=csv';

async function loadReviews() {
    const container = document.getElementById('reviews-container');
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        const rows = data.split('\n').filter(row => row.trim() !== '').slice(1);
        
        if (rows.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #888;">No verified reviews yet. Be the first to leave one!</p>';
            return;
        }

        container.innerHTML = ''; 

        rows.forEach(row => {
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (columns.length >= 2) {
                const name = columns[1]?.replace(/"/g, '').trim() || "Verified Client";
                const reviewText = columns[2]?.replace(/"/g, '').trim() || "";
                const lawyerReply = columns[3]?.replace(/"/g, '').trim() || ""; 
                
                const card = document.createElement('div');
                card.className = 'six columns review-card';
                
                let replyHtml = '';
                if (lawyerReply && lawyerReply.length > 2) {
                    replyHtml = `
                        <div class="lawyer-reply" style="background: rgba(26, 42, 68, 0.05); border-left: 3px solid #1a2a44; padding: 15px; margin-top: 15px;">
                            <strong style="color: #1a2a44; font-size: 0.75rem; text-transform: uppercase;">Response from Counsel:</strong>
                            <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #555;">${lawyerReply}</p>
                        </div>
                    `;
                }

                card.innerHTML = `
                    <div style="background: white; border: 1px solid #eee; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                        <i class="fa-solid fa-quote-left" style="color: #c5a059; margin-bottom: 10px; display: block;"></i>
                        <p style="font-style: italic; margin-bottom: 15px;">"${reviewText}"</p>
                        <strong style="color: #1a2a44;">- ${name}</strong>
                        ${replyHtml}
                    </div>
                `;
                container.appendChild(card);
            }
        });
    } catch (error) {
        container.innerHTML = '<p style="text-align: center;">Database connection secure. Refresh to load.</p>';
    }
}
document.addEventListener('DOMContentLoaded', loadReviews);
