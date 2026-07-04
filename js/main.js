// Simple navigation without any complex logic
document.addEventListener('DOMContentLoaded', function() {
    loadPage('home.html');
});

function navigateTo(page) {
    loadPage(page);
}

function loadPage(page) {
    const content = document.getElementById('content');
    
    // Show loading
    content.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-spinner fa-spin" style="font-size:40px; color:#2563eb;"></i></div>';
    
    // Update active menu
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(page)) {
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
        })
        .catch(function(error) {
            content.innerHTML = '<div class="page-container"><h2>Error Loading Page</h2><p>Please try again.</p></div>';
        });
}

// Mobile menu
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}
