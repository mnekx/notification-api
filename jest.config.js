module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.test.ts"],
	moduleFileExtensions: ["ts", "js"],
	roots: ["<rootDir>/src"],
	collectCoverage: true,
	coverageDirectory: "coverage",
	collectCoverageFrom: ["src/**/*.ts"],
	verbose: false,
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"src/server.ts",
		"src/env.d.ts",
		"src/types/"
	],
	detectOpenHandles: true,
};
