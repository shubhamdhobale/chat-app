# sanity.io

This npm module provides a simple and efficient interface for interacting with the [Sanity.io](https://www.sanity.io/) API, a platform for structured content management. In addition, it offers React components for displaying PortableText (Rich text) content.

## Features

- **Getting data from Sanity.io**: Easily interact with the Sanity.io API.
- **Block Content**: Display rich text content from Sanity.io in your React application with the provided PortableText components.

### Getting data from Sanity.io

You can customize your query to get the data you need from Sanity.io. You can find more information about the query language here: https://www.sanity.io/docs/how-queries-work. For this integration, we used the following query:

```groq
`*[_type == 'product' && store.slug.current == '${slug}'][0]`
```
For simplicity, the dataset that is configured for this project is public. If you want to use a private dataset, you'll need to add the token to the Authorization header in the [api function](index.server.ts). You can find more information about this [here](https://www.sanity.io/docs/http-auth).

### Block Content

Sanity.io is very flexible and can be used for many different purposes.
In this integration, we used Sanity.io to add some extra information to our products. This additional information is of a [block type](https://www.sanity.io/docs/block-type).
Showing this additional information on the product page is a great way to tell a story about your products and make them more appealing to your customers. For that we created the component [PortableText](/stack/app/sanity.io/components/PortableText.tsx) that shows some but not all of the possible features of the block type. You will need to customize the serializer or even add new ones to more features of the block type (Instagram, Images, Call to Action, etc).

## Installation

You can install the `sanity.io` module via npm:

```bash
npm install sanity.io
```

## Usage

### API Interaction

You can import the API functions from the module like so:

```javascript
import { getProductFromSlug } from 'sanity.io';
```

Then, you can use these functions in your application to interact with the Sanity.io API.

### PortableText Components

You can import the PortableText component from the module like so:

```javascript
import { PortableText } from 'sanity.io';
```

Then, you can use this component in your React application to display rich text content from Sanity.io.

## Contributing

Contributions to the `sanity.io` module are welcome. Please submit a pull request or open an issue for any changes or improvements you would like to suggest.

## License

This module is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Local Development

To work on this project locally, you can follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/tres-caras/sanity.io.git
```

2. Install the dependencies:

```bash
npm install
```

3. Make your changes to the code.

## Building

To build the project, run the following command:

```bash
npm run build
```

This will generate a production version of your package in the `dist` folder.

## Publishing

Before publishing a new version of the package, make sure you have built the latest changes:

```bash
npm run build
```

Then, you can publish the package to npm with:

```bash
npm publish
```

Please make sure to follow [semantic versioning](https://semver.org/) when publishing new versions.