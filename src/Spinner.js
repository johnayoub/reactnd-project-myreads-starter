import React from 'react';

function Spinner ({ message }) {
  return (
    <div style={{textAlign: "center", marginTop: 50}}>
      <div>
        <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
      </div>
      <div style={{marginTop: 20}}>{message}</div>
    </div>
  );
}

export default Spinner;
