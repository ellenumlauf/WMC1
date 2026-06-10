const apiChuckUrl = "https://api.chucknorris.io/jokes/random";
const chuckwindow = document.getElementById("chuck-window");

  function loadJoke() {
    fetch(apiChuckUrl)
        .then((response) => response.json())
        .then((data) => {
            const joke = data.value;
            // Display the joke on index.html within foto
            chuckwindow.textContent =
                `!ANNOYING JOKES ARE FREE!\n${joke}`;
        })
        .catch((error) => {
            console.error("Error:", error);
             chuckwindow.textContent =
                "Please, connect to the Internet and click again to obtain the most annoying jokes ever!";
        });
  }
  loadJoke();

  // bei jedem Klick neuen Joke laden
  chuckwindow.addEventListener("click", loadJoke);
