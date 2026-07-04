// Navigation state
let currentPage = 'home';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Load home page by default
    navigateTo('home.html');
});

// Navigate to page
function navigateTo(pageUrl) {
    // Extract page name
    const pageName = pageUrl.replace('.html', '');
    
    // Don't reload if already on this page
    if (currentPage === pageName) return;
    
    currentPage = pageName;
    
    // Update active navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        const onclick = link.getAttribute('onclick');
        if (onclick && onclick.includes(pageUrl)) {
            link.classList.add('active');
        }
    });

    // Fetch and load page content
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) throw new Error('Page not found');
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('content').innerHTML = `
                <div class="page-container">
                    <h2>Page Not Found</h2>
                    <p>Sorry, the requested page could not be loaded.</p>
                    <button class="btn" onclick="navigateTo('home.html')">
                        Go to Home
                    </button>
                </div>
            `;
        });
}

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger && 
        !hamburger.contains(event.target) && 
        !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});
