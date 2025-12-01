// SEARCH INPUT → GO TO FEED WITH FADE OUT
const input = document.getElementById("searchInput");

if (input) {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const query = input.value.trim();

      // start fade-out
      document.body.classList.add("page-fade-out");

      // after the fade duration, navigate to feed page
      setTimeout(() => {
        // if you want to pass the artist name:
        window.location.href =
          "feed.html?search=" + encodeURIComponent(query || "feed");
      }, 1000); // must match CSS transition time (0.6s)
    }
  });
}

// TYPEWRITER ON OVERRIDE TEXT (FEED PAGE ONLY)
const textEl = document.getElementById("overrideText");

if (textEl) {
  const fullText = textEl.textContent.trim();
  let typingIndex = 0;
  let hasTyped = false;

  textEl.textContent = ""; // clear text

  function typeWriter() {
    if (typingIndex < fullText.length) {
      textEl.textContent += fullText.charAt(typingIndex);
      typingIndex++;
      setTimeout(typeWriter, 35); // speed of typing
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTyped) {
          hasTyped = true;
          textEl.classList.add("typing");
          typeWriter();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(textEl);
}
// SIMPLE CURSOR TRAIL SQUARES
document.addEventListener("mousemove", (e) => {
  const square = document.createElement("div");
  square.classList.add("cursor-square");

  square.style.left = e.clientX + "px";
  square.style.top = e.clientY + "px";

  document.body.appendChild(square);

  // Fade + remove smoothly
  setTimeout(() => {
    square.style.opacity = "0";
    setTimeout(() => {
      square.remove();
    }, 200); // remove after fade
  }, 160);
});
// FADE IN ON FEED PAGE
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("feed-page")) {
    // trigger the fade-in
    requestAnimationFrame(() => {
      document.body.classList.add("page-loaded");
    });
  }
});
// ================= WARNING POPUP (FEED PAGE) =================
const warningOverlay = document.getElementById("warningOverlay");
const warningBtn = document.getElementById("warningContinue");

if (warningOverlay && warningBtn) {
  warningBtn.addEventListener("click", () => {
    warningOverlay.classList.add("hidden");
  });

  // Prevent closing when clicking outside
  warningOverlay.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}
const adOverlay = document.getElementById("adOverlay");
const adCloseBtn = document.querySelector(".ad-close");

let adShown = false;

function showAdIfScrolled() {
  if (adShown || !adOverlay) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (docHeight <= 0) return;

  const scrolledPercent = scrollTop / docHeight; // 0–1

  if (scrolledPercent >= 0.8) {
    adOverlay.classList.remove("hidden");
    adShown = true;
  }
}

window.addEventListener("scroll", showAdIfScrolled);

// close when clicking X
if (adCloseBtn) {
  adCloseBtn.addEventListener("click", () => {
    adOverlay.classList.add("hidden");
  });
}
