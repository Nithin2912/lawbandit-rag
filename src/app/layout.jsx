"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
require("./globals.css");
const Header_1 = __importDefault(require("./Header"));
const Footer_1 = __importDefault(require("./Footer"));
exports.metadata = {
    title: 'LawBandit RAG',
    description: 'Next.js app for LawBandit RAG',
};
function RootLayout({ children }) {
    return (<html lang="en">
      <head>
        <title>{exports.metadata.title}</title>
        <meta name="description" content={exports.metadata.description}/>
      </head>
      <body>
        <Header_1.default />
        <main>{children}</main>
        <Footer_1.default />
      </body>
    </html>);
}
