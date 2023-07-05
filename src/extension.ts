import * as vscode from 'vscode';
import { exec } from 'child_process';
import path = require('path');

// declare run button as a status bar item
let runButton: vscode.StatusBarItem;

// function to activate our extension
export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage("Assembly compiler activated"); // display a message when activated successfully

	// define the properties of the button
	runButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	runButton.text = "$(play) Run";
	runButton.tooltip = "Run Assembly";
	runButton.command = "extension.runAssembly";
	runButton.show();

	// Register "Compile Assembly" command
	const compileCommand = vscode.commands.registerCommand('extension.compileAssembly', async () => {
		await compileAssembly();
	});
	// Register "Run Assembly" command
	const runCommand = vscode.commands.registerCommand('extension.runAssembly', () => {
		runAssembly();
	});
	// Add the commands to the context
	context.subscriptions.push(compileCommand, runCommand);
}

// function to be called when our extension is deactivated
export function deactivate() { }

// Compilation logic
async function compileAssembly() {
	const editor = vscode.window.activeTextEditor;		// get the active editor

	// check and stop compilation if there is no active editor
	if (!editor) {
		vscode.window.showErrorMessage('No active text editor.');
		return;
	}

	const assemblyFilePath = editor.document.fileName;	// get the path to the assembly file
	const objectFilePath = assemblyFilePath.replace(/\.asm$/, '.o'); // Replace .asm with .o for the object file
	const basenamePath = assemblyFilePath.replace(/\.asm$/, "");	// get the basefilepath from the .asm filepath

	const nasmCommand = `nasm -f elf64 -o ${objectFilePath} ${assemblyFilePath}`;	// nasm command to compile the .asm to object code .o
	const ldCommand = `ld "${objectFilePath}" -o "${basenamePath}"`;				// linking command to create an executable file

	// run the nasmCommand
	exec(nasmCommand, (nasmError, nasmStdout, nasmStderr) => {
		// check if error in compiling and stop compilation
		if (nasmError) {
			vscode.window.showErrorMessage('Compilation failed. Check the output for errors.');
			return;
		} else {
			exec(ldCommand, (ldError, ldStdout, ldStderr) => {
				// check if there's is an error in linking and stop the compilation
				if (ldError) {
					vscode.window.showErrorMessage('Linking failed. Check the output for errors.');
				} else {
					vscode.window.showInformationMessage('Compilation and linking successful.');
				}
				console.log(ldStdout);
				console.log(ldStderr);
			});
			console.log(nasmStdout);
			console.log(nasmStderr);
		}
	});
	return path.basename(assemblyFilePath, path.extname(assemblyFilePath)); // return the basename of the file
}

// Run logic
async function runAssembly() {
	const fileBasename = await compileAssembly(); // the compileAssembly() command returns the basename of the assembler file

	const execCommand = `./${fileBasename}`; // command to execute the executable

	// check and get a terminal with the name "NASM Terminal"
	const existingTerminal = vscode.window.terminals.find((terminal) => terminal.name === 'NASM Terminal');

	if (existingTerminal) {
		existingTerminal.sendText(execCommand); // send the execCommand to it if such exists
	} else {
		// else create a new terminal with the name "NASM Terminal" and send the execCommand
		const terminal = vscode.window.createTerminal('NASM Terminal');
		terminal.sendText(execCommand);
		terminal.show();
	}

}
