//Blog data
const posts = [
  {
    title: "Exploring JavaScript Basics",
    image: "img/tech.jpg",
    description: "A beginner-friendly guide to understanding core JS concepts.",
    date: "2025-10-15",
    category: "tech"
  },
  {
    title: "Top 5 Hidden Gems in Japan",
    image: "img/travel.jpg",
    description: "Discover some of Japan’s most underrated travel destinations.",
    date: "2025-09-20",
    category: "travel"
  },
  {
    title: "How to Make the Perfect Pasta",
    image: "img/food.jpg",
    description: "A simple recipe for authentic Italian pasta.",
    date: "2025-08-05",
    category: "food"
  },
  {
    title: "The Future of AI in Everyday Life",
    image: "img/tech2.jpg",
    description: "Exploring how artificial intelligence is shaping the world.",
    date: "2025-7-29",
    category: "tech"
  },
  {
    title: "My Road Trip Across Europe",
    image: "img/travel2.jpg",
    description: "Highlights from my recent 3-week adventure through Europe.",
    date: "2025-07-22",
    category: "travel"
  },
  {
    title: "Quick and Healthy Breakfast Ideas",
    image: "img/food2.jpg",
    description: "Start your day right with these easy breakfast recipes.",
    date: "2025-06-12",
    category: "food"
  }
];

const postsPerPage = 3;
let currentPage = 1;
let currentCategory = "all";
let searchQuery = "";

const blogPostsContainer = document.getElementById("blog-posts");
const paginationContainer = document.getElementById("pagination");
const categoryButtons = document.querySelectorAll("#category-filter button");
const searchInput = document.getElementById("search-input");

function displayPosts() {
  blogPostsContainer.innerHTML = "";

  //Filter by category
  let filteredPosts = currentCategory === "all" ? posts : posts.filter(post => post.category === currentCategory);

  //Filter by search
  if (searchQuery.trim() !== "") {
    filteredPosts = filteredPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  //Pagination logic
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = filteredPosts.slice(start, end);

  //If no results
  if (filteredPosts.length === 0) {
    blogPostsContainer.innerHTML = "<p>No posts found.</p>";
    paginationContainer.innerHTML = "";
    return;
  }

  //Create post cards
  paginatedPosts.forEach(post => {
    const card = document.createElement("article");
    card.className = "post-card";
    card.innerHTML = `
      <img src='${post.image}' alt="${post.title}" width=100%>
      <p style="text-transform: capitalize;">${post.category}</p>
      <h2>${post.title}</h2>
      <p>${post.description}</p>
      <small>${post.date}</small>
    `;
    blogPostsContainer.appendChild(card);
  });

  displayPagination(filteredPosts.length);
}

function displayPagination(totalPosts) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayPosts();
    });
    paginationContainer.appendChild(btn);
  }
}

//Category filter
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    currentPage = 1;
    displayPosts();
  });
});

//Search filter
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value;
  currentPage = 1;
  displayPosts();
});

//Inital load
displayPosts();
