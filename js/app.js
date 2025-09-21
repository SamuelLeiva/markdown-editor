const editor = document.getElementById("markdown-editor");
const preview = document.getElementById("preview-content");
const generateButton = document.getElementById("generate-preview-button");

// Evento al hacer clic en el botón de generar vista previa
generateButton.addEventListener("click", () => {
  const markdownText = editor.value;
  const htmlText = convertMarkdownToHTML(markdownText);
  preview.innerHTML = htmlText;
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

  // Reemplazar ítems de listas individuales con etiquetas li estilizadas
  result = result.replace(/^\s*(-|\*)\s*(.*)$/gm, '<li class="my-1">$2</li>');

  // Envolver todos los ítems de listas en una etiqueta ul con sus clases
  result = result.replace(
    /(<li class="my-1">.*<\/li>(\n|$))+/gm,
    '<ul class="list-disc list-inside ml-4 my-2">$&</ul>'
  );

  return result;
}
