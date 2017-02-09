import React from 'react';

// Placeholder
export default () => {
  const location = window.encodeURIComponent(window.location.href);
  const url = `https://www.facebook.com/sharer/sharer.php?u=${location}`;

  return (
    <div className="modal-share-fb">
      <p>
        <a rel="noopener noreferrer" target="_blank" href={url}>
          Share NYC Crash Mapper on Facebook
        </a>
      </p>
    </div>
  );
};
