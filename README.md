# React Design System Component Library

A reusable React component library based on your Figma design system.

## Structure
- **src/tokens/**: CSS variables for colors, typography, spacing, etc.
- **src/components/**: React components

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the library:
   ```bash
   npm run build
   ```
3. Start development server:
   ```bash
   npm start
   ```

## Usage
Import components and tokens in your React app:
```js
import { Button } from 'react-design-system/src/components/Button';
import 'react-design-system/src/tokens/colors.css';
```

## Customization
- Update tokens in `/src/tokens/` to match your Figma design system.
- Add or modify components in `/src/components/`.

## License
MIT
