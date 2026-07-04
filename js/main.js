// Simple navigation
document.addEventListener('DOMContentLoaded', function() {
    loadPage('home.html');
});

function navigateTo(page) {
    // Close mobile menu
    var navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    
    loadPage(page);
}

function loadPage(page) {
    var content = document.getElementById('content');
    
    content.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-spinner fa-spin" style="font-size:40px; color:#2563eb;"></i></div>';
    
    // Update active menu
    var links = document.querySelectorAll('.nav-menu a');
    links.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').indexOf(page) !== -1) {
            link.classList.add('active');
        }
    });
    
    // Load the page
    fetch(page)
        .then(function(response) {
            return response.text();
        })
        .then(function(html) {
            content.innerHTML = html;
            window.scrollTo(0, 0);
        })
        .catch(function(error) {
            content.innerHTML = '<div class="page-container"><h2>Error Loading Page</h2><p>Please try again.</p></div>';
        });
}

// Mobile menu toggle
function toggleMenu() {
    var navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}
