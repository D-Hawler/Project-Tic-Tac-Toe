fetch('dialogWindow.html')
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    createColorGrid();
    isPlayerNumber();
});

function createColorGrid() {
    const colors = [
        "#D32F2F", // насыщенно-красный
        "#F57C00", // насыщенно-оранжевый
        "#FBC02D", // насыщенно-желтый
        "#F9A825", // золотисто-желтый

        "#AEEA00", // ярко-лаймовый
        "#388E3C", // насыщенно-зеленый
        "#43A047", // зеленый
        "#00BFAE", // бирюзовый

        "#00B8D4", // голубой
        "#1976D2", // насыщенно-синий
        "#1565C0", // синий
        "#283593", // сине-фиолетовый

        "#512DA8", // фиолетовый
        "#7B1FA2", // пурпурно-фиолетовый
        "#C2185B", // насыщенно-розовый
        "#D81B60"  // розово-фиолетовый
    ];

    const colorGrid = document.querySelector("#colorGrid");
    for (let i = 0; i < 16; i++) {
        const colorBlock = document.createElement("div");
        colorBlock.style.backgroundColor = colors[i];
        colorGrid.appendChild(colorBlock);
    }

    const getElementColorGrid = colorGrid.querySelectorAll("div");
    const namePlaer = document.querySelector("#name");
    getElementColorGrid.forEach(block => {
        block.addEventListener("click", function() {
            namePlaer.style.color = block.style.backgroundColor;
        });
    });
}

function isPlayerNumber() {
    const playerPlaceholder = ["player one", "player two"];
    let playerOne = false;


    if (playerOne === false) {
        document.querySelector("#dialogForCreatePlayer h1").textContent = playerPlaceholder[0].charAt(0).toUpperCase() + playerPlaceholder[0].slice(1);
        document.querySelector("#dialogForCreatePlayer label").textContent = `Enter ${playerPlaceholder[0]}'s name:`;

        playerOne = true;
    } else {
        document.querySelector("#dialogForCreatePlayer h1").textContent = playerPlaceholder[1].charAt(0).toUpperCase() + playerPlaceholder[1].slice(1);
        document.querySelector("#dialogForCreatePlayer label").textContent = `Enter ${playerPlaceholder[1]}'s name:`;
    };
};






 
document.querySelector("#startGame").addEventListener("click", function() {
    document.getElementById("dialogForCreatePlayer").showModal();

    const namePlaer = document.querySelector("#name");
    document.getElementById("create").addEventListener("click", function(event) {
        event.preventDefault();
        if (namePlaer.value !== "" && namePlaer.value.length >= 3) {
            
        };
    });
});