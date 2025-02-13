document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links-container');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // 点击导航链接时关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // 点击页面其他区域时关闭菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });
});