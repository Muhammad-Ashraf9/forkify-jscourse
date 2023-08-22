import icons from '../../img/icons.svg';

export default class View {
  #parentElement;
  #data;
  #errorMessage;
  #successMessage;
  constructor(parentElement, errorMessage = '', successMessage = '') {
    this.#parentElement = parentElement;
    this.#errorMessage = errorMessage;
    this.#successMessage = successMessage;
  }
  set data(data) {
    this.#data = data;
  }
  get data() {
    return this.#data;
  }

  get parentElement() {
    return this.#parentElement;
  }

  get errorMessage() {
    return this.#errorMessage;
  }

  get successMessage() {
    return this.#successMessage;
  }

  render(data) {
    this.data = data;
    this.clear();
    const markup = this._generateMarkup();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(newData) {
    const currentNodesArray = Array.from(
      this.parentElement.querySelectorAll('*')
    );
    this.data = newData;
    const newMarkup = this._generateMarkup();
    const newNodesArray = Array.from(
      document
        .createRange()
        .createContextualFragment(newMarkup)
        .querySelectorAll('*')
    );
    newNodesArray.forEach((newNode, i) => {
      const currentNode = currentNodesArray[i];

      if (
        !newNode.isEqualNode(currentNode) &&
        newNode.firstChild.nodeValue.trim() !== '' //trim**
      ) {
        currentNode.textContent = newNode.textContent;
      }
      if (!newNode.isEqualNode(currentNode)) {
        const newNodesAttributesArray = Array.from(newNode.attributes);
        newNodesAttributesArray.forEach(attribute => {
          currentNode.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }
  renderErrorMessage(errorMessage = this.errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${errorMessage}</p>
  </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSuccessMessage(successMessage = this.successMessage) {
    const markup = `<div class="error">
    <div  class="message">
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${successMessage}</p>
  </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  clear() {
    this.parentElement.innerHTML = '';
  }
}
