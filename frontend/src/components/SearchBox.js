import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <input
        className="search-input"
        type="text"
        name="q"
        id="q"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
      ></input>
      <button className="search-btn" type="submit">
        <i className="fa fa-search fa-lg"></i>
      </button>
    </form>
  );
}
