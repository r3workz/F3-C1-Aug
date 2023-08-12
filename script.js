// JavaScript code for OMDB Movie Search Dashboard with Error Handling

const apiKeyInput = document.getElementById("api-key-input");
const movieTitleInput = document.getElementById("movie-title-input");
const searchBtn = document.getElementById("search-button");

const movieResultsContainer = document.getElementById(
  "movie-results-container"
);
const loader = document.getElementById("loader");

function getMovie() {
  const apiKey = apiKeyInput.value.trim();
  const movieTitle = movieTitleInput.value.trim();

  // Check if both fields are not empty
  if (apiKey !== "" && movieTitle !== "") {
    // Show the loader
    loader.style.display = "block";

    // Fetch data from OMDB API
    fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        loader.style.display = "none"; // Hide the loader
        console.log(data);

        if (data.Response === "True") {
          // Clear previous search results
          movieResultsContainer.classList.remove("error");
          movieResultsContainer.innerHTML = "";

          data.Search.forEach((movie) => {
            // movie card element
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            // image element for the movie poster
            const posterImg = document.createElement("img");
            posterImg.src = movie.Poster;
            posterImg.alt = `${movie.Title} poster`;

            // div element for the movie details
            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add("movie-details");

            // Create a heading element for the movie title and year
            const titleYearHeading = document.createElement("h2");
            titleYearHeading.textContent = `${movie.Title} (${movie.Year})`;

            // Create a link element for more details on IMDB
            const imdbLink = document.createElement("a");
            imdbLink.href = `https://www.imdb.com/title/${movie.imdbID}`;
            imdbLink.target = "_blank";
            imdbLink.textContent = "More Details";

            // Append the elements to the movie card
            detailsDiv.appendChild(titleYearHeading);
            detailsDiv.appendChild(imdbLink);
            movieCard.appendChild(posterImg);
            movieCard.appendChild(detailsDiv);

            // Append the movie card to the movie results container
            movieResultsContainer.appendChild(movieCard);
          });
        } else {
          // Display error message
          movieResultsContainer.classList.add("error");
          movieResultsContainer.innerHTML = `<p class="error-message">${data.Error}</p>`;
        }
      })
      .catch((error) => {
        loader.style.display = "none";
        movieResultsContainer.classList.add("error");
        movieResultsContainer.innerHTML = `<p class="error-message">${error.message}</p>`;
      });
  } else {
    // Clear the movie results container if either field is empty
    movieResultsContainer.innerHTML = "";
  }
}

// Add event listeners
movieTitleInput.addEventListener("input", () => getMovie());
searchBtn.addEventListener("click", () => getMovie());
