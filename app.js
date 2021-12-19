const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const repoList = document.getElementById("repo-list");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(API_URL + username + "/repos");
  const respData = await resp.json();
  displayRepo(respData);
}

function displayRepo(repos) {
    let result = "";
    repos.forEach(repo => {
      var created_date = repo.created_at;
      var created_date_output = new Date(created_date).toDateString();

      var updated_date = repo.updated_at;
      var updated_date_output = new Date(updated_date).toDateString();

      result += `
        <div class="col-lg-6">
            <div class="single-repo">
                <h4 class="name"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                <div class="d-flex flex-wrap justify-content-between mt-2">
                  <p class="create-on">Created on : ${created_date_output}</p>
                  <p class="update-on">Update on : ${updated_date_output}</p>
                </div>
            </div>
        </div>
      `;
    });
    repoList.innerHTML = result;
  }

function createUserCard(user) {
  const cardHTML = `
      <div class="author-card">
        <div class="inner">
          <div class="avatar">
              <img  src="${user.avatar_url}" alt="${user.name}" />
          </div>
          <div class="user-info">
              <h2>${user.name}</h2>
              <p>${user.bio}</p>
          </div>
        </div>
        <ul class="info-list">
            <li><strong>Followers : </strong>${user.followers}</li>
            <li><strong>Following : </strong>${user.following}</li>
            <li><strong>Repos : </strong>${user.public_repos}</li>
            <li><strong>Location : </strong>${user.location}</li>
        </ul>
      </div>
  `;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
      getUser(user);
      search.value = "";
  }
});