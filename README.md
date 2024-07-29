# Secret Share

Secret Share is a web application that allows users to securely encrypt and decrypt messages directly in their browser. The system ensures that sensitive data is kept secure by only transmitting encrypted information over the network.

## Features

- **Client-Side Encryption**: Encrypt your messages in the browser using AES encryption before sending them to the server.
- **Secure Data Transmission**: Only encrypted data is sent over the network.
- **Access Control**: Data can only be decrypted with the correct key and IV.
- **Easy Integration**: Use the provided API to integrate with your own applications.

## Installation

To run the application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aaronburt/SecretShare.git
   cd secret-share
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost`.

## Usage

### Encrypting a Message

1. Navigate to the "Encrypt" page.
2. Enter the plaintext message you want to encrypt.
3. Provide a secret key (64-character hex) and an IV (32-character hex). (Automatic generation also)
4. Click "Encrypt" to generate the encrypted text.

### Decrypting a Message

1. Navigate to the "Decrypt" page.
2. Enter the encrypted text, secret key, and IV. (Automatic via the link)
3. Click "Decrypt" to reveal the original message.

## API

### Create Encrypted Secret

- **Endpoint**: `/api/v1/secret/create`
- **Method**: `POST`
- **Body Parameters**:
  - `secretData`: The encrypted data (in hex format).

### Get Encrypted Secret

- **Endpoint**: `/api/v1/secret/{id}`
- **Method**: `GET`
- **Response**: JSON containing the encrypted data.

## Contributing

Contributions are welcome! If you have any ideas or improvements, please open an issue or submit a pull request.

### How to Contribute

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Make your changes and commit them: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Submit a pull request.

## License

This project is licensed under the Creative Commons Attribution 4.0 International License. You are free to:

- Share: Copy and redistribute the material in any medium or format.
- Adapt: Remix, transform, and build upon the material for any purpose, even commercially.

**Under the following terms**:

- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

For more information, see the [LICENSE](https://creativecommons.org/licenses/by/4.0/) file.

## Acknowledgments

- [CryptoJS](https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js) for the encryption library.
- Special thanks to all contributors and users of this project.
