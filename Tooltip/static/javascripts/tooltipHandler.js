const tooltipTriggerList = document.querySelectorAll('.tooltip');
const tooltip = document.getElementById('tooltip');

tooltipTriggerList.forEach((tooltipTriggerEl) => {
    tooltipTriggerEl.addEventListener('mouseover', function (event) {
        const tooltipText = this.getAttribute('data-tooltip');  // Fetch tooltip text
        const tooltipX = event.clientX + 10; // Adjust 10px to the right
        const tooltipY = event.clientY + 10; // Adjust 10px downward

        tooltip.innerHTML = tooltipText;
        tooltip.style.left = tooltipX + 'px';
        tooltip.style.top = tooltipY + 'px';
        tooltip.classList.remove('hidden');


    });
    tooltipTriggerEl.addEventListener('mouseout', function () {
        tooltip.classList.add('hidden');
    });
});