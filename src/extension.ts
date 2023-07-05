import * as vscode from 'vscode';
import { exec } from 'child_process';
import path = require('path');

let runButton: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage("Assembly compiler activated");

	runButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	runButton.text = "$(triangle-right) Run";
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

// This method is called when your extension is deactivated
export function deactivate() { }

// Compilation logic
async function compileAssembly() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showErrorMessage('No active text editor.');
		return;
	}

	const assemblyFilePath = editor.document.fileName;
	const objectFilePath = assemblyFilePath.replace(/\.asm$/, '.o'); // Replace .asm with .o for the object file
	const basenamePath = assemblyFilePath.replace(/\.asm$/, "");

	const nasmCommand = `nasm -f elf64 -o ${objectFilePath} ${assemblyFilePath}`;
	const ldCommand = `ld "${objectFilePath}" -o "${basenamePath}"`;

	exec(nasmCommand, (nasmError, nasmStdout, nasmStderr) => {
		if (nasmError) {
			vscode.window.showErrorMessage('Compilation failed. Check the output for errors.');
		} else {
			exec(ldCommand, (ldError, ldStdout, ldStderr) => {
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
	return assemblyFilePath;
}

// Run logic
async function runAssembly() {
	const assemblyFilePath = await compileAssembly();
	const fileBasename = path.basename(assemblyFilePath!, path.extname(assemblyFilePath!));

	const execCommand = `./${fileBasename}`;

	const terminal = vscode.window.createTerminal('NASM Terminal');
	terminal.sendText(execCommand);
	terminal.show();
}
