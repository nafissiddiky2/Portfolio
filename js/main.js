// Navigation state to prevent double loading
let isNavigating = false;
let currentPage = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Load home page by default
    const initialPage = window.location.hash ? 
        window.location.hash.substring(1) : 'home';
    
    navigateTo(`pages/${initialPage}.html`, false);
});

// Navigate to page
function navigateTo(pageUrl, updateHash = true) {
    // Prevent multiple simultaneous navigations
    if (isNavigating) return;
    
    isNavigating = true;
    
    // Extract page name
    const pageName = pageUrl.split('/').pop().replace('.html', '');
    
    // Don't reload if we're already on this page
    if (currentPage === pageName) {
        isNavigating = false;
        return;
    }
    
    currentPage = pageName;
    
    // Update active navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        const onclick = link.getAttribute('onclick');
        if (onclick && onclick.includes(pageUrl)) {
            link.classList.add('active');
        }
    });

    // Show loading state (optional)
    const content = document.getElementById('content');
    content.style.opacity = '0.5';
    
    // Fetch and load page content
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(html => {
            content.innerHTML = html;
            content.style.opacity = '1';
            
            // Only update hash if this was a user click (not browser back/forward)
            if (updateHash) {
                // Use replaceState instead of changing hash directly
                history.pushState(null, '', `#${pageName}`);
            }
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading page:', error);
            content.innerHTML = `
                <div class="page-container">
                    <h2>Page Not Found</h2>
                    <p>Sorry, the requested page could not be loaded.</p>
                    <button class="btn" onclick="navigateTo('pages/home.html')">
                        Go to Home
                    </button>
                </div>
            `;
            content.style.opacity = '1';
        })
        .finally(() => {
            // Reset navigation flag after a short delay
            setTimeout(() => {
                isNavigating = false;
            }, 100);
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

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    const page = window.location.hash.substring(1) || 'home';
    navigateTo(`pages/${page}.html`, false);
});

// Also handle hashchange as fallback
window.addEventListener('hashchange', function(event) {
    // Only handle if not already navigating
    if (!isNavigating) {
        const page = window.location.hash.substring(1) || 'home';
        navigateTo(`pages/${page}.html`, false);
    }
});