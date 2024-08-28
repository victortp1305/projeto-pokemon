const path = require("path");

module.exports = {
  entry: "./js/script.js", // Arquivo de entrada
  output: {
    filename: "main.js", // Arquivo de saída após o bundling
    path: path.resolve(__dirname, "dist"), // Diretório de saída
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Processa arquivos .js
        exclude: /node_modules/, // Ignora node_modules
        use: {
          loader: "babel-loader", // Usa Babel para transpilar o código
        },
      },
    ],
  },
};
