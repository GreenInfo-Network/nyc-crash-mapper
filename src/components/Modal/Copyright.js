import React from 'react';

export default () => {
  const year = (new Date()).getFullYear();

  return (
    <div className="modal-copyright">
      <p>
        NYC Crash Mapper &copy; CHECKPEDS {year}
      </p>
    </div>
  );
};
