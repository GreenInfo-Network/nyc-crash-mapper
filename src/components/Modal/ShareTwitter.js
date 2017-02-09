import React from 'react';

// Placeholder
export default () => {
  // including the query string would make the tweet more than 150 chars
  const href = window.location.href;
  const arr = href.split('/');
  const location = window.encodeURIComponent(`${arr[0]}//${arr[2]}/${arr[3]}`);
  const url = `https://twitter.com/home?status=${location}`;

  return (
    <div className="modal-share-twitter">
      <p>
        <a rel="noopener noreferrer" target="_blank" href={url}>
          Share NYC Crash Mapper on Twitter
        </a>
      </p>
    </div>
  );
};
