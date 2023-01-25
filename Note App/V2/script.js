let notesArr = [];
let rowsArr = []
let smallScreens = window.matchMedia('(max-width: 550px)');

class App {
    constructor() {
    }
    reset() {
        noteOriginElementBody.value = '';
        noteOriginElementTitle.value = '';
        notesArr = [];
        rowsArr = [];
        this.setStorage();
    }
    addNote() {
        const title = noteOriginElementTitle.value;
        const body = noteOriginElementBody.value;
        const id = Math.floor(Math.random() * 100000);
        const noteObj = {
            title,
            body,
            id
        };
        return noteObj;
    }
    setStorage(dataObj) {
        if (dataObj) { notesArr.push(dataObj) };

        if (localStorage.getItem('notesData')) {//if there is items in storage
            //get that item and save it
            let storageNotesData = JSON.parse(localStorage.getItem('notesData'));

            if (notesArr.length > 0) { // if there is items in array
                //get that item and marge it with storage's item
                // notesArr = notesArr.concat(storageNotesData);
                storageNotesData = notesArr;
                localStorage.setItem('notesData', JSON.stringify(storageNotesData));
            } else { // if there is no items in the array
                //marge the storage's items into the array
                storageNotesData = storageNotesData.concat(notesArr);
                notesArr = storageNotesData.concat(notesArr);
                localStorage.setItem('notesData', JSON.stringify(storageNotesData));
            }

        } else {//if there is not items in the storage
            //set new item and add the array whatever it is empty or not
            localStorage.setItem('notesData', JSON.stringify(notesArr));
        }
    }

    updateStorage(notesArr) {
        localStorage.setItem('notesData', JSON.stringify(notesArr || []));
    }

    openPopup() {
        popupParentElement.classList.toggle('close');
    }

    closePopup() {
        popupParentElement.classList.add('close');
        noteOriginElementTitle.value = '';
        noteOriginElementBody.value = '';
    }
    menuToggle() {
        mainAsideElement.classList.toggle('collapse');
        mainSectionElement.classList.toggle('big');
    }

    //Output functions
    setRowsStorage(rows) {
        // if (localStorage.getItem('rows')) {
        //     let storageRows = JSON.parse(localStorage.getItem('rows'));
        //     rowsArr = storageRows;
        // } else {
        //     rows.forEach((row, ind) => {
        //         rowsArr.push({ row: +row.dataset.noteRow, id: ind, next: false, notes: 0 })
        //     })
        //     localStorage.setItem('rows', JSON.stringify(rowsArr));
        // }

        rows.forEach((row, ind) => {
            rowsArr.push({ row: +row.dataset.noteRow, id: ind, next: false, notes: 0 })
        })
        rowsArr[0].next = true;
    }


    resetRows(rows) {
        rows.forEach((row) => {
            row.innerHTML = ''
        })
    }

    getCurrenRow() {
        let currentRow =
            rowsArr.find((value, ind) => {
                return value.next == true;
            })
        const currentRowInd = currentRow.id;
        currentRow.next = false;
        currentRow.notes += 1;
        rowsArr[currentRowInd] = currentRow;
        if (currentRowInd === rowsArr.length - 1) {
            rowsArr[0].next = true;
        } else {
            rowsArr[currentRowInd + 1].next = true;
        }
        return currentRow
    }

    showNotes(currentNote) {

        let rowELement;

        let firstRowcheck;
        if (smallScreens.matches) {
            rowELement = noteRows[0];
            firstRowcheck = rowELement.children[0] ? rowELement.children[0].classList.contains('note-card-add') : null;
        } else {
            let currentRow = this.getCurrenRow();
            rowELement = noteRows[currentRow.id];
            //quic check to detremine if there's a plus btn to remove
            firstRowcheck = rowELement.children[0] ? rowELement.children[0].classList.contains('note-card-add') : null;
        }

        if (firstRowcheck) {
            rowELement.innerHTML = `
            <div data-note-id = '${currentNote.id}' class="note-card note-card-note">
                <div class="note-header">
                    <i class="fa-regular fa-circle-check note-check"></i>
                    <i class="fa-solid fa-thumbtack note-pin"></i>
                </div>
                <div class="note-body">
                    <strong>${currentNote.title}</strong><br>
                    ${currentNote.body}
                </div>
                <div class="note-footer">
                    <i data-note-btn = 'edit' class="fa-solid fa-pen-to-square note-edit"></i>
                    <i data-note-btn = 'delete' class="fa-solid fa-trash note-delete"></i>
                    <i data-note-btn = 'share' data-note-btn = 'edit'i class="fa-sharp fa-solid fa-share-nodes note-share"></i>
                </div>
            </div>
            `
        } else {
            rowELement.innerHTML += `
            <div data-note-id = '${currentNote.id}' class="note-card note-card-note">
                <div class="note-header">
                    <i class="fa-regular fa-circle-check note-check"></i>
                    <i class="fa-solid fa-thumbtack note-pin"></i>
                </div>
                <div class="note-body">
                    <strong>${currentNote.title}</strong><br>
                    ${currentNote.body}
                </div>
                <div class="note-footer">
                <i data-note-btn = 'edit' class="fa-solid fa-pen-to-square note-edit"></i>
                <i data-note-btn = 'delete' class="fa-solid fa-trash note-delete"></i>
                <i data-note-btn = 'share' data-note-btn = 'edit'i class="fa-sharp fa-solid fa-share-nodes note-share"></i>
                </div>
            </div>
            `
        }
    }

    //delete note
    deleteNote(noteId) {
        console.log({ notesArr })

        notesArr = notesArr.filter((note) => {
            return note.id != noteId
        });
        console.log({ notesArr })
        this.updateStorage(notesArr)
        console.log({ notesArr })

    }
}

//refrences
const addNoteBtns = document.querySelectorAll('[data-note-add]');
const popupParentElement = document.querySelector('[data-popup="parent"]');
const menuToggleBtn = document.querySelector('[data-menu-toggle]');
const mainAsideElement = document.querySelector('[data-aside]')
const mainSectionElement = document.querySelector('[data-section]')
const noteOriginElementTitle = document.querySelector('[data-note-origin="title"]')
const noteOriginElementBody = document.querySelector('[data-note-origin="body"]')
const popupSaveNoteBtn = document.querySelector('[data-popup="saveNote"]')
//alert
const alertWarrning = document.querySelector('[data-popup="alert-parent-warrning"]')
//output
const noteRows = document.querySelectorAll('[data-note-row]')


//Notes App
const noteApp = new App();

//basic actions - Open, Close Popup & menu bar.
addNoteBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        noteApp.openPopup();
    })
})

popupParentElement.addEventListener('click', e => {
    const elementData = e.target.dataset.popup;
    if (elementData === 'parent') {
        popupParentElement.classList.add('close');
    } else if (elementData === 'close') {
        noteApp.closePopup();
    }
})

menuToggleBtn.addEventListener('click', function () {
    noteApp.menuToggle()
})

//On saving note
popupSaveNoteBtn.addEventListener('click', () => {
    const note = noteApp.addNote();
    noteApp.setStorage(note)
    noteApp.showNotes(note);
    noteApp.closePopup();
})

//on page load
window.addEventListener('load', () => {
    noteApp.reset()
    noteApp.setRowsStorage(noteRows)
    notesArr.map((note) => {
        noteApp.showNotes(note)
    })
})

window.addEventListener('resize', () => {
    if (notesArr.length > 0) {
        smallScreens = window.matchMedia('(max-width: 550px)')
        noteApp.reset()
        noteApp.resetRows(noteRows);
        noteApp.setRowsStorage(noteRows)
        notesArr.map((note) => {
            noteApp.showNotes(note)
        })

    }
})


// localStorage.clear()

window.addEventListener('click', e => {
    console.log(e.target)
    const noteBtn = e.target.dataset.noteBtn ? e.target.dataset.noteBtn : null;
    const noteId = e.target.parentNode.parentNode.dataset.noteId ? +e.target.parentNode.parentNode.dataset.noteId : null;
    switch (noteBtn) {
        case 'delete':
            alertWarrning.classList.remove('close')
            alertWarrning.addEventListener('click', (e) => {
                const userResponse = e.target.dataset.alertResponse ? e.target.dataset.alertResponse : null;
                if (userResponse == 'true') {
                    noteApp.deleteNote(noteId);
                    noteApp.reset()
                    noteApp.resetRows(noteRows);
                    noteApp.setRowsStorage(noteRows)
                    notesArr.map((note) => {
                        noteApp.showNotes(note)
                    })
                }
                alertWarrning.classList.add('close')
            })
            break;
        case 'share':
            console.log('share');
            break;
        case 'edit':
            console.log('edit');
            break;
    }

})