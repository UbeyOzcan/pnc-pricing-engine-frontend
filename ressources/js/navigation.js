// Highlight current page in navigation
document.addEventListener("DOMContentLoaded", function() {
    const currentPage = location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".main-nav a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
        // Special case for calculator.html (inside Products dropdown)
        if (currentPage === "calculator.html" && link.textContent.includes("Products")) {
            link.classList.add("active");
        }
    });
});