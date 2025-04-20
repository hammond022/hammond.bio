document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projects-container");
  if (!container) return;

  fetch("projects.json")
    .then((res) => res.json())
    .then((projects) => {
      container.innerHTML = "";
      projects.forEach((project) => {
        const entry = document.createElement("a");
        entry.href = project.link || "#";
        entry.target = "_blank";
        entry.innerHTML = `
          <div class="wall_entry pulse">
            <img class="wall_pfp" src="${project.image}" alt="project image" />
            <div class="wall_text">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>
          </div>
        `;
        container.appendChild(entry);
      });

      // Add 3 placeholders
      for (let i = 0; i < 3; i++) {
        const placeholder = document.createElement("div");
        placeholder.className = "wall_entry half emtpy";
        placeholder.innerHTML = `
          <img class="wall_pfp hidden" src="./images/user.png" alt="user pfp" />
          <div class="wall_text">
            <h3 class="empty">Nothing here yet.</h3>
            <p class="hidden">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed
              libero voluptas neque et corrupti itaque sapiente ipsum nostrum
              ducimus. Repellat fugiat ad id nostrum. Facilis consequatur
              voluptate exercitationem odit amet!
            </p>
          </div>
        `;
        container.appendChild(placeholder);
      }
    })
    .catch(() => {
      container.innerHTML = "<p>Unable to load projects.</p>";
    });
});
