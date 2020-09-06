import React, { useState, useMemo } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';


import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import monthList from '../../utils/months';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

import { Container, Content } from './styles';

const options = [
  {value: 'Krivax', label: 'Krivax'},
  {value: 'Vankore', label: 'Vankore'},
  {value: 'Alice', label: 'Alice'}
]



const Dashboard: React.FC = ()=> {
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
  
    [... expenses, ... gains].forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
  
      if(!uniqueYears.includes(year)){
        uniqueYears.push(year)
      }
    });
  
    return uniqueYears.map(year => {
      return{
        value: year,
        label: year,
      }
    });
  },[]);
  
  const months = useMemo(() => {
    
    return monthList.map((month, index) => {
      return{
        value: index + 1,
        label: month,
      }
    });
  },[]);

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      if(month === monthSelected && year === yearSelected){
        try{
          total += Number(item.amount)
        }catch{
          throw new Error('Invalid amount. Amount must be number.')
        }
      }
    })
      return total;
  },[monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      if(month === monthSelected && year === yearSelected){
        try{
          total += Number(item.amount)
        }catch{
          throw new Error('Invalid amount. Amount must be number.')
        }
      }
    })
      return total;
  },[monthSelected, yearSelected]);

  const totalBalance = useMemo(()=> {
    return totalGains - totalExpenses;
  },[totalGains, totalExpenses]);

  const message = useMemo(() => {
    if(totalBalance < 0){
      return{
        title: "Que triste!",
        description: "Neste mês, você gastou mais do que deveria",
        icon:sadImg,
        footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias"
      }
    }
    else if(totalBalance == 0){
      return{
        title: "Ufaa!",
        description: "Neste mês, você gastou exatamente o que ganhou",
        icon:grinningImg,
        footerText: "Tenha cuidado. No próximo mês tente poupar o seu dinheiro."
      }
    }else{
      return{
        title: "Muito Bem!",
        description: "Sua Carteira está positiva!",
        icon:happyImg,
        footerText: "Continue assim. Considere investir o seu saldo"
      }
    }
  },[totalBalance]);
  
  return(
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
        <SelectInput options={months}  onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}/>
        <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>
      </ContentHeader>

      <Content>
        <WalletBox
          title="Saldo"
          amount={totalBalance}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="dollar"
          color="#4E41F0"
        />

        <WalletBox
          title="Entradas"
          amount={totalGains}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
          color="#F7931B"
        />

        <WalletBox
          title="Saída"
          amount={totalExpenses}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
          color="#E44C4E"
        />
        <MessageBox 
          title={message.title}
          description={message.description}
          icon={message.icon}
          footerText={message.footerText}
        />
      </Content>
    </Container>
  );
}

export default Dashboard;
