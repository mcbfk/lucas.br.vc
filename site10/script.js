function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}

function addTask() {
    const titleValue = document.getElementById('task-title').value;
    const subtitleValue = document.getElementById('task-subtitle').value;
    const descriptionValue = document.getElementById('task-description').value;

    if (titleValue.trim() === "" && subtitleValue.trim() === "" && descriptionValue.trim() === "") return; 

    const li = document.createElement('li');
    li.innerHTML = `<strong>${titleValue}</strong> <br /><em>${subtitleValue}</em> <p>${descriptionValue}</p>`;

    document.getElementById('task-list').appendChild(li);
    
    // Limpar os campos após adicionar
    document.getElementById('task-title').value = ""; 
    document.getElementById('task-subtitle').value = "";
    document.getElementById('task-description').value = "";
}
