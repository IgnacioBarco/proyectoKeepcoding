import React from 'react';

const MainContext = React.createContext({
  name: '',
  surname: '',
  tag: '',
  tags: []

});

export default MainContext;