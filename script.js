let postsArray = [];
const form = document.querySelector("form");

const renderPosts = () => {
  let html = "";
  for (let post of postsArray) {
    html += `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr />
      `;
  }
  document.querySelector("#posts").innerHTML = html;
};

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPosts();
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const postTitle = document.querySelector("#post-title").value;
  const postBody = document.querySelector("#post-body").value;
  const data = {
    title: postTitle,
    body: postBody,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPosts();
      form.reset();
    });
});
