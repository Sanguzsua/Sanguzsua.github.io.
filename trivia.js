document.getElementById("obtenerPregunta").addEventListener("click", async () => {
    const url = "https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple"; // Solo trae 1 pregunta

    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    const preguntaInfo = datos.results[0];

    document.getElementById("pregunta").innerHTML = preguntaInfo.question; // Mostrar la pregunta
    document.getElementById("pregunta-container").style.display = "block"; // Hacer visible el contenedor

    const opciones = [...preguntaInfo.incorrect_answers, preguntaInfo.correct_answer].sort(() => Math.random() - 0.5);

    const opcionesHTML = opciones.map(opcion => 
        `<button class="opcion">${opcion}</button>`).join(""); // Crear botones de respuesta

    document.getElementById("opciones").innerHTML = opcionesHTML;

    document.querySelectorAll(".opcion").forEach(boton => {
        boton.addEventListener("click", () => {
            if (boton.textContent === preguntaInfo.correct_answer) {
                document.getElementById("resultado").textContent = "✅ ¡Correcto!";
                boton.style.backgroundColor = "green";
            } else {
                document.getElementById("resultado").textContent = "❌ Incorrecto";
                boton.style.backgroundColor = "red";
            }
        });
    });
});
