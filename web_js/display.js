// Append one row to the table
function createRow(table, dictionary, key) {
  // Does not create a new row if it already exists
  if (document.getElementById(`row_${key}`)) {
    return;
  }
  const row = document.createElement("div");
  row.id = `row_${key}`;
  row.classList.add("row"); // class attributes, for CSS styling
  table.appendChild(row);

  // first column
  const first_col = document.createElement("div");
  first_col.innerHTML = dictionary[key][0].student_name;
  first_col.classList.add("first_col");
  row.appendChild(first_col);

  // the rest of the columns
  for (let elem of dictionary[key]) {
    const { id, drawing } = elem;
    const image_container = createImage(id, drawing);
    row.appendChild(image_container);
  }
}

function unHighLight(table) {
  for (let col of table.firstChild.childNodes) {
    col.classList.remove("highlight");
  }
}

function highLight(table, row_id, image_id) {
  const row = document.getElementById(`row_${row_id}`);
  // Move the row to the top
  table.removeChild(row);
  table.prepend(row);

  // Add style to the image
  const image = document.getElementById(`image_container_${image_id}`);
  image.classList.add("highlight");
}

function createImage(id, title) {
  const image_container = document.createElement("div");
  // Styling, wrap all images in a white background
  image_container.classList.add("image_container");
  image_container.id = `image_container_${id}`;

  const title_name = document.createElement("div");
  title_name.innerHTML = title;
  image_container.appendChild(title_name);

  const img = document.createElement("img");
  img.src = `../data/dataset/img/${id}.png`;
  img.classList.add("thumbnail");
  image_container.appendChild(img);

  return image_container;
}
