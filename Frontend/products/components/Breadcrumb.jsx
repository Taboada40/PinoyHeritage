import React from 'react';
import '../assets/styles/Breadcrumb.css';

function Breadcrumb ({ items }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="breadcrumb-separator">›</span>}
          <a 
            href={item.path} 
            className={index === items.length - 1 ? 'breadcrumb-current' : 'breadcrumb-link'}
          >
            {item.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;