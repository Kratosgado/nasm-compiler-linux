import * as vscode from 'vscode';
import { runAssembly, compileAssembly } from './logicFuctions';

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

