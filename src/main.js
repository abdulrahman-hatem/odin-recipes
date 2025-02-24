const app = document.getElementById("app");
const pathName = window.location.pathname;

// fetching the recipes list
const recList = await fetch(
  "https://www.themealdb.com/api/json/v1/1/filter.php?a=egyptian"
)
  .then((data) => data.json())
  .then((d) => d.meals);

const mealsIds = {};
recList.forEach((e) => (mealsIds[e.strMeal] = e.idMeal));

// const mealsIds =
function renderMainPage() {
  window.history.pushState({}, "", "/");

  app.innerHTML = `
   <section class="section hero center col">
        <div>
          <h1 class="main-header">Unleash Your <br />Inner Chef</h1>
          <p>
            Experience the rich flavors of Egyptian cuisine with easy-to-follow
            recipes for every taste and skill level. Whether you're new to
            cooking or a seasoned chef, discover dishes that bring tradition and
            taste to your table.
          </p>
        </div>
        <button id="scroll">Explore Recipes Now</button>
        <div class="center">
          <img
            class="chicken"
            src="/chicken.svg"
            alt="a fried chicken in a box"
          />
          <img
            class="fast-food"
            src="/fast-food.svg"
            alt="a hamburger with a flag on it and a cola next to it"
          />
        </div>
      </section>
      <div class="blocker"></div>
      <section class="recipies">${createRecList(recList).outerHTML}</section>
  `;

  app.querySelector("#scroll").addEventListener("click", () => {
    document.querySelector(".recipies").scrollIntoView({ behavior: "smooth" });
  });

  app.querySelectorAll(".recLink").forEach((l) =>
    l.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo(l.href, l.getAttribute("data-name"));
    })
  );
}

async function renderDetialsPage(meal) {
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealsIds[meal]}`
  )
    .then((d) => d.json())
    .then((d) => d.meals[0]);

  console.log(data);
  app.innerHTML = `<h1>${data.strMeal}</h1>`;
}

// returns a div of cups svg with gold ones as the rate says
function createDiffRate(rate = Math.floor(Math.random() * 4 + 2)) {
  const normalCup = `<svg fill="#cccccc" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3334 6.80168V6.86251C18.3334 7.57918 18.3334 7.93835 18.1609 8.23168C17.9884 8.52501 17.6742 8.69918 17.0476 9.04835L16.3867 9.41501C16.8417 7.87501 16.9942 6.22001 17.0501 4.80501L17.0584 4.62085L17.0601 4.57751C17.6026 4.76585 17.9076 4.90668 18.0976 5.17001C18.3334 5.49751 18.3334 5.93251 18.3334 6.80168ZM1.66675 6.80168V6.86251C1.66675 7.57918 1.66675 7.93835 1.83925 8.23168C2.01175 8.52501 2.32591 8.69918 2.95258 9.04835L3.61425 9.41501C3.15841 7.87501 3.00591 6.22001 2.95008 4.80501L2.94175 4.62085L2.94091 4.57751C2.39758 4.76585 2.09258 4.90668 1.90258 5.17001C1.66675 5.49751 1.66675 5.93335 1.66675 6.80168Z" />
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.6475 1.95586C12.4418 1.75836 11.2217 1.66163 9.99998 1.66669C8.51415 1.66669 7.28915 1.79753 6.35248 1.95586C5.40332 2.11586 4.92915 2.19586 4.53248 2.68419C4.13665 3.17253 4.15748 3.70003 4.19915 4.75503C4.34332 8.37836 5.12498 12.905 9.37498 13.305V16.25H8.18332C7.99074 16.2501 7.80415 16.317 7.65526 16.4391C7.50638 16.5612 7.4044 16.7312 7.36665 16.92L7.20832 17.7084H4.99998C4.83422 17.7084 4.67525 17.7742 4.55804 17.8914C4.44083 18.0086 4.37498 18.1676 4.37498 18.3334C4.37498 18.4991 4.44083 18.6581 4.55804 18.7753C4.67525 18.8925 4.83422 18.9584 4.99998 18.9584H15C15.1657 18.9584 15.3247 18.8925 15.4419 18.7753C15.5591 18.6581 15.625 18.4991 15.625 18.3334C15.625 18.1676 15.5591 18.0086 15.4419 17.8914C15.3247 17.7742 15.1657 17.7084 15 17.7084H12.7917L12.6333 16.92C12.5956 16.7312 12.4936 16.5612 12.3447 16.4391C12.1958 16.317 12.0092 16.2501 11.8167 16.25H10.625V13.305C14.875 12.905 15.6575 8.37919 15.8008 4.75503C15.8425 3.70003 15.8642 3.17169 15.4675 2.68419C15.0708 2.19586 14.5967 2.11586 13.6475 1.95586Z" />
</svg>`;
  const activeCup = `<svg fill="#ffb400" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3334 6.80168V6.86251C18.3334 7.57918 18.3334 7.93835 18.1609 8.23168C17.9884 8.52501 17.6742 8.69918 17.0476 9.04835L16.3867 9.41501C16.8417 7.87501 16.9942 6.22001 17.0501 4.80501L17.0584 4.62085L17.0601 4.57751C17.6026 4.76585 17.9076 4.90668 18.0976 5.17001C18.3334 5.49751 18.3334 5.93251 18.3334 6.80168ZM1.66675 6.80168V6.86251C1.66675 7.57918 1.66675 7.93835 1.83925 8.23168C2.01175 8.52501 2.32591 8.69918 2.95258 9.04835L3.61425 9.41501C3.15841 7.87501 3.00591 6.22001 2.95008 4.80501L2.94175 4.62085L2.94091 4.57751C2.39758 4.76585 2.09258 4.90668 1.90258 5.17001C1.66675 5.49751 1.66675 5.93335 1.66675 6.80168Z" />
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.6475 1.95586C12.4418 1.75836 11.2217 1.66163 9.99998 1.66669C8.51415 1.66669 7.28915 1.79753 6.35248 1.95586C5.40332 2.11586 4.92915 2.19586 4.53248 2.68419C4.13665 3.17253 4.15748 3.70003 4.19915 4.75503C4.34332 8.37836 5.12498 12.905 9.37498 13.305V16.25H8.18332C7.99074 16.2501 7.80415 16.317 7.65526 16.4391C7.50638 16.5612 7.4044 16.7312 7.36665 16.92L7.20832 17.7084H4.99998C4.83422 17.7084 4.67525 17.7742 4.55804 17.8914C4.44083 18.0086 4.37498 18.1676 4.37498 18.3334C4.37498 18.4991 4.44083 18.6581 4.55804 18.7753C4.67525 18.8925 4.83422 18.9584 4.99998 18.9584H15C15.1657 18.9584 15.3247 18.8925 15.4419 18.7753C15.5591 18.6581 15.625 18.4991 15.625 18.3334C15.625 18.1676 15.5591 18.0086 15.4419 17.8914C15.3247 17.7742 15.1657 17.7084 15 17.7084H12.7917L12.6333 16.92C12.5956 16.7312 12.4936 16.5612 12.3447 16.4391C12.1958 16.317 12.0092 16.2501 11.8167 16.25H10.625V13.305C14.875 12.905 15.6575 8.37919 15.8008 4.75503C15.8425 3.70003 15.8642 3.17169 15.4675 2.68419C15.0708 2.19586 14.5967 2.11586 13.6475 1.95586Z" />
</svg>`;

  const diffRate = document.createElement("div");
  diffRate.className = "diffRate";

  diffRate.innerHTML = Array.from({ length: 5 }, (_, i) =>
    i < rate ? activeCup : normalCup
  ).join(" ");

  return diffRate;
}

function createRecCard(recData) {
  const reCard = document.createElement("article");
  reCard.className = "recCard";

  reCard.innerHTML = `
  <a
  data-id="${recData.idMeal}"
  data-name="${recData.strMeal}"
  style="color: inherit; text-decoration: none;"
class="recLink"
   href="/recipies/${recData.strMeal}">
    <div class="diff">
      <span>Difficulty:</span>
      ${createDiffRate().outerHTML} 
    </div>
    <div style="overflow: hidden;">
      <img src="${recData.strMealThumb}" alt="${
    recData.strMeal
  }" class="recImg">
    </div>
    <h3 style="font-weight: 600; text-align: center; margin-top: 0.4rem;">${
      recData.strMeal
    }</h3>
  </a>
  `;

  return reCard;
}

function createRecList(recipies) {
  const recs = document.createElement("div");
  const recsHeader = document.createElement("h2");
  const recsContent = document.createElement("div");

  recsHeader.textContent = "Best Egyptian recipies";
  recsHeader.className = "recHeader";
  recsContent.classList = "recs center";
  recs.classList = "section";

  for (let item of recipies) recsContent.appendChild(createRecCard(item));

  recs.append(recsHeader, recsContent);

  return recs;
}

function navigateTo(path, meal = "") {
  window.history.pushState({ meal }, "", path);

  mealsIds[meal] ? renderDetialsPage(meal) : renderMainPage();
}

navigateTo(pathName, decodeURIComponent(pathName.split("/").pop()));
// TODO replace renderDetails to use names instead of ids

window.addEventListener("popstate", (e) => {
  const path = window.location.pathname;
  const meal = e.state ? e.state.meal : null;
  navigateTo(path, meal);
});
