import React, { createContext, useState, useContext } from 'react';
import SignIn from '../pages/SignIn';


interface IAuthContext {
  logged: boolean;
  singIn(email: string, password: string): void;
  singOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC =({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem('@minha-carteira:logged');

    return !!isLogged;
  });

  const singIn = (email: string, password: string) => {
    if(email === 'krivahz@gmail.com' && password === '1234'){
      localStorage.setItem('@minha-carteira:logged', 'true');
      setLogged(true);
    }else{
      alert('Senha ou usuário inválido!');
    }
  }

  const singOut = () => {
    localStorage.removeItem('@minha-carteira:logged');
    setLogged(false);
  }

  return(
    <AuthContext.Provider value={{logged, singIn, singOut}}>
      {children}
    </AuthContext.Provider>
  );

}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };