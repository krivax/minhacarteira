import React from 'react';
import { Container } from './styles';

import MainHeader from '../../components/MainHeader';
import Aside from '../../components/Aside';
import Content from '../../components/Content';

const Layout: React.FC = ({ children })=> {
  return(
    <Container>
      <MainHeader/>
      <Aside/>
      <Content>
        {children}
      </Content>
    </Container>
  );
}

export default Layout;
