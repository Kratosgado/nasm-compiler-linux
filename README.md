# nasm-compiler-linux README

The NASM-compiler extension is a powerful tool for working with NASM (Netwide Assembler) assembly language in Visual Studio Code. It provides features for compiling and running NASM assembly code directly from the editor.


## Features

- Compile NASM assembly code to object files
- Link object files to create executable files
- Run the compiled executables from within the editor
- Integration with the VS Code editor, including syntax highlighting and code formatting for NASM assembly language

\!\[feature X\]\(images/for-extension.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.


## Installation
1. Launch Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon in the left sidebar or by pressing `Ctrl+Shift+X`.
3. Search for "nasm-compiler-linux" in the Extensions view search bar.
4. Click on the "nasm-compiler-linux" extension by Prince Mbeah Essilfie and click the "Install" button.


## Usage
1. Open a NASM assembly file (with the `.asm` extension) in Visual Studio Code.
2. Use the provided commands or keybindings to compile and run the assembly code.
3. The output of the compilation and execution will be shown in the integrated terminal.


## Commands/Keybindings
- `extension.compileAssembly`: Compiles the current NASM assembly file.
- `extension.runAssembly`/`f5`: Compiles and runs the current NASM assembly file.

## Requirements

- NASM (Netwide Assembler) must be installed on your system. You can download and install NASM from the official website: [NASM Downloads](https://www.nasm.us/)


## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

This extension contributes the following settings:

* `nasm-compiler-linux.enable`: Enable/disable this extension.
* `extension.runAssembly`: f5 - run assembly 

## Known Issues
* `Windows support not available` : working on it

## Contributing
Contributions to the NASM extension are welcome! If you find any issues or have suggestions for improvements, please open an issue on the GitHub repository.

## License
This extension is released under the [MIT License](LICENSE).

## Contact
For any questions or support related to the NASM extension, you can contact the developer at:
- Email: [mbeahessilfieprince@gmail.com](mailto:mbeahessilfieprince@gmail.com)
- GitHub: [Kratosgado](https://github.com/Kratosgado)
- LinkedIn: [Prince Mbeah Essilfie](https://www.linkedin.com/in/prince-mbeah-essilfie-6bb0b5231/)
- Twitter: [MbeahEssilfie](https://twitter.com/MbeahEssilfie)

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of the NASM Extension.

- Support for NASM assembly language in Visual Studio Code.
- Commands for compiling and running NASM assembly files.
- Integration with the VS Code editor.

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
