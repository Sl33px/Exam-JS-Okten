const f1 = document.forms.f1 // get form from html
const container = document.getElementById('containerWithCheckBox') // get container, where will be our list
let listOfItems = []; // there wil be objects NAME/VALUE pair

const sortByNameBtn = document.getElementById('sortByNameBtn')
const sortByValueBtn = document.getElementById('sortByValueBtn')
const deleteItemsBtn =  document.getElementById('deleteItemsBtn')

f1.addEventListener('submit', e => {
    e.preventDefault()

    const item = f1.item.value.trim(); // get item after submit button was clicked

    // if item hasn't equal sign -> error
    if (item.includes(' = ')) {
        const parts = item.split('=')
        const name = parts[0].trim().replaceAll(' ', '')
        const value = parts[1].trim().replaceAll(' ', '')

        // check if name and value has only letters and numbers
        const isValid = /^[a-zA-Z0-9]+$/.test(name) && /^[a-zA-Z0-9]+$/.test(value)

        if (isValid) {
            const itemObj = { name, value }
            listOfItems.push(itemObj)
        } else {
            alert('Name and Value can contain only letters and numbers!')
        }

    } else {
        if (item.length > 1) {
            alert('There is no equal sign or spaces around it, please try again.')
        } else {
            alert('Sorry, you didn\'t fill the input.')
        }
    }

    renderInfo(listOfItems)
    f1.item.value = '' // after all manipulations with input, we clear field
})

// render info on page
function renderInfo(arr) {
    container.innerHTML = ''

    for (const el of arr) {
        const option = document.createElement('option')
        option.textContent = `${el.name} ${el.value}`
        option.value = `${el.name} ${el.value}`
        container.appendChild(option)
    }
}

// process sorting by name button
sortByNameBtn.onclick = () => {
    const sortedItemsByNameArr = listOfItems.sort((a, b) => a.name.localeCompare(b.name))
    renderInfo(sortedItemsByNameArr)
}

// process sorting by value button
sortByValueBtn.onclick = () => {
    const sortedByValueArr = listOfItems.sort((a, b) => a.value.localeCompare(b.value))
    renderInfo(sortedByValueArr)
}

// process deleting one or multiple items
deleteItemsBtn.onclick = () => {
    const selectedValuesArr = Array.from(container.options)
        .filter(option => option.selected)
        .map(option => option.value)

    let arrAfterDeleteItems = listOfItems.filter(item => {
        const pair = `${item.name} ${item.value}`
        return !selectedValuesArr.includes(pair)
    })

    // update list of items
    listOfItems = arrAfterDeleteItems
    renderInfo(arrAfterDeleteItems)
}