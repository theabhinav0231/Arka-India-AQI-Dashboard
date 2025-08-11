document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.getElementById('tooltip');
    const states = document.querySelectorAll('.state');
    const mapContainer = document.getElementById('map-container');
    
    console.log(`Found ${states.length} states to make interactive`);

    states.forEach((state, index) => {
        const cityName = state.getAttribute('data-city');
        const url = state.getAttribute('data-url');
        
        console.log(`Setting up state ${index + 1}: ${cityName}`);

        // Mouse move handler - precise tooltip positioning
        state.addEventListener('mousemove', function(event) {
            if (!cityName) return;
            
            // CHANGED: Use direct event coordinates for fixed positioning
            const x = event.clientX;
            const y = event.clientY;
            
            // Show tooltip
            tooltip.innerHTML = `${cityName}`;
            tooltip.style.display = 'block';
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        });

        // Mouse enter - show tooltip
        state.addEventListener('mouseenter', function(event) {
            if (!cityName) return;
            
            tooltip.innerHTML = `${cityName}`;
            tooltip.style.display = 'block';
            
            // Add hover effect
            state.style.filter = 'drop-shadow(0 8px 25px rgba(255, 255, 255, 0.6))';
        });

        // Mouse leave - hide tooltip
        state.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
            state.style.filter = '';
        });

        // Click handler
        state.addEventListener('click', function(event) {
            console.log(`Clicked on ${cityName}`);
            
            // Visual feedback
            state.style.transform = 'scale(0.95)';
            setTimeout(() => {
                state.style.transform = '';
            }, 150);

            if (url && url !== '#') {
                tooltip.innerHTML = `Loading ${cityName}...`;
                setTimeout(() => {
                    window.open(url, '_blank');
                    tooltip.style.display = 'none';
                }, 500);
            } else {
                tooltip.innerHTML = `⚠️ ${cityName} - Coming Soon`;
                setTimeout(() => {
                    tooltip.style.display = 'none';
                }, 2000);
            }
        });
    });

    // Global click to hide tooltip
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.state')) {
            tooltip.style.display = 'none';
        }
    });
});