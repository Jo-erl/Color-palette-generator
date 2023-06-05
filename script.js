const colorInput = document.getElementById("base-color");
const categorySelect = document.getElementById("category-select");
const generateButton = document.getElementById("generate-button");
const colorSchemeDiv = document.getElementById("color-scheme");

let colorArr = [];

window.addEventListener("load", () => {
  colorInput.value = "#c20084"; // Set initial color to red
  categorySelect.value = "monochrome"; // Set category to monochrome
  generateButton.click(); // Trigger the generateButton click event to generate the color palette
});

generateButton.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorInput.value.replace(
      "#",
      ""
    )}&format=json&mode=${categorySelect.value}&count=6`
  )
    .then((res) => res.json())
    .then((data) => {
      colorArr = data.colors.map((color) => color.hex.value);
      renderColors();
    });
});

function renderColors() {
  let html = "";

  colorArr.forEach((color) => {
    html += `<div style="background-color:${color};" class="color"><p data-color="${color}" class="color-value">${color}<span class="copy-message">Copy to clipboard</span></p></div>`;
  });

  colorSchemeDiv.innerHTML = html;

  const colorValues = document.querySelectorAll("#color-scheme .color-value");

  colorValues.forEach((value) => {
    value.addEventListener("click", () => {
      const textArea = document.createElement("textarea");
      textArea.value = value.dataset.color;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast();
    });

    value.addEventListener("mouseenter", () => {
      const copyMessage = value.querySelector(".copy-message");
      copyMessage.style.opacity = "1";
    });

    value.addEventListener("mouseleave", () => {
      const copyMessage = value.querySelector(".copy-message");
      copyMessage.style.opacity = "0";
    });
  });
}

const tipsButton = document.getElementById("generate-tip");
const tipsContainer = document.getElementById("tips-container");

tipsButton.addEventListener("click", () => {
  tipsContainer.style.display = "block";
});

document.addEventListener("click", (event) => {
  if (!tipsContainer.contains(event.target) && event.target !== tipsButton) {
    tipsContainer.style.display = "none";
  }
});

function showToast() {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = "Copied to clipboard!";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}
