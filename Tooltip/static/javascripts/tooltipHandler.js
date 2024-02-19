const tooltipTriggerList = document.querySelectorAll('.tooltip');
const tooltip = document.getElementById('tooltip');

tooltipTriggerList.forEach((tooltipTriggerEl) => {
    tooltipTriggerEl.addEventListener('mouseover', function () {
        const tooltipText = this.getAttribute('data-tooltip');  // Fetch tooltip text
        tooltip.innerHTML = tooltipText;
        tooltip.classList.remove('hidden');
    });
    tooltipTriggerEl.addEventListener('mouseout', function () {
        tooltip.classList.add('hidden');
    });
});