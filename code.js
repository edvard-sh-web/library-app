const myLib = [
	{title: "Book1",author: "Author1"},
	{title: "Book2",author: "Author2"},
	{title: "Book3",author: "Author3"},
];

function Book (title, author) {
	this.title = title
	this.author = author
}

function addBookToLibrary(book) {
	myLib.push(book)
}

function createRemoveButton(index) {
	const button = document.createElement("button")
	button.textContent = "x"
	button.addEventListener("click", () => {
		const card = document.querySelector(`[data="${index}"]`)
		card.remove()
	})
	return button
}

function createCheckbox (index) {
	const checkbox = document.createElement("input")
	checkbox.setAttribute("type", "checkbox")
	if(myLib[index].read == true){
		checkbox.checked = true
	}else{
		checkbox.checked = false
	}
	checkbox.addEventListener("click", () => {
		myLib[index].read = !myLib[index].read
	})
	return checkbox
}
function createCard(title, author, index){
	const card = document.createElement("div")
	card.classList.add("card")
	const titleDiv = document.createElement("div")
	const authorDiv = document.createElement("div")
	titleDiv.textContent = title
	authorDiv.textContent = author
	card.setAttribute("data", index)
	card.appendChild(createRemoveButton(index))
	card.appendChild(titleDiv)
	card.appendChild(authorDiv)

	const checkboxLabel = document.createElement("label")
	checkboxLabel.textContent = "Read: "
	const checkboxField = document.createElement("div")
	checkboxField.appendChild(checkboxLabel)
	checkboxField.appendChild(createCheckbox(index))
	card.appendChild(checkboxField)

	return card
}

function displayLib (lib) {
	const container = document.querySelector(".lib")
	container.innerHTML = ""
	for(const book of lib){
		const card = createCard(book.title, book.author, lib.indexOf(book))
		container.appendChild(card)
	}
}

document.querySelector("#add-book-btn").addEventListener("click", () => {
	const modal = document.querySelector("#open-modal")
	modal.showModal()
})

document.querySelector("#add-book").addEventListener("click", () => {
	const title = document.querySelector("#title").value
	const author = document.querySelector("#author").value	
	const newBook = {title, author}
	addBookToLibrary(newBook)
	displayLib(myLib)
})

displayLib(myLib)