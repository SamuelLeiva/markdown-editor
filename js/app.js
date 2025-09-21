const editor = document.getElementById("markdown-editor");
const preview = document.getElementById("preview-content");
const generateButton = document.getElementById("generate-preview-button");

// Botón para cambiar el estilo de los encabezados
const contrastButton = document.getElementById("contrast-headings");

// Contadores de palabras y caracteres
const wordCountSpan = document.getElementById("word-count");
const charCountSpan = document.getElementById("char-count");

editor.addEventListener("input", () => {
  const text = editor.value;

  // Contar caracteres
  const charCount = text.length;

  // Contar palabras
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Actualizar contadores en la interfaz
  wordCountSpan.textContent = wordCount;
  charCountSpan.textContent = charCount;
});

// Evento al hacer clic en el botón de generar vista previa
generateButton.addEventListener("click", () => {
  const markdownText = editor.value;
  const htmlText = convertMarkdownToHTML(markdownText);
  preview.innerHTML = htmlText;
});

// Evento al hacer clic en el botón de cambiar estilo de encabezados
contrastButton.addEventListener("click", () => {
  toggleHeadingStyles(preview);
});

// Función para convertir markdown a HTML
function convertMarkdownToHTML(markdown) {
  let result = markdown;

  // Reemplazar encabezados con clases de Tailwind (o sino aparecera texto básico)
  result = result.replace(
    /^#\s(.*)$/gm,
    '<h1 class="text-3xl font-bold mt-6 mb-2">$1</h1>'
  );
  result = result.replace(
    /^##\s(.*)$/gm,
    '<h2 class="text-2xl font-bold mt-4 mb-2">$1</h2>'
  );
  result = result.replace(
    /^###\s(.*)$/gm,
    '<h3 class="text-xl font-bold mt-2 mb-1">$1</h3>'
  );

  // Reemplazar negrita(** y __) con <strong>
  result = result.replace(/\*\*(.*?)\*\*|__(.*?)__/g, "<strong>$1$2</strong>");
  // Reemplazar itálica(* y _) con <em>
  result = result.replace(/\*(.*?)\*|_(.*?)_/g, "<em>$1$2</em>");

  // Reemplazar ítems de listas individuales con etiquetas li estilizadas
  result = result.replace(/^\s*(-|\*)\s*(.*)$/gm, '<li class="my-1">$2</li>');

  // Envolver todos los ítems de listas en una etiqueta ul con sus clases
  result = result.replace(
    /(<li class="my-1">.*<\/li>(\n|$))+/gm,
    '<ul class="list-disc list-inside ml-4 my-2">$&</ul>'
  );

  return result;
}

// Función para modificar los encabezados a un estilo diferente (color y tamaño)
// Color azul y grande -> Color verde y mediano, y viceversa
function toggleHeadingStyles(container) {
  const headings = container.querySelectorAll("h1, h2, h3");
  headings.forEach((heading) => {
    // si el encabezado es azul, cambiar a verde, y viceversa
    if (heading.classList.contains("text-blue-600")) {
      heading.classList.remove("text-blue-600");
      heading.classList.add("text-green-600");
    } else {
      heading.classList.remove("text-green-600");
      heading.classList.add("text-blue-600");
    }

    // Alternar tamaños de fuente
    // Usamos toggle, esta función agrega la clase si no está, y la quita si está
    if (heading.tagName === "H1") {
      heading.classList.toggle("text-3xl");
      heading.classList.toggle("text-4xl");
    } else if (heading.tagName === "H2") {
      heading.classList.toggle("text-2xl");
      heading.classList.toggle("text-3xl");
    } else if (heading.tagName === "H3") {
      heading.classList.toggle("text-xl");
      heading.classList.toggle("text-2xl");
    }
  });
}
