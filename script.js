const RATES = "10,12,15,18,22,27,33,40,48,60".split(",").map(Number);

const slider = document.getElementById('r');
const countLabel = document.getElementById('n');
const barNoDivision = document.getElementById('b1');
const barDivision = document.getElementById('b2');
const economyLabel = document.getElementById('sv');
const tableBody = document.getElementById('table-body');

let isAutoPlay = true;
let direction = 1;

const initTable = () => {
    tableBody.innerHTML = RATES.map((rate, index) => `
        <tr id="row-${index}">
            <td>Операция №${index + 1}</td>
            <td>${rate} ед.</td>
        </tr>
    `).join('');
};

const updateCalculator = () => {
    const activeCount = Number(slider.value);
    
    const costWithDivision = RATES.slice(0, activeCount).reduce((sum, current) => sum + current, 0);
    const maxActiveRate = RATES[activeCount - 1];
    const costNoDivision = activeCount * maxActiveRate;
    
    const economyPercent = Math.round((1 - costWithDivision / costNoDivision) * 100);

    countLabel.textContent = activeCount;
    
    barNoDivision.style.width = '100%';
    barNoDivision.textContent = `${costNoDivision} ед.`;
    
    const widthPercentage = (costWithDivision / costNoDivision) * 100;
    barDivision.style.width = `${widthPercentage}%`;
    barDivision.textContent = `${costWithDivision} ед.`;
    
    economyLabel.textContent = `${economyPercent}%`;

    RATES.forEach((_, index) => {
        const row = document.getElementById(`row-${index}`);
        if (!row) return;
        row.className = index < activeCount ? 'active' : 'inactive';
    });
};

slider.addEventListener('input', () => {
    isAutoPlay = false; 
    updateCalculator();
});

const startAutoPlay = () => {
    setInterval(() => {
        if (!isAutoPlay) return;

        let currentValue = Number(slider.value);
        let nextValue = currentValue + direction;

        if (nextValue > 10 || nextValue < 2) {
            direction = -direction;
            nextValue = currentValue + direction;
        }

        slider.value = nextValue;
        updateCalculator();
    }, 1800); 
};

initTable();
updateCalculator();
startAutoPlay();