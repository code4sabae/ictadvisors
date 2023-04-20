onload = async () => {
  inputfilter.onchange = inputfilter.onkeyup = () => {
    const key = inputfilter.value;
    let cnt = 0;
    const list = document.querySelectorAll(".advisor");
    for (const div of list) {
      let flg = false;
      if (div.innerHTML.indexOf(key) >= 0) {
        cnt++;
        flg = true;
      }
      div.style.display = flg ? "block" : "none";
    }
    filtered.textContent = `該当者：${cnt}名`;
  };

  document.querySelectorAll(".detail .body").forEach(d => {
    d.onclick = () => {
      d.classList.toggle("view");
    };
  });
};
