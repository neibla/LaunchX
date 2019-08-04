import * as vscode from 'vscode';
import * as launches from "./launches.json";

export function activate(context: vscode.ExtensionContext) {
	console.log('LaunchX activated');
	launches.forEach(({ extension, path }) => {
		const disposable = registerLaunch(extension, path);
		context.subscriptions.push(disposable);
	});
}

const resolveLaunchXExtension = (extension: string) => `extension.launchx.${extension}`;

const registerLaunch = (extension: string, path: string) => {
	const disposable = vscode.commands.registerCommand(resolveLaunchXExtension(extension), async () => {
		const search = await vscode.window.showInputBox({
			placeHolder: 'Search',
		});
		launchSearch(path, search || "");
	});
	return disposable;
};

const resolveSearchUri = (path: string, search: string) => `${path}${encodeURI(search)}`;

const launchSearch = (path: string, search: string) => {
	const searchUri = resolveSearchUri(path, search);
	vscode.env.openExternal(vscode.Uri.parse(searchUri));
};

export function deactivate() { }
