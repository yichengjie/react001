import React from 'react' ;

const Names = () => {
  const names = ['John', 'Jill', 'Jack'];
  return (
    <div>
      <h2>Names</h2>
      {/* This is a list of names */}
      <ul className="names">{
        names.map((name,index )=>
          <li key ={index} className="name">{name}</li>
        )
      }</ul>
    </div>
  );
};

export default Names ;