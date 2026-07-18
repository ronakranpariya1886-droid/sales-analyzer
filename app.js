function analyze() {
    const inputEl = document.getElementById("s");
    const resultEl = document.getElementById("result");
    const s_in = (inputEl.value || "").trim();

    if (!s_in) {
        resultEl.classList.add("error");
        resultEl.innerHTML = `<div class="footer-note">Please enter sales values.</div>`;
        return;
    }

    const sales = s_in.split(",").map(x => x.trim()).filter(Boolean).map(Number);

    if (sales.length === 0 || sales.some(n => Number.isNaN(n))) {
        resultEl.classList.add("error");
        resultEl.innerHTML = `<div class="footer-note">Invalid input. Use comma-separated numbers only.</div>`;
        return;
    }

    let total = 0;
    let highest = sales[0];
    let highest_day = 1;
    let lowest = sales[0];
    let lowest_day = 1;
    let above1000 = 0;

    for (let i = 0; i < sales.length; i++) {
        const value = sales[i];
        total += value;

        if (value > highest) {
            highest = value;
            highest_day = i + 1;
        }

        if (value < lowest) {
            lowest = value;
            lowest_day = i + 1;
        }

        if (value > 1000) {
            above1000++;
        }
    }

    resultEl.classList.remove("error");
    resultEl.innerHTML = `
        <div class="grid">
            <div class="stat">
                <span class="k">Total Sales</span>
                <span class="v">${total.toLocaleString()}</span>
            </div>
            <div class="stat">
                <span class="k">Days Analyzed</span>
                <span class="v">${sales.length}</span>
            </div>
            <div class="stat">
                <span class="k">Highest Sales</span>
                <span class="v">${highest.toLocaleString()} on Day ${highest_day}</span>
            </div>
            <div class="stat">
                <span class="k">Lowest Sales</span>
                <span class="v">${lowest.toLocaleString()} on Day ${lowest_day}</span>
            </div>
        </div>
        <div class="stat" style="margin-top: 12px;">
            <span class="k">Days Above 1000</span>
            <span class="v">${above1000}</span>
        </div>
        <div class="footer-note">Analysis completed for ${sales.length} day${sales.length === 1 ? '' : 's'} of sales.</div>
    `;
}

document.getElementById("submit-btn").addEventListener("click", analyze);
