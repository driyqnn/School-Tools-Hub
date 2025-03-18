fetch("../nav/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });

fetch("../nav/footer.css")
  .then((response) => response.text())
  .then((data) => {
    const style = document.createElement("style");
    style.textContent = data;
    document.head.appendChild(style);
  });
