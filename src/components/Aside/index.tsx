import React, { useState } from 'react';
import { 
  Container,
  Header,
  LogImg,
  MenuContainer,
  MenuItemLink,
  Title,
  MenuItemButton,
  ToggleMenu,
  ThemeToggleFooter
} from './styles';

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu
} from 'react-icons/md';

import Toggle from '../Toggle/index';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import logoImg from '../../assets/logo.svg'

const Aside: React.FC = ()=> {

  const { singOut } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const [toggleMenuIsOpned, setToggleMenuIsOpned] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

  const handleToggleMenu = () => {
    setToggleMenuIsOpned(!toggleMenuIsOpned);
  }

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }

  return(
    <Container menuIsOpen={toggleMenuIsOpned}>
      <Header>
          <ToggleMenu onClick={handleToggleMenu}>
            {toggleMenuIsOpned ? <MdClose/> : <MdMenu/>}
          </ToggleMenu>
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

      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpned}>
        <Toggle 
          labelLeft="Light"
          labelRight="Dark"
          checked={darkTheme}
          onChange={handleChangeTheme}
          />
      </ThemeToggleFooter>
    </Container>
  );
}

export default Aside;
