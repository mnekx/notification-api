module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.test.ts"],
	moduleFileExtensions: ["ts", "js"],
	roots: ["<rootDir>/src", "<rootDir>/__tests__"],
	collectCoverage: true,
	coverageDirectory: "coverage",
	collectCoverageFrom: ["src/**/*.ts"],
};
