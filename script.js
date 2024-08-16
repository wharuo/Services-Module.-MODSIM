// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('header');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#111827';
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation and submission
const form = document.querySelector('#contact-form');
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();

        if (name && email && message) {
            alert('Thank you for your message!');
            form.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Intersection Observer for animations on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});

document.querySelectorAll('.feature-item, .package-item, .about-section, .contact-section, .project-item, .example-item').forEach(section => {
    observer.observe(section);
});

// Example functions for running ML simulations
function runExample(modelType) {
    const yearsInput = document.getElementById(`${modelType}-period`);
    const years = yearsInput ? yearsInput.value : 0;

    if (!years) {
        alert('Please enter a valid period.');
        return;
    }

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ model: modelType, years: years })
    })
    .then(response => response.json())
    .then(data => {
        const graphData = JSON.parse(data);
        const chartContainer = document.getElementById(`${modelType}-chart`);
        Plotly.newPlot(chartContainer, graphData.data, graphData.layout);
    })
    .catch(error => console.error('Error:', error));
}
    // Placeholder for actual ML simulation logic
    // Here you could integrate your real ML simulation logic or backend interaction
}

// Attach events to buttons for ML examples
document.querySelectorAll('.example-item button').forEach(button => {
    button.addEventListener('click', function () {
        const modelType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        runExample(modelType);
    });
});
