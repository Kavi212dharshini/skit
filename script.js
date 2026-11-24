
const movies = [
    { title: "Vikram", type: "Movies", year: "2022", videoId: "OKBMCL-frPU", videoLabel: "Trailer" },
    { title: "Leo", type: "Movies", year: "2023", videoId: "ShsFxGV_thk", videoLabel: "Trailer" },
    { title: "Jailer", type: "Movies", year: "2023", videoId: "xenOE1Tma0A", videoLabel: "Trailer" },
    { title: "Amaran", type: "Movies", year: "2024", videoId: "hylIXfZeB4c", videoLabel: "Trailer" },
    { title: "Good Night", type: "Movies", year: "2023", videoId: "eLPePlnFoho", videoLabel: "Trailer" },
    { title: "Master", type: "Movies", year: "2021", videoId: "qlLWRHhXvV8", videoLabel: "Trailer" },
    { title: "Ponniyin Selvan: I", type: "Movies", year: "2022", videoId: "D4qAQYlgZQs", videoLabel: "Trailer" },
    { title: "Maharaja", type: "Movies", year: "2024", videoId: "Otcr-vRuaQs", videoLabel: "Trailer" },
    { title: "Viduthalai Part 1", type: "Movies", year: "2023", videoId: "GYeSfq_bj_M", videoLabel: "Trailer" },

    { title: "Cooku With Comali", type: "TV Shows", year: "TV Show", videoId: "fpkxRDkp3TE", videoLabel: "Promo" },
    { title: "Super Singer", type: "TV Shows", year: "TV Show", videoId: "QK1J0azbvIQ", videoLabel: "Promo" },
    { title: "Bigg Boss Tamil", type: "TV Shows", year: "TV Show", videoId: "cvcYQoIEXw4", videoLabel: "Promo" },
    { title: "Ethirneechal", type: "TV Shows", year: "TV Show", videoId: "L639k5snSqc", videoLabel: "Promo" },
    { title: "Siragadikka Aasai", type: "TV Shows", year: "TV Show", videoId: "Jth4uZcoTTg", videoLabel: "Promo" },
    { title: "Annam", type: "TV Shows", year: "TV Serial", videoId: "0xgXm6Ztzic", videoLabel: "Promo" },
    { title: "Marumagal", type: "TV Shows", year: "TV Serial", videoId: "S_f2_gqbJik", videoLabel: "Promo" },
    { title: "Singapenne", type: "TV Shows", year: "TV Serial", videoId: "xOUCIR1xmlA", videoLabel: "Promo" },

    { title: "Suzhal", type: "Web Series", year: "Web Series", videoId: "b2xE68VEjUs", videoLabel: "Trailer" },
    { title: "Vilangu", type: "Web Series", year: "Web Series", videoId: "oIXvlxX9qH0", videoLabel: "Trailer" },
    { title: "Mathagam", type: "Web Series", year: "Web Series", videoId: "VwubafrjxRA", videoLabel: "Trailer" },
    { title: "Label", type: "Web Series", year: "Web Series", videoId: "m0K1XH0rFHs", videoLabel: "Trailer" },
    { title: "Ayali", type: "Web Series", year: "Web Series", videoId: "yzTQ8y0dImQ", videoLabel: "Trailer" },
    { title: "Vadhandhi: The Fable of Velonie", type: "Web Series", year: "Web Series", videoId: "6tOpaiT3eZA", videoLabel: "Trailer" },
    { title: "Inspector Rishi", type: "Web Series", year: "Web Series", videoId: "4CKU89MI0_0", videoLabel: "Trailer" },
    { title: "Modern Love Chennai", type: "Web Series", year: "Web Series", videoId: "LMkXdF-uVvI", videoLabel: "Trailer" },
    { title: "Pettaikaali", type: "Web Series", year: "Web Series", videoId: "-ZWD8h0-TOY", videoLabel: "Trailer" }
];

const container = document.getElementById("movieContainer");
const sectionTitle = document.getElementById("sectionTitle");
const searchInput = document.getElementById("searchInput");

let currentFilter = "All";
let myList = [];

function displayMovies(items) {
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p>No titles found.</p>";
        return;
    }

    items.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        const img = document.createElement("img");
        img.alt = movie.title;
        img.loading = "lazy";
        img.onerror = function () {
            this.onerror = null;
            this.src = createFallbackPoster(movie.title);
        };
        img.src = `https://i.ytimg.com/vi/${movie.videoId}/hqdefault.jpg`;

        const info = document.createElement("div");
        info.className = "movie-info";

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const details = document.createElement("p");
        details.textContent = movie.type + " | " + movie.year;

        const button = document.createElement("button");
        button.textContent = myList.includes(movie.title)
            ? "Remove from My List"
            : "Add to My List";

        button.addEventListener("click", event => {
            event.stopPropagation();
            toggleMyList(movie);
        });

        const playButton = document.createElement("button");
        playButton.type = "button";
        playButton.className = "watch-button";
        playButton.textContent = `Watch ${movie.videoLabel}`;
        playButton.addEventListener("click", event => {
            event.stopPropagation();
            openTrailer(movie);
        });

        info.append(title, details, playButton, button);
        card.append(img, info);
        card.addEventListener("click", () => openTrailer(movie));
        container.appendChild(card);
    });
}

function createFallbackPoster(title) {
    const safeTitle = title.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    })[character]);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><defs><linearGradient id="g" x2="0" y2="1"><stop stop-color="#62131b"/><stop offset="1" stop-color="#101018"/></linearGradient></defs><rect width="400" height="600" fill="url(#g)"/><circle cx="305" cy="145" r="95" fill="#e50914" opacity=".24"/><path d="M0 430 170 245l230 230v125H0z" fill="#080808" opacity=".65"/><text x="28" y="520" fill="white" font-family="Arial,sans-serif" font-size="32" font-weight="bold">${safeTitle}</text><text x="30" y="558" fill="#ddd" font-family="Arial,sans-serif" font-size="16" letter-spacing="4">TAMILFLIX</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function openTrailer(movie) {
    const modal = document.getElementById("trailerModal");
    const title = document.getElementById("trailerTitle");
    const frame = document.getElementById("trailerFrame");
    const youtubeLink = document.getElementById("youtubeLink");

    title.textContent = `${movie.title} - ${movie.videoLabel}`;
    youtubeLink.textContent = `Open ${movie.videoLabel.toLowerCase()} on YouTube`;
    youtubeLink.href = `https://www.youtube.com/watch?v=${movie.videoId}`;
    frame.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${movie.videoId}?autoplay=1&controls=1&rel=0`;
    iframe.title = `${movie.title} ${movie.videoLabel}`;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    frame.appendChild(iframe);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeTrailer() {
    const modal = document.getElementById("trailerModal");
    const frame = document.getElementById("trailerFrame");

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    frame.innerHTML = "";
    document.body.classList.remove("modal-open");
}

function toggleMyList(movie) {
    if (myList.includes(movie.title)) {
        myList = myList.filter(title => title !== movie.title);
    } else {
        myList.push(movie.title);
    }

    filterMovies();
}

function filterMovies() {
    const searchText = searchInput.value.trim().toLowerCase();

    let filtered = movies;

    if (currentFilter === "My List") {
        filtered = movies.filter(movie => myList.includes(movie.title));
    } else if (currentFilter !== "All") {
        filtered = movies.filter(movie => movie.type === currentFilter);
    }

    filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchText)
    );

    displayMovies(filtered);
}

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        currentFilter = this.dataset.filter;
        sectionTitle.textContent = currentFilter === "All"
            ? "Popular Tamil Entertainment"
            : currentFilter;

        filterMovies();
    });
});

searchInput.addEventListener("input", filterMovies);

function showAll() {
    currentFilter = "All";
    searchInput.value = "";
    sectionTitle.textContent = "Popular Tamil Entertainment";
    filterMovies();
}

document.getElementById("closeTrailer").addEventListener("click", closeTrailer);

document.getElementById("trailerModal").addEventListener("click", event => {
    if (event.target === event.currentTarget) {
        closeTrailer();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeTrailer();
    }
});

displayMovies(movies);

