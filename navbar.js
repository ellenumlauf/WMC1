function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

document.querySelectorAll('.mobile-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('active');  // Toggle für die einzelnen Dropdowns
    });
});