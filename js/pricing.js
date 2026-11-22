
export const fallbackPlans = [
  {
    id: "standard",
    name: "Standard",
    subtitle: "Great Entertainment. Great Value.",
    channels: 5000,
    movies: 16000,
    series: 5800,

    features: [
      ["▣", "Smart TV / Android / iOS"],
      ["↻", "Regular Content Updates"],
      ["⌕", "Fast & Easy Content Search"]
    ],

    durations: [
      { years: 1, price: 30 },
      { years: 2, price: 55 },
      { years: 3, price: 75 }
    ]
  },

  {
    id: "pro",
    name: "Pro",
    subtitle: "More Content. More Variety. More Fun.",
    channels: 16200,
    movies: 67500,
    series: 17500,
    popular: true,

    features: [
      ["▣", "Smart TV / Android / iOS"],
      ["4K", "4K / FHD / HD Quality"],
      ["↻", "Updated Content & Priority Access"],
      ["⌕", "Fast & Easy Content Search"],
      ["◎", "Multi-language Subtitles & Audio"]
    ],

    durations: [
      { years: 1, price: 45 },
      { years: 2, price: 75 },
      { years: 3, price: 105 }
    ]
  }
];

// Use the approved pricing shown on the website.
export async function loadPlans() {
  return fallbackPlans;
}

export function renderPlans(plans, onSelect) {
  const container = document.getElementById("pricingGrid");

  container.innerHTML = plans.map(plan => `
    <article class="price-card ${plan.id}">

      <div class="plan-hero">
        <span class="plan-brand">BIXOPLAY</span>

        <h3>
          ${plan.name.toUpperCase()}
          ${plan.popular ? '<span class="plan-crown">♛</span>' : ''}
        </h3>

        <p>${plan.subtitle}</p>
      </div>

      <div class="plan-stats">
        <div>
          <span class="plan-stat-icon">▣</span>
          <strong>${plan.channels.toLocaleString()}+</strong>
          <small>Live TV Channels</small>
        </div>

        <div>
          <span class="plan-stat-icon">◉</span>
          <strong>${plan.movies.toLocaleString()}+</strong>
          <small>Movies</small>
        </div>

        <div>
          <span class="plan-stat-icon">▤</span>
          <strong>${plan.series.toLocaleString()}+</strong>
          <small>TV Series</small>
        </div>
      </div>

      <div class="plan-feature-strip">
        ${plan.features.map(feature => `
          <div class="plan-feature">
            <span class="plan-feature-icon">${feature[0]}</span>
            <span>${feature[1]}</span>
          </div>
        `).join("")}
      </div>

      <div class="plan-bottom">
        <div class="plan-choose">
          <span></span>
          <strong>CHOOSE YOUR PLAN</strong>
          <span></span>
        </div>

        <div class="plan-durations">
          ${plan.durations.map(duration => `
            <div class="plan-duration">
              <span>
                ${duration.years}
                ${duration.years === 1 ? "Year" : "Years"}
              </span>

              <div class="plan-amount">
                <small>USD</small>
                <strong>${duration.price}</strong>
              </div>

              <button
                type="button"
                class="plan-subscribe"
                data-plan="${plan.id}"
                data-years="${duration.years}"
              >
                Subscribe
              </button>
            </div>
          `).join("")}
        </div>
      </div>

    </article>
  `).join("");

  container.querySelectorAll(".plan-subscribe").forEach(button => {
    button.addEventListener("click", () => {
      const plan = plans.find(
        item => item.id === button.dataset.plan
      );

      const years = Number(button.dataset.years);

      const duration = plan.durations.find(
        item => item.years === years
      );

      onSelect({
        ...plan,
        selectedYears: years,
        selectedPrice: duration.price
      });
    });
  });
}
