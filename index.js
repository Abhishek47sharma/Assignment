
const form = document.querySelector("form");
const input = document.querySelector("input")
const reposContainer = document.querySelector(".container");
const mainContainer = document.querySelector(".header")
const API = "https://api.github.com/users/"

async function fetchdata(username){
 try {
  const response = await fetch(`${API}${username}`);
    if (!response.ok) throw new Error(response.statusText);
    
    const {
      avatar_url,
      location,
      login,
      twitter_username,
    } = await response.json();

    const html = `
    <div class="profile-photo">
            <img src="${avatar_url}" alt="">
        </div>
 
        <div class="profile">
            <h1>${login}</h1>
            <div class="location">
                <img src="./resources/gps.png" alt="">
                <span>${location}</span>
            </div>
            <p>Twitter: ${twitter_username}</p>
        </div>
        
    
    `
    
    const section = document.createElement("section");
    section.classList.add("about-user");
    section.innerHTML = html;
    mainContainer.insertAdjacentElement("afterbegin", section);
    document.getElementById("head").style.display = "none"

 } catch (error) {
  console.error(error)
 }
}

async function fetchRepos(username) {
  try {
    const response = await fetch(`${API}${username}/subscriptions`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    console.log(data)
    data.forEach(
      ({
        name,
        description,
        language,
        
      }) => {


        const singleElement = document.createElement("div");
        singleElement.classList.add("repo-card");
        const html = `
        <div class="repo">
        <div class="repo-content">

            <div class="title">
                <h1>
                    ${name}
                </h1>
            </div>
            <div class="desc">${description}</div>
            <div class="topics">
                <div class="topic">${language}</div>
                <div class="topic">CSS</div>
                <div class="topic">javascript</div>
                
            </div>
        </div>
    </div>
        `;
        singleElement.innerHTML = html;
        reposContainer.append(singleElement);
      }
    );
  } catch (error) {
    console.error(error);
  }
}



form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const val = input.value;

  if (val) {
    try {
      await fetchdata(val);
      console.log("fetching data")
      await fetchRepos(val);
    } catch (error) {
      console.log(error);
    } 
  }

  document
    .querySelector("input")
    .addEventListener("click", () => location.reload());
});


