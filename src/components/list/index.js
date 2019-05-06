import React, {
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import { list } from '../../actions';

const mapStateToProps = (state) => ({
  list: state.list,
});

const renderListItem = (item) => (
  <div key={item.id}>
    <span>{item.name}</span>
    <span>{item.desc}</span>
  </div>
);

const renderList = (items) =>
  Object.values(items).map(item => renderListItem(item));

const List = (props) => {
  useEffect(() => {
    props.dispatch(list.listen())
  }, []);


  if(props.list.error) {
    return <div>Error</div>
  }

  if (props.list.loading || !props.list.items) {
    return <div>Loading</div>
  }

  return (
    <div>
      {renderList(props.list.items)}
    </div>
  );
};

export default connect(mapStateToProps)(List);
