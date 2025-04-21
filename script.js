document.addEventListener("DOMContentLoaded", () => {
  // Find the .projects_new section and its children
  const projectsSection = document.querySelector(".projects_new");
  if (!projectsSection) return;

  // The static card is the first .item_container
  const staticCard = projectsSection.querySelector(".item_container");

  fetch("projects.json")
    .then((res) => res.json())
    .then((projects) => {
      // Remove the first project if it's the static card (Student Record System)
      // to avoid duplication
      const filteredProjects = projects.filter(
        (p) => p.title.trim() !== "Student Record System"
      );

      // Insert each project as a new card after the last .item_container
      let insertAfter = staticCard;
      filteredProjects.forEach((project, idx) => {
        // Create card container
        const card = document.createElement("div");
        card.className = "item_container";
        card.innerHTML = `
          <div class="item_main">
            <div class="item_image" style="background-image: url('${
              project.thumbnail || project.image
            }');"></div>
            <div class="item_content">
              <div class="item_icon_container">
                <div class="item_icon" style="background-image: url('${
                  project.image
                }');"></div>
                <p>${project.language || project.title.split(" ")[0]}</p>
              </div>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <div class="item_buttons">
                <button class="hang-btn expand-btn" data-project-idx="${idx}">
                  Expand View
                  <img
                    src="./images/expand.png"
                    alt="expand icon"
                    style="height: 1em; width: 1em; margin-left: 0.5em; margin-bottom: 0.1em; vertical-align: middle;"
                  />
                </button>
                <a href="${
                  project.link
                }" target="_blank" class="hang-btn" style="text-decoration:none;">
                  View Project
                  <img
                    src="./images/expand.png"
                    alt="expand icon"
                    style="height: 1em; width: 1em; margin-left: 0.5em; margin-bottom: 0.1em; vertical-align: middle;"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="expand-content"></div>
        `;
        // Insert after the last inserted card
        insertAfter.parentNode.insertBefore(card, insertAfter.nextSibling);
        insertAfter = card;
      });
    })
    .catch(() => {
      // Optionally show error in projectsSection
    });

  // Expand View logic for all cards
  document.addEventListener("click", function (e) {
    // Handle dynamic expand buttons
    if (e.target.closest(".expand-btn")) {
      const btn = e.target.closest(".expand-btn");
      const card = btn.closest(".item_container");
      const expandContent = card.querySelector(".expand-content");

      if (expandContent) {
        if (!expandContent.hasChildNodes()) {
          expandContent.innerHTML = `
            <div class="github-issues-mock">
              <div class="issues-header">
                <span class="issues-title">More Details</span>
              </div>
              <div style="padding:1em 0;">More details coming soon...</div>
            </div>
          `;
          expandContent.classList.add("expanded");
          // Animate open
          expandContent.style.maxHeight = expandContent.scrollHeight + "px";
          btn.textContent = "Collapse View";
          btn.appendChild(createExpandIcon());
        } else {
          // Animate close
          expandContent.style.maxHeight = expandContent.scrollHeight + "px";
          // Force reflow to enable transition
          void expandContent.offsetWidth;
          expandContent.style.maxHeight = "0";
          expandContent.classList.remove("expanded");
          // Remove content after animation
          setTimeout(() => {
            expandContent.innerHTML = "";
          }, 400);
          btn.textContent = "Expand View";
          btn.appendChild(createExpandIcon());
        }
      }
      e.preventDefault();
      return;
    }

    // Handle static card expand/collapse
    if (e.target.closest(".hang-btn") && !e.target.closest(".expand-btn")) {
      const btn = e.target.closest(".hang-btn");
      const card = btn.closest(".item_container");
      if (card && card.parentNode === projectsSection && card === staticCard) {
        const expandContent = card.querySelector(".expand-content");

        if (expandContent) {
          if (!expandContent.hasChildNodes()) {
            // Show expanded section
            expandContent.innerHTML = `
              <div class="github-issues-mock">
                <div class="issues-header">
                  <span class="issues-title">Issues</span>
                  <span class="issues-count">3 Open</span>
                </div>
                <div class="issues-list">
                  <div class="issue-row">
                    <span class="issue-title">#1: Add user authentication</span>
                    <span class="issue-label issue-label-bug">bug</span>
                    <span class="issue-status open">Open</span>
                    <span class="issue-updated">updated 2 days ago</span>
                  </div>
                  <div class="issue-row">
                    <span class="issue-title">#2: Improve UI responsiveness</span>
                    <span class="issue-label issue-label-enhancement">enhancement</span>
                    <span class="issue-status closed">Closed</span>
                    <span class="issue-updated">updated 5 days ago</span>
                  </div>
                  <div class="issue-row">
                    <span class="issue-title">#3: Update documentation</span>
                    <span class="issue-label issue-label-docs">documentation</span>
                    <span class="issue-status open">Open</span>
                    <span class="issue-updated">updated 1 hour ago</span>
                  </div>
                </div>
              </div>
            `;
            expandContent.classList.add("expanded");
            expandContent.style.maxHeight = expandContent.scrollHeight + "px";
            btn.textContent = "Collapse View";
            btn.appendChild(createExpandIcon());
          } else {
            expandContent.style.maxHeight = expandContent.scrollHeight + "px";
            void expandContent.offsetWidth;
            expandContent.style.maxHeight = "0";
            expandContent.classList.remove("expanded");
            setTimeout(() => {
              expandContent.innerHTML = "";
            }, 400);
            btn.textContent = "Expand View";
            btn.appendChild(createExpandIcon());
          }
        }
        e.preventDefault();
      }
    }
  });

  function createExpandIcon() {
    const img = document.createElement("img");
    img.src = "./images/expand.png";
    img.alt = "expand icon";
    img.style.height = "1em";
    img.style.width = "1em";
    img.style.marginLeft = "0.5em";
    img.style.marginBottom = "0.1em";
    img.style.verticalAlign = "middle";
    return img;
  }
});
