import React from 'react';
import { 
  Container,
  Header,
  LogImg,
  MenuContainer,
  MenuItemLink,
  Title,
  MenuItemButton
} from './styles';

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp
} from 'react-icons/md';

import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo.svg'

const Aside: React.FC = ()=> {
  const { singOut } = useAuth();
  return(
    <Container>
      <Header>
         <LogImg src={logoImg} alt="Logo Minha Carteira" />
         <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/">
            <MdDashboard/>
            Dashboard
        </MenuItemLink> 

        <MenuItemLink href="/list/entry-balance">
            <MdArrowUpward />
            Entradas
        </MenuItemLink> 

        <MenuItemLink href="/list/exit-balance">
            <MdArrowDownward />
            Saidas
        </MenuItemLink> 

        <MenuItemButton onClick={ singOut }>
            <MdExitToApp />
            Sair
        </MenuItemButton>

      </MenuContainer>
    </Container>
  );
}

export default Aside;
