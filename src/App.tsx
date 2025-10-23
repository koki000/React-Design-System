import React from 'react';
import Button from './components/Button';
import { Link } from './components/Link';
import Banner from './components/Banner';
import { ToastProvider, useToast } from './components/ToastProvider';
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
import './tokens/link.css';
import './tokens/field.css';
import './tokens/border.css';
import './tokens/focus.css';

const DemoToasts: React.FC = () => {
  const { showToast } = useToast();
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button onClick={() => showToast({ status: 'success', message: 'Success toast!', title: 'Success', emphasis: 'subtle' })}>Show Success Subtle Toast</Button>
      <Button onClick={() => showToast({ status: 'error', message: 'Error toast!', title: 'Error', emphasis: 'strong' })}>Show Error Toast</Button>
      <Button onClick={() => showToast({ status: 'info', message: 'Info toast!', title: 'Info', emphasis: 'strong' })}>Show Info Toast</Button>
      <Button onClick={() => showToast({ status: 'warning', message: 'Warning toast!', title: 'Warning', emphasis: 'strong' })}>Show Warning Toast</Button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <div style={{ padding: 32, fontFamily: 'Inter, sans-serif', background: 'var(--background-primary)', minHeight: '100vh' }}>
        <h1>React Design System Component Library</h1>
        <section>
          <h2>Buttons</h2>
          <div style={{ display: 'flex', gap: 16 }}>
            <Button type="primary">Primary</Button>
            <Button type="secondary">Secondary</Button>
            <Button type="tertiary">Tertiary</Button>
            <Button type="danger-primary">Danger Primary</Button>
            <Button type="danger-secondary">Danger Secondary</Button>
            <Button type="danger-tertiary">Danger Tertiary</Button>
            <Button type="primary" disabled>Disabled</Button>
          </div>
        </section>
        <section>
          <h2>Links</h2>
          <div style={{ display: 'flex', gap: 16 }}>
              <Link href="#" variant="default">Default Link</Link>
              <Link href="#" variant="subtle">Subtle Link</Link>
              <Link href="#" variant="onColor">On Color Link</Link>
          </div>
        </section>
        <section>
          <h2>Banners</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
            <Banner status="info" emphasis="subtle" title="Info Banner" message="This is an info banner." linkText="Learn more" linkHref="#" onClose={() => {}}/>
            <Banner status="success" emphasis="strong" title="Success Banner" message="This is a success banner." linkText="Undo" linkHref="#" onClose={() => {}}/>
            <Banner status="warning" emphasis="subtle" title="Warning Banner" message="This is a warning banner." linkText="Learn more" linkHref="#" onClose={() => {}}/>
            <Banner status="error" emphasis="strong" title="Error Banner" message="This is an error banner." linkText="Learn more" linkHref="#" onClose={() => {}} />
          </div>
        </section>
        <section>
          <h2>Toasts</h2>
          <DemoToasts />
        </section>
      </div>
    </ToastProvider>
  );
};

export default App;
