// Simple navigation
document.addEventListener('DOMContentLoaded', function() {
    loadPage('home.html');
});

function navigateTo(page) {
    // Close mobile menu when clicking a tab
    var navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    
    loadPage(page);
}

function loadPage(page) {
    var content = document.getElementById('content');
    
    // Show loading spinner
    content.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-spinner fa-spin" style="font-size:40px; color:#2563eb;"></i><p>Loading...</p></div>';
    
    // Update active menu link
    var links = document.querySelectorAll('.nav-menu a');
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
        var onclickAttr = links[i].getAttribute('onclick');
        if (onclickAttr && onclickAttr.indexOf(page) > -1) {
            links[i].classList.add('active');
        }
    }
    
    // Load page content
    fetch(page)
        .then(function(response) {
            return response.text();
        })
        .then(function(html) {
            content.innerHTML = html;
            window.scrollTo(0, 0);
        })
        .catch(function(error) {
            content.innerHTML = '<div class="page-container"><h2>Error Loading Page</h2><p>Please try again later.</p></div>';
        });
}

// Toggle mobile menu
function toggleMenu() {
    var navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}
