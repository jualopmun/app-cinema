module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    indent: [
      "error", 2,
      { ignoredNodes: ["TemplateLiteral"] },
    ],
    "template-curly-spacing": "off",
  },
  overrides: [{
    files: [
      "**/__tests__/*.{j,t}s?(x)",
      "**/tests/unit/**/*.spec.{j,t}s?(x)",
    ],
    env: {
      jest: true,
    },
  }],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          [""],
          ["@", "./src"],
					
        ],
        extensions: [".ts", ".js", ".jsx", ".json"],
      },
    },
  },
}
  