import React from 'react';
import { useTheme } from './theme/ThemeProvider';
import { Button } from './components/Button';
import { Link } from './components/Link';
import { Banner } from './components/Banner';
import { Divider } from './components/Divider';
import { useToast } from './components/ToastProvider';
import { SegmentedControl } from './components/SegmentedControl';
import { Modal, confirm } from './components/Modal';
import { Tooltip } from './components/Tooltip';
import { Breadcrumb } from './components/Breadcrumb';
import { Dropdown } from './components/Dropdown';
import { Checkbox } from './components/Checkbox';
import { RiErrorWarningFill } from '@remixicon/react';
import { TabBar } from './components/TabBar';

const App: React.FC = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = React.useState(0);
    const tabs = [
        { label: 'Home' },
        { label: 'Profile' },
        { label: 'Settings', disabled: true },
        { label: 'About' },
    ];
    const [segmentedControlvalue, setValue] = React.useState('option1');
    const segmentedControlOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3', disabled: true },
        { label: 'Option 4', value: 'option4' },
    ];
    // Modal demo state
    const [modalVisible, setModalVisible] = React.useState(false);
    const { theme, toggleTheme } = useTheme();
    const [isChecked, setIsChecked] = React.useState(false);

    return (
            <div style={{ display: 'flex', gap: 32, flexDirection: 'column', padding: 32, fontFamily: 'Inter, sans-serif', background: 'var(--background-primary)', minHeight: '100vh' }}>
                <h1>React Design System Component Library</h1>
                <section>
                    <Button onClick={toggleTheme}>Toggle Theme (Current: {theme})</Button>
                </section>
                <section>
                    <h2>Checkboxes</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 24 }}>
                            <Checkbox
                                label="Regular"
                                checked={isChecked}
                                onChange={setIsChecked}
                            />
                            <Checkbox
                                label="Pre-checked"
                                checked={true}
                            />
                            <Checkbox
                                label="Indeterminate"
                                indeterminate={true}
                            />
                            <Checkbox
                                label="Disabled"
                                disabled={true}
                            />
                            <Checkbox
                                label="Disabled Checked"
                                disabled={true}
                                checked={true}
                            />
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Segmented Control</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <SegmentedControl options={segmentedControlOptions} value={segmentedControlvalue} onChange={setValue} />
                        <div>
                            <strong>Selected:</strong> {segmentedControlOptions.find(o => o.value === segmentedControlvalue)?.label}
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Tabs</h2>
                    <TabBar
                        tabs={tabs}
                        activeIndex={activeTab}
                        onChange={setActiveTab}
                        tabPosition="center"
                    />
                    <div style={{ marginTop: 16 }}>
                        <strong>Selected Tab:</strong> {tabs[activeTab].label}
                    </div>
                </section>
                <section>
                    <h2>Buttons</h2>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <Button type="primary" size='large'>Primary</Button>
                        {/* Icon-only button with Tooltip demo */}
                        <Tooltip text="Warning" orientation="top" theme="default">
                            <Button type='primary' size='large' content='icon' icon={<RiErrorWarningFill aria-label="Warning" />} aria-label="Warning" />
                        </Tooltip>
                        <Button loading={true} type='primary' size='large' content='icon' icon={<RiErrorWarningFill aria-label="Warning" />} aria-label="Warning" />
                        <Button type="secondary" size='large'>Secondary</Button>
                        <Button type="tertiary" size='large'>Tertiary</Button>
                        <Button type="primary-danger" size='large'>Danger Primary</Button>
                        <Button type="secondary-danger" size='large'>Danger Secondary</Button>
                        <Button type="tertiary-danger" size='large'>Danger Tertiary</Button>
                        <Button type="primary" size='large' disabled>Disabled</Button>
                        <Button type="secondary-danger" size='large' disabled>Disabled</Button>
                        <Button type="tertiary-danger" size='large' disabled>Disabled</Button>
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
                        <Banner status="info" emphasis="subtle" title="Info Banner" message="This is an info banner." linkText="Learn more" linkHref="#" onClose={() => { }} />
                        <Banner status="success" emphasis="subtle" title="Success Banner" message="This is a success banner." linkText="Undo" linkHref="#" onClose={() => { }} />
                        <Banner status="warning" emphasis="subtle" title="Warning Banner" message="This is a warning banner." linkText="Learn more" linkHref="#" onClose={() => { }} />
                        <Banner status="error" emphasis="subtle" title="Error Banner" message="This is an error banner." linkText="Learn more" linkHref="#" onClose={() => { }} />

                        <Banner status="info" emphasis="strong" title="Info Banner" message="This is an info banner." linkText="Learn more" linkHref="#" onClose={() => { }} />
                        <Banner status="success" emphasis="strong" title="Success Banner" message="This is a success banner." linkText="Undo" linkHref="#" onClose={() => { }} />
                        <Banner status="warning" emphasis="strong" title="Warning Banner" message="This is a warning banner." linkText="Learn more" linkHref="#" onClose={() => { }} />
                        <Banner status="error" emphasis="strong" title="Error Banner" message="This is an error banner." linkText="Learn more" linkHref="#" onClose={() => { }} />
                    </div>
                </section>
                <section>
                    <h2>Toasts</h2>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <Button onClick={() => showToast({ status: 'success', message: 'Success toast!', title: 'Success', emphasis: 'subtle' })}>Show Success Subtle Toast</Button>
                        <Button onClick={() => showToast({ status: 'error', message: 'Error toast!', title: 'Error', emphasis: 'strong' })}>Show Error Toast</Button>
                        <Button onClick={() => showToast({ status: 'info', message: 'Info toast!', title: 'Info', emphasis: 'strong' })}>Show Info Toast</Button>
                        <Button onClick={() => showToast({ status: 'warning', message: 'Warning toast!', title: 'Warning', emphasis: 'strong' })}>Show Warning Toast</Button>
                    </div>
                </section>
                <section>
                    <h2>Dividers</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
                        <Divider orientation="horizontal" />
                        <Divider orientation="vertical" />
                    </div>
                </section>
                <section>
                    <h2>Modal</h2>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <Button onClick={() => setModalVisible(true)}>Open Modal</Button>
                        <Button onClick={() => confirm({ title: 'Delete Item', content: 'Are you sure you want to delete this item?', okText: 'Delete', okType: 'danger', cancelText: 'Cancel', onOk: () => alert('Deleted'), onCancel: () => alert('Cancelled'), icon: <RiErrorWarningFill style={{ color: 'var(--icon-danger)' }} /> })}>Open Confirm</Button>
                    </div>
                </section>
                <section>
                    <h2>Breadcrumbs</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 600 }}>
                        {/* Medium size, demo visual states via CSS */}
                        <Breadcrumb
                            size="medium"
                            items={[
                                { label: 'Home', href: '#' },
                                { label: 'Section', href: '#' },
                                { label: 'Subsection', href: '#' },
                                { label: 'Current', href: '#' },
                                { label: 'Visited', href: '#' },
                                { label: 'Read Only', readOnly: true }
                            ]}
                        />
                    </div>
                </section>
                <section>
                    <Checkbox label="Demo Checkbox" checked={isChecked} onChange={setIsChecked} />
                </section>
                <section>
                    <h2>Dropdown Demo</h2>
                    <div style={{ maxWidth: 320 }}>
                        <Dropdown
                            trigger="click"
                            placement='top'
                            items={[
                                { label: 'Category #1', category: true },
                                { label: 'Default Item' },
                                { label: 'Icon Item', icon: <RiErrorWarningFill size={20} aria-label="Warning" /> },
                                { label: 'Checkbox Item', checkbox: true, checked: isChecked, onClick: () => setIsChecked(!isChecked) },
                                { label: 'Disabled Item', disabled: true },
                                { label: 'Category #2', category: true },
                                { label: 'Another Item' },
                            ]}
                        >
                            <Button type="primary">Open Dropdown</Button>
                        </Dropdown>
                    </div>
                </section>
                <Modal
                    title="Demo Modal"
                    visible={modalVisible}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                    okText="Confirm"
                    cancelText="Close"
                    type="transactional"
                    icon={<RiErrorWarningFill style={{ color: 'var(--icon-brand)' }} />}
                >
                    <p>This is a demo modal.</p>
                    <p>It uses semantic tokens and buttons from the design system.</p>
                </Modal>
            </div> 
    );
};

export default App;
