import React from 'react';

interface DropdownSearchProps {
  value: string;
  onChange: (val: string) => void;
}

const DropdownSearch: React.FC<DropdownSearchProps> = ({ value, onChange }) => (
  <div className="ds-dropdown__search">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="ds-dropdown__search-input"
      placeholder="Search..."
    />
  </div>
);

export default DropdownSearch;
