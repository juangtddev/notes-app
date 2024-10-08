
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".create-btn");

// Function to display saved notes from localStorage
function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
        attachEventListeners(); // Reattach listeners to newly displayed notes
    }
}

// Function to update localStorage with the current content
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create a new note with a delete option
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    let img = document.createElement("img");
    img.src = "/assets/images/delete.png";
    img.className = "delete-btn"; // Added a class for easier selection

    // Append delete button to the new note
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    // Add keyup listener to save changes
    attachNoteListeners(inputBox);

    // Update storage immediately after creating a new note
    updateStorage();
});

// Function that adds listeners to a specific note
function attachNoteListeners(note) {
    note.addEventListener("keyup", updateStorage);

    const deleteBtn = note.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        note.remove();
        updateStorage();
    });
}

// Function to add listeners to all notes after displaying them
function attachEventListeners() {
    const notes = document.querySelectorAll(".input-box");
    notes.forEach(note => attachNoteListeners(note));
}

// Prevent creating new paragraphs on "Enter" and insert line breaks instead
document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        document.execCommand("insertLineBreak");
    }
});

// Display saved notes when the page loads
showNotes();
