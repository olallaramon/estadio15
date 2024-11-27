document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("stadiumCanvas");
    const addElementButton = document.getElementById("addElement");
    const generateButton = document.getElementById("generateStadium");
    const colorPicker = document.getElementById("colorPicker");

    // Agregar elemento al estadio
    addElementButton.addEventListener("click", () => {
        const element = document.createElement("div");
        element.classList.add("element");
        element.style.width = "100px";
        element.style.height = "50px";
        element.style.backgroundColor = colorPicker.value;
        element.textContent = "Grada";
        element.draggable = true;
        enableDrag(element);
        canvas.appendChild(element);
    });

    // Rotar elementos
    function enableDrag(element) {
        element.addEventListener("mousedown", (e) => {
            let shiftX = e.clientX - element.getBoundingClientRect().left;
            let shiftY = e.clientY - element.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                element.style.left = pageX - shiftX + "px";
                element.style.top = pageY - shiftY + "px";
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            element.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", onMouseMove);
            });

            element.ondragstart = () => false;
        });

        // Rotación con tecla Shift
        element.addEventListener("dblclick", () => {
            const currentRotation =
                parseInt(element.dataset.rotation || "0", 10) + 15;
            element.style.transform = `rotate(${currentRotation}deg)`;
            element.dataset.rotation = currentRotation;
        });
    }

    // Generar estadio predeterminado
    generateButton.addEventListener("click", () => {
        canvas.innerHTML = ""; // Limpiar canvas
        const field = document.createElement("div");
        field.classList.add("field");
        canvas.appendChild(field);

        const predefinedElements = [
            { type: "Grada", x: 50, y: 100, color: "#cccccc", width: 200, height: 100 },
            { type: "VIP", x: 300, y: 50, color: "#f4d03f", width: 150, height: 50 },
            { type: "Prensa", x: 300, y: 500, color: "#95a5a6", width: 150, height: 50 },
        ];

        predefinedElements.forEach((el) => {
            const element = document.createElement("div");
            element.classList.add("element");
            element.style.width = el.width + "px";
            element.style.height = el.height + "px";
            element.style.left = el.x + "px";
            element.style.top = el.y + "px";
            element.style.backgroundColor = el.color;
            element.textContent = el.type;
            enableDrag(element);
            canvas.appendChild(element);
        });
    });
});

