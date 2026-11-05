# Protocol Sniffer Pro

> A developer-focused Chrome extension that intercepts, logs, and displays custom protocol URIs (e.g., `whatsapp://`, `zoommtg://`, `moodlemobile://`) directly from the browser to assist in debugging native application deep-links.

## ✨ Features

- **Universal Protocol Detection:** Catches any non-standard scheme or custom URI scheme instantly.
- **DOM-Level Interception:** Injects a lightweight content script to catch physical link clicks milliseconds before Chrome routes them to the native OS app.
- **Background Redirection Catching:** Uses `webNavigation` and `webRequest` APIs to catch automated JavaScript redirects.
- **Seamless Native UI:** Automatically drops down the native extension popup to display the logged URL while preserving user gestures.
- **Local Storage Logging:** All intercepted links are saved locally on your device via `chrome.storage.local` with a sleek, dark-mode interface.

## 🛠️ Built With

- **Manifest V3:** Built on the modern Chrome extension architecture.
- **Vanilla JavaScript & CSS:** Lightweight, high-performance, and secure with zero external dependencies.

## 📦 Installation (Developer Mode)

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the folder containing this extension's source code.

## 💻 Usage

1. Click the **Protocol Sniffer Pro** icon in your Chrome toolbar.
2. Toggle the **Auto-open UI** switch on.
3. Click any custom protocol link (or trigger a deep link via script) to instantly view the intercepted URL and protocol badge in the native dropdown popup.

## 📄 License

This project is open-source and available under the [MIT License](https://choosealicense.com/licenses/mit/).