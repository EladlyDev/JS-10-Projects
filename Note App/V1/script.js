//App Constructor
class NoteApp {
    constructor() {
        let notesData = [];
        this.customizeStorage();
        this.showNotes(notesData);
    }

    reset() {

    }

    addNote(storage, callback) {
        const noteTitle = noteTextElementTitle.value;
        const noteText = noteTextElementText.value;
        const noteId = Math.floor(Math.random() * 10000);
        class Note {
            constructor(noteId, NoteTitle, noteText) {
                this.id = noteId
                this.title = NoteTitle;
                this.text = noteText;
            }
        }

        const note = new Note(noteId, noteTitle, noteText);
        storage(note)
        callback(note)
    }

    showNotes(noteData) {

    }

    customizeStorage(noteData) {
        noteData ? this.notesData.push(noteData) : null;

        if (localStorage.getItem('notes')) {
            let notesFS = JSON.parse(localStorage.getItem('notes'));
            if (this.notesData.length > 0) {
                //Arr notes is NOT empty
                notesFS = notesFS.concat(this.notesData);
                this.notesData = notesFS;
                localStorage.setItem('notes', JSON.stringify(notesFS))
            } else {
                //Arr notes's EMPTY
                this.notesData = notesFS;
            }
        } else {
            localStorage.setItem('notes', JSON.stringify(this.notesData))
        }

    }

    popup(open = false) {
        if (open) {
            popupContainerELement.classList.add('open-popup');
            console.log('hi')
        } else {
            popupContainerELement.classList.remove('open-popup');
        }
    }
}

//elementResources
const addNoteBtns = document.querySelectorAll('[data-addNote]');
const notesContainerElement = document.querySelectorAll('[data-notesContainer]');
const popupContainerELement = document.querySelector('[data-popup="container"]')
const popupELement = document.querySelector('[data-popup="popup"]')
const popupCloseElement = document.querySelector('[data-popup="close"]')
const noteTextElementTitle = document.querySelector('[data-note="title"]')
const noteTextElementText = document.querySelector('[data-note="text"]')
const noteSaveBtn = document.querySelector('[data-note="save"]')


//Creating the app
const noteApp = new NoteApp();

// Customize the popup
addNoteBtns.forEach((e) => {
    e.addEventListener('click', function () {
        noteApp.popup(true)
    })
})

popupCloseElement.addEventListener('click', () => {
    noteApp.popup(false)
})

//on saving the note
noteSaveBtn.addEventListener('click', () => {
    noteApp.addNote(noteApp.customizeStorage, noteApp.showNotes);
    noteApp.popup(false);
    noteTextElementTitle.value = '';
    noteTextElementText.value = '';
})