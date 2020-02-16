import React from 'react';

const MainContext = React.createContext({
  name: '',
  surname: '',
  tag: '',
  tags: [],
  token:'',
  url:'http://localhost:8080/public/ads'

});

export default MainContext;