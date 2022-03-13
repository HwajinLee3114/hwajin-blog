import React from 'react';
import './style.scss';

function SectionHeader({ title }) {
  return (
    <div className="section-header-wrapper">
      <div className="section-header" style={{ borderBottom: '0 !important' }}>
        <h2 style={{ paddingBottom: '10px' }}>{title}</h2>
      </div>
    </div>
  );
}

export default SectionHeader;
