let listings = [];
let shortlisted = {};

// Load listings from a JSON file
fetch('listings.json')
    .then(response => response.json())
    .then(data => {
        listings = data;
        renderListings();
    });

const renderListings = () => {
    const container = document.getElementById('listings-container');
    container.innerHTML = '';

    listings.forEach((listing, index) => {
        if (document.getElementById('shortlist-icon').src.includes('img/shortlist-fill.png') && !shortlisted[index]) return;

        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="content">

                <h2>${listing.name}</h2>
                <div class="stars">${'★'.repeat(listing.rating)}${'☆'.repeat(5 - listing.rating)}</div>
                <p>${listing.desc}</p>
                <div class="info">
                    <div><h2>${listing.projects}</h2><span>Projects</span></div>
                    <div><h2>${listing.years}</h2><span>Years</span></div>
                    <div><h2>${listing.price}</h2><span>Price</span></div>
                </div>
                <div class="contact">
                    <div>${listing.contact1}</div>
                    <div>${listing.contact2}</div>
                </div>
            </div>
            <div class="action-container">
                <div class="vertical-line"></div>
                <div class="actions">
                    <div class="action-item"><img src="img/details.png" alt="Details">Details</div>
                    <div class="action-item"><img src="img/hide.png" alt="Hide">Hide</div>
                    <div class="action-item shortlist-toggle"><img src="${shortlisted[index] ? 'img/shortlist-fill.png' : 'img/shortlist-line.png'}" alt="Shortlist">Shortlist</div>
                    <div class="action-item"><img src="img/report.png" alt="Report">Report</div>
                </div>
            </div>
        `;

        card.querySelector('.shortlist-toggle').addEventListener('click', () => {
            if (shortlisted[index]) {
                delete shortlisted[index];
                document.getElementById('shortlist-count').innerText = Object.keys(shortlisted).length;
                card.querySelector('.shortlist-toggle img').src = 'img/shortlist-line.png';
            } else {
                shortlisted[index] = true;
                document.getElementById('shortlist-count').innerText = Object.keys(shortlisted).length;
                card.querySelector('.shortlist-toggle img').src = 'img/shortlist-fill.png';
            }
        });

        container.appendChild(card);
    });
};

document.getElementById('shortlist-icon').addEventListener('click', () => {
    if (document.getElementById('shortlist-icon').src.includes('img/shortlist-line.png')) {
        document.getElementById('shortlist-icon').src = 'img/shortlist-fill.png';
    } else {
        document.getElementById('shortlist-icon').src = 'img/shortlist-line.png';
    }
    renderListings();
});