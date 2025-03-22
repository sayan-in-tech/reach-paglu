# ReachPaglu

🚀 **ReachPaglu** is a decentralized reputation system implemented as a browser extension. It allows users to report others and view their reputation directly on their profile pages. The system uses cryptographic signing and a peer-to-peer (P2P) network for secure and decentralized communication.

## Features

- **Decentralized Reputation System**: Built using IPFS for P2P communication.
- **Cryptographic Security**: Ensures authenticity of reports using ECDSA signatures.
- **Reputation Badge**: Displays the number of reports for a user on their profile page.
- **Modern UI**: A sleek and responsive popup interface for reporting and viewing reputation.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/reach-paglu.git
   cd reach-paglu
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Build the project:

   ```bash
   npm run build
   ```
4. Load the extension in your browser:

   - Open your browser's extensions page.
   - Enable "Developer mode".
   - Click "Load unpacked" and select the `reach-paglu` directory.

## Usage

1. Navigate to a user's profile on `x.com`.
2. Open the ReachPaglu popup by clicking the extension icon.
3. View the user's reputation or report them using the "Report User" button.
4. The reputation badge will appear on the user's profile page.

## Development

- **Build**: Run `npm run build` to bundle the extension using Webpack.
- **Watch**: Use `npm run watch` for development with live updates.

## Technologies Used

- **IPFS**: For decentralized P2P communication.
- **ECDSA**: For cryptographic signing and verification.
- **Webpack**: For bundling the extension scripts.
- **Bootstrap**: For modern UI styling.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

---

Made with ❤️
