class Library {
	myLib = [
		{title: "Book1",author: "Author1"},
		{title: "Book2",author: "Author2"},
		{title: "Book3",author: "Author3"},
	]

	addBookToLibrary(book) {
		this.myLib.push(book)
	}

	createRemoveButton(index) {
		const button = document.createElement("button")
		button.textContent = "x"
		button.addEventListener("click", () => {
			const card = document.querySelector(`[data="${index}"]`)
			card.remove()
		})
		return button
	}

	createCheckbox (index) {
		const checkbox = document.createElement("input")
		checkbox.setAttribute("type", "checkbox")
		if(this.myLib[index].read == true){
			checkbox.checked = true
		}else{
			checkbox.checked = false
		}
		checkbox.addEventListener("click", () => {
			this.myLib[index].read = !this.myLib[index].read
		})
		return checkbox
	}
	createCard(title, author, index){
		const card = document.createElement("div")
		card.classList.add("card")
		const titleDiv = document.createElement("div")
		const authorDiv = document.createElement("div")
		titleDiv.textContent = title
		authorDiv.textContent = author
		card.setAttribute("data", index)
		card.appendChild(this.createRemoveButton(index))
		card.appendChild(titleDiv)
		card.appendChild(authorDiv)
	
		const checkboxLabel = document.createElement("label")
		checkboxLabel.textContent = "Read: "
		const checkboxField = document.createElement("div")
		checkboxField.appendChild(checkboxLabel)
		checkboxField.appendChild(this.createCheckbox(index))
		card.appendChild(checkboxField)
	
		return card
	}
	
	displayLib () {
		const container = document.querySelector(".lib")
		container.innerHTML = ""
		for(const book of this.myLib){
			const card = this.createCard(book.title, book.author, this.myLib.indexOf(book))
			container.appendChild(card)
		}
	}
	
	initButtons() {
		document.querySelector("#add-book-btn").addEventListener("click", () => {
			const modal = document.querySelector("#open-modal")
			modal.showModal()
		})
		
		document.querySelector("#add-book").addEventListener("click", () => {
			const title = document.querySelector("#title").value
			const author = document.querySelector("#author").value	
			const newBook = new Book(title, author)
			this.addBookToLibrary(newBook)
			this.displayLib(this.myLib)
		})
	}

}
class Book {
	constructor(title, author) {
		this.title = title;
		this.author = author;
	}
}

const library = new Library()
library.initButtons()
library.displayLib()

