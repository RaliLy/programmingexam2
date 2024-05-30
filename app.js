"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const posts = await getPosts(); 
  posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort posts by date
  console.log(posts); 
  displayPosts(posts); 
}


async function getPosts() {
  const response = await fetch(
    "http://programming-exam2.entertainment-clubs-aarhus.dk/wp-json/wp/v2/projects?acf_format=standard"
  );
  const data = await response.json();
  return data;
}


function displayPosts(posts) {
  const postsGrid = document.querySelector("#posts-grid");

  for (const post of posts) {
    postsGrid.insertAdjacentHTML(
      "beforeend",
      `
        <article class="grid-item">
          <img src="${post.acf.image}" alt="${post.title.rendered}" />
          <h2>${post.title.rendered}</h2>
          <p>${post.acf.description}</p>
          <p><strong>Tools:</strong> ${post.acf.tools}</p>
          <p><a href="${post.acf.link}" target="_blank">View Project</a></p>
        </article>
      `
    );
  }
}
