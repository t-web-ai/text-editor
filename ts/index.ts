class TextEditor {
    #content: string;
    #state: number;
    #history: TextString[];
    public constructor() {
        this.#content = "";
        this.#state = 1;
        this.#history = [new TextString("")];
    }
    public getContent(): string {
        return this.#content;
    }
    public setContent(content: string): void {
        this.#content = content;
        this.#history[this.#state++] = new TextString(content);
    }
    public undoContent(): void {
        if (this.#state - 2 >= 0) {
            this.#state = this.#state - 1;
            this.#history.pop();
            this.#content = this.#history[this.#state - 1].getText();
        } else {
            throw "You have reached the original state back.";
        }

    }
}
class TextString {
    #text: string;
    public constructor(text: string) {
        this.#text = text;
    }
    public getText(): string {
        return this.#text;
    }
}

const btn = document.querySelectorAll("button");
const txtBox = <HTMLTextAreaElement>document.querySelector(".text-box");
const tE: TextEditor = new TextEditor();
btn[0].onclick = function () {
    tE.setContent(txtBox.value);
    console.log(txtBox.value);
}
btn[1].onclick = function () {
    try {
        tE.undoContent();
        txtBox.value = tE.getContent();
    } catch (error) {
        console.warn(error);
    }
}
