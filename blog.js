// Function to show a specific section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Show the default home section
showSection('home');

document.addEventListener('DOMContentLoaded', function() {
    // Initialize to show home section
    showSection('home');

    // Search button click event
    document.getElementById('search-button').addEventListener('click', function() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const mainContent = document.querySelectorAll('.main-content, .side-content');

        // Clear previous highlights
        clearHighlights(mainContent);

        if (searchTerm) {
            mainContent.forEach(content => {
                searchAndHighlight(content, searchTerm);
            });
        }
    });

    // Clear highlights
    function clearHighlights(elements) {
        elements.forEach(element => {
            const highlightedElements = element.querySelectorAll('.highlight');
            highlightedElements.forEach(el => {
                const parent = el.parentNode;
                parent.replaceChild(document.createTextNode(el.textContent), el);
                parent.normalize(); // Merge adjacent text nodes
            });
        });
    }

    // Search and highlight
    function searchAndHighlight(container, searchTerm) {
        if (container.children.length) {
            // Recursively search and highlight within each child element
            Array.from(container.children).forEach(child => searchAndHighlight(child, searchTerm));
        } else {
            // If it's a text node, apply highlight
            if (container.textContent.toLowerCase().includes(searchTerm)) {
                const innerHTML = container.innerHTML;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                container.innerHTML = innerHTML.replace(regex, '<span class="highlight">$1</span>');
            }
        }
    }

    // Handle like buttons
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event bubbling
            this.classList.toggle('liked');
            const heartIcon = this.querySelector('.heart-icon');
            heartIcon.style.color = heartIcon.style.color === 'red' ? 'black' : 'red'; // Change color
        });
    });

    // Comment popup handling
    const popup = document.getElementById("commentPopup");
    const closeButton = popup.querySelector(".close");
    const submitButton = document.getElementById("submitComment");
    const commentTextArea = document.getElementById("commentText");

    const commentButtons = document.querySelectorAll(
        ".icon-button:not(.like-button) i.material-symbols-outlined, " +
        ".food-button:not(.like-button) i.material-symbols-outlined, " +
        ".resto-button:not(.like-button) i.material-symbols-outlined, " +
        ".home-button:not(.like-button) i.material-symbols-outlined"
    );

    commentButtons.forEach(button => {
        button.parentElement.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent bubbling
            popup.style.display = "block"; // Show the popup
        });
    });

    closeButton.addEventListener("click", function() {
        popup.style.display = "none"; // Hide the popup
    });

    window.addEventListener("click", function(event) {
        if (event.target === popup) {
            popup.style.display = "none"; // Hide if clicking outside
        }
    });

    submitButton.addEventListener("click", function() {
        const commentText = commentTextArea.value;
        if (commentText.trim()) {
            alert("Comment submitted: " + commentText);
            popup.style.display = "none"; // Close the popup
            commentTextArea.value = ""; // Clear textarea
        } else {
            alert("Please write a comment before submitting!");
        }
    });
});
