// Append one row to the table
function createRow(table, first_column_value, array){
    const row = document.createElement('div');
    row.classList.add('row'); // class attributes, for CSS styling
    table.appendChild(row);

    // first column
    const first_col = document.createElement('div');
    first_col.innerHTML = first_column_value; // student name
    first_col.classList.add('first_col'); 
    row.appendChild(first_col);

    // the rest of the columns
    for(let elem of array){
        const {id, drawing} = elem;
        // wrap all images in a white background
        const image_container = document.createElement('div');
        image_container.classList.add('image_container');
        image_container.id = `image_container_${id}`;

        const drawing_name = document.createElement('div');
        drawing_name.innerHTML = drawing;
        image_container.appendChild(drawing_name);
        
        // each column is an image
        const img = document.createElement('img');
        img.src = `../data/dataset/img/${id}.png`;
        img.classList.add('thumbnail');

        image_container.appendChild(img);
        row.appendChild(image_container);
    }
}