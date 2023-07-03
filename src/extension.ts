import * as vscode from 'vscode';
import { exec } from 'child_process';
import path = require('path');
import { stdout } from 'process';

export function activate(context: vscode.ExtensionContext) {
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
	const fileBasename = path.basename(assemblyFilePath, path.extname(assemblyFilePath));
	const basename = assemblyFilePath.replace(/\.asm$/, "");

	const nasmCommand = `nasm -f elf64 -o ${objectFilePath} ${assemblyFilePath}`;
	const ldCommand = `ld "${objectFilePath}" -o "${basename}"`;

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
}

// Run logic
async function runAssembly() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showErrorMessage('No active text editor.');
		return;
	}

	await compileAssembly();

	const assemblyFilePath = editor.document.fileName;
	const fileBasename = path.basename(assemblyFilePath, path.extname(assemblyFilePath));
	const objectFilePath = assemblyFilePath.replace(/\.asm$/, '.o');

	const execCommand = `./${fileBasename}`;

	const terminal = vscode.window.createTerminal('NASM Terminal');
	terminal.sendText(execCommand);
	terminal.show();
}
