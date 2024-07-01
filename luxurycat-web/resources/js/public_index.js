document.addEventListener('DOMContentLoaded', function() {
    const animatedText = document.querySelector('.animated-text');
    const text = animatedText.textContent;
    animatedText.textContent = '';

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.transition = `opacity 0.3s ease ${i * 0.1}s`; // Adjust the delay as per your preference
        animatedText.appendChild(span);
    }
});