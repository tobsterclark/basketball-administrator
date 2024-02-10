/* eslint-disable no-extend-native */
import firebaseAdmin from "firebase-admin";
import { exportFunctions } from "better-firebase-functions";
import { sep } from "path";
import * as _ from "./util";

// TODO: put this in utils.ts after util functions have been written
if (!String.prototype.toCamelCase) {
	// prettier-ignore
	String.prototype.toCamelCase = function(): string {
		return this.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
	};
}
if (!Date.parseToDate) {
	// prettier-ignore
	Date.parseToDate = function(str): Date {
		if (!str) return new Date();
		return new Date(Date.parse(str));
	};
}

firebaseAdmin.initializeApp();

const formatPath = (relPath: string): string => {
	const relPathArray = relPath.split(sep);
	const fileName = relPathArray.pop() ?? "";
	const relDirPathFunctionNameChunk = relPathArray.map((pathFragment) => pathFragment.toLowerCase()).join(sep);
	const fileNameFunctionNameChunk = fileName.toLowerCase().split(".")[0];
	const funcName = relDirPathFunctionNameChunk ? `${relDirPathFunctionNameChunk}${sep}${fileNameFunctionNameChunk}` : fileNameFunctionNameChunk;
	return funcName.split(sep).join("-");
};

exportFunctions({
	__filename,
	exports,
	searchGlob: "**/**.f.{ts,js}",
	functionDirectoryPath: "./functions",
	funcNameFromRelPath: formatPath,
});
