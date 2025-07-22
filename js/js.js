console.clear();

const sliderProps = {
  fill: "#0B1EDF",
  background: "rgba(255, 255, 255, 0.214)"
};

const slider = document.querySelector(".range__slider");
const sliderValue = document.querySelector(".length__title");
slider.querySelector("input").addEventListener("input", e => {
  sliderValue.setAttribute("data-length", e.target.value);
  applyFill(e.target);
});
applyFill(slider.querySelector("input"));

function applyFill(slider) {
  const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage + 0.1}%)`;
  slider.style.background = bg;
  sliderValue.setAttribute("data-length", slider.value);
}

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("slider");
const copyBtn = document.getElementById("copy-btn");
const generateBtn = document.getElementById("generate");

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");

const copiedText = document.getElementById("copied");

const randomFunc = {
  lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  number: () => String.fromCharCode(Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % 10) + 48),
  symbol: () => "~!@#$%^&*()_+=-{}[]|:;<>?,./".charAt(Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % 28))
};

generateBtn.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
});

copyBtn.addEventListener("click", () => {
  const password = resultEl.innerText;
  if (!password || password === "CLICK GENERATE") return;

  navigator.clipboard.writeText(password);
  copiedText.classList.remove("hidden");
  setTimeout(() => copiedText.classList.add("hidden"), 2000);
});

function generatePassword(length, lower, upper, number, symbol) {
  let generatedPassword = "";
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  if (typesArr.length === 0) return "";

  for (let i = 0; i < length; i++) {
    const funcName = Object.keys(typesArr[i % typesArr.length])[0];
    generatedPassword += randomFunc[funcName]();
  }

  return generatedPassword;
}
