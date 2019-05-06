import React, { useState } from 'react';
import { connect } from 'react-redux';
import { list } from '../../actions';

const mapDispatchToProps = (dispatch) => ({
  addListItem: ({ name, desc }) => {
    dispatch(list.update({
      id: name,
      name,
      desc,
    }));
  },
});

const Input = (props) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <>
      <div>Input</div>
      <input
        type="text"
        value={name}
        onChange={(e) => { setName(e.target.value); }}
      />
      <input
        type="text"
        value={desc}
        onChange={(e) => { setDesc(e.target.value); }}
      />
      <button
        onClick={() => { props.addListItem({ name, desc }); }}
      >add</button>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Input);
