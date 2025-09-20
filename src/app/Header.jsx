'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
function Header() {
    const pathname = (0, navigation_1.usePathname)();
    return (<header>
      <link_1.default href="/" style={{ fontWeight: pathname === '/' ? 'bold' : 'normal' }}>
        Home
      </link_1.default>
      <link_1.default href="/about" style={{ fontWeight: pathname === '/about' ? 'bold' : 'normal' }}>
        About
      </link_1.default>
      <link_1.default href="/contact" style={{ fontWeight: pathname === '/contact' ? 'bold' : 'normal' }}>
        Contact
      </link_1.default>
    </header>);
}
