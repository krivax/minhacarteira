import React from 'react';
import { 
  Container,
  Header,
  LogImg,
  MenuContainer,
  MenuItemLink,
  Title
} from './styles';

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp
} from 'react-icons/md';


import logoImg from '../../assets/logo.svg'

const Aside: React.FC = ()=> {
  return(
    <Container>
      <Header>
         <LogImg src={logoImg} alt="Logo Minha Carteira" />
         <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="#teste">
            <MdDashboard/>
            Dashboard
        </MenuItemLink> 

        <MenuItemLink href="#teste">
            <MdArrowUpward />
            Entradas
        </MenuItemLink> 

        <MenuItemLink href="#teste">
            <MdArrowDownward />
            Saidas
        </MenuItemLink> 

        <MenuItemLink href="#teste">
            <MdExitToApp />
            Sair
        </MenuItemLink>

      </MenuContainer>
    </Container>
  );
}

export default Aside;
