let rowsArrT = [];
let currentRow;

rowsEle = ['row1', 'row2', 'row3', 'row4']

function setRows(rows) {
    rows.forEach((row, ind) => {
        rowsArrT.push({ row, id: ind, next: false, notes: 0 })
    });
    rowsArrT[0].next = true;
    localStorage.setItem('TestRows', JSON.stringify(rowsArr));

}
function getCurrentRow() {
    console.log(notesArrT)
    rowsArrT.map((row, ind) => {
        if (row.next === true) {
            console.log(row)
            currentRow = row;
            rowsArrT[ind].next = false;
            if (ind !== rowsArrT.length - 1) {
                rowsArrT[ind + 1].next = true;
            } else {
                rowsArrT[0].next = true;
            }
        }
    })
}

setRows(rowsEle)

window.addEventListener('click', () => {
    getCurrentRow()
    console.log('-----After generate-----')
    console.log(currentRow)
    console.log(rowsArrT)

})