# SMOVIE

<p>SMOVIE is a responsive movie search application built with React, Tailwind CSS, and Swiper. It enables users to discover movies by genre, save favorites, and access them anytime with ease. The app includes interactive features like data storage via JSON files and a favorites system that utilizes local storage for persistent user preferences.</p> <br /> <img src="./public/interface.png">

<br />

<img src="./public/interface.png">

## Features

<ul> <li><h3>Data Storage with JSON</h3> Data is stored and managed in a data.json file, providing flexibility and easy updates to the content.</li> <li><h3>Favorites with Local Storage</h3> Users can save favorites, which are stored in local storage for persistent data access.</li> </ul>

## Challenge

<ul>
  <li>
    <h3>Real-Time Favorite Count Update in Local Storage</h3>  
    <p>During the implementation of the favorite movie feature, I initially added all functionalities directly into the card component. However, I decided to create a separate FavBtn.jsx component. This allowed me to keep the code organized and made it easier to reuse the favorite button in future components, enhancing maintainability.</p>
    <p>Here's how these components are structured.</p>
    <ol>
      <li>Updating Local Storage:  
        
The FavBtn component handles the logic for adding and removing movies from the favorites. It utilizes local storage to preserve user favorites even after a page refresh, ensuring a consistent user experience.
```
//FavBtn.jsx

const toggleFavorite = () => {
setFavorites((prevFavorites) => {
const newFavorites = prevFavorites.includes(movieId)
? prevFavorites.filter((id) => id !== movieId)
: [...prevFavorites, movieId];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    window.dispatchEvent(new Event("favoritesUpdated")); // Dispatching event for count update

    return newFavorites;

});
};

```
</li>

<br />

<li>Real-Time Count Update:


The header component listens for changes to the favorites and updates the displayed favorite count in real-time. When the favorite movies are modified, the header component fetches the updated count from local storage and reflects it immediately in the UI.
```

//Header.jsx

useEffect(() => {
const updateFavoriteCount = () => {
const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
setFavoriteCount(savedFavorites.length); // Update favorite count
};

updateFavoriteCount(); // Initial count load
window.addEventListener("favoritesUpdated", updateFavoriteCount);

return () => {
window.removeEventListener("favoritesUpdated", updateFavoriteCount);
};
}, []);

```
</li>

<br />

<li>Displaying the Favorite Count:


The favorite count is displayed next to the heart icon in the header, providing users with immediate feedback about their favorite movies. The count updates automatically whenever the favorites change, ensuring that the user always sees the correct number of favorites:
```

//Header.jsx

{favoriteCount > 0 && (
<span className="bg-purple-500 text-white text-xs rounded-full px-1">
{favoriteCount}
</span>
)}

```

</ul>


```

## Challenge

<ul> <li> <h3>Favorite Page: Missing Movie Details</h3> <p>The issue with the FavoritePage component was that only movie IDs were being stored and rendered. When the favorites were retrieved from local storage, only the IDs were available, so the page displayed only the IDs instead of the movie details.</p> <p>Here's how I fixed it:</p> <ol> <li>**Fetching movie details**: I added a function (`fetchMovieDetails`) to fetch full movie data (e.g., title, poster, release date) using the movie IDs from **The Movie Database (TMDb) API**.</li> <li>**Storing movie details**: Instead of storing only movie IDs, I now store the full movie objects (including title, poster, etc.) in the `movies` state.</li> <li>**Rendering the details**: In the JSX, I updated the code to map over the `movies` array (which contains the full movie objects) and display the relevant details like the poster and title.</li> </ol> </li> </ul>

## How to Run the SMOVIE React Project


