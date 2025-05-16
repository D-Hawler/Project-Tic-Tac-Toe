document.querySelector("#startGame").addEventListener("click", function() {
    console.log("Game started!");

    createPlayer();
});

function createPlayer() {
    document.getElementById("dialogForCreatePlayer").showModal();

    const namePlaer = document.querySelector("#name");
    document.getElementById("create").addEventListener("click", function(event) {
        event.preventDefault()

        if (namePlaer.value !== "" && namePlaer.value.length >= 3) {
            console.log("Yes");
        };
    });
};