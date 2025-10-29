import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { ToastProvider} from './components/ToastProvider';
import { createRoot } from 'react-dom/client';
import App from './App';
import './tokens/colors.css';
import './tokens/typography.css';
import './tokens/spacing.css';
import './tokens/radius.css';
import './tokens/stroke.css';
import './tokens/support.css';
import './tokens/text.css';
import './tokens/background.css';
import './tokens/surface.css';
import './tokens/icon.css';
import './tokens/action.css';
import './global.css';
import './tokens/link.css';
import './tokens/field.css';
import './tokens/border.css';
import './tokens/focus.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
  <ThemeProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ThemeProvider>
);
}
