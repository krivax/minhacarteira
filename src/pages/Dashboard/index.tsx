import React, { useState, useMemo } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';


import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import monthList from '../../utils/months';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';
import opsImg from '../../assets/ops.svg';

import { Container, Content } from './styles';

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
    }else if(totalGains === 0 && totalExpenses === 0){
      return{
        title: "Ops!",
        description: "Neste mês, Não há registro ded entradas ou saídas",
        icon:opsImg,
        footerText: "Parece que você não fez nenhum registro no mês escolhido."
      }
    }else if(totalBalance === 0){
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
  },[totalBalance, totalGains, totalExpenses]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: '#E44C4E'
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: '#F7931B'
      }
    ];
    return data;
  },[totalGains, totalExpenses]);

  const historyData = useMemo(()=> {
    return monthList.map((_, month ) =>{

      let amountEntry = 0;
      gains.forEach(gain => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = String(date.getFullYear());

        if(gainMonth === month && gainYear === yearSelected){
          try{
          amountEntry += Number(gain.amount);
          }catch{
            throw new Error('AmountEntry is invalid. Is accept amountEntry must be valid number.')
          }
        }
      });

      let amountOutput = 0;
      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = String(date.getFullYear());

        if(expenseMonth === month && expenseYear === yearSelected){
          try{
            amountOutput += Number(expense.amount);
          }catch{
            throw new Error('AmountOutput is invalid. Is accept amountOutput must be valid number.')
          }
        }
      });
      return {
        monthNumber: month,
        month: monthList[month].substr(0, 3),
        amountEntry,
        amountOutput
      }
    })
    .filter(item => {
      const currentMonth = new Date().getMonth();
      const currentYear = String(new Date().getFullYear());
      
      return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
    })
  },[yearSelected]);


  const relationExpensesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses.filter((expense) => {
      const date = new Date(expense.date);
      const year =  String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      return month === monthSelected && year === yearSelected;
    })
    .forEach((expense) => {
      if(expense.frequency ==='recorrente'){
        return amountRecurrent += Number(expense.amount);
      }

      if(expense.frequency === 'eventual'){
        return amountEventual += Number(expense.amount);
      }
    })

    const total = amountRecurrent + amountEventual;
    const recurrentPercentual = Number(((amountRecurrent / total) * 100).toFixed(1));
    const eventualPercentual = Number(((amountEventual / total) * 100).toFixed(1));

    return [{
      name: 'Recorrentes',
      amount: String(amountRecurrent),
      percent: recurrentPercentual ? recurrentPercentual : 0,
      color: "#F7931B"
    },
    {
      name: 'Eventuais',
      amount: String(amountEventual),
      percent: eventualPercentual ? eventualPercentual : 0,
      color: "#E44C4E"
    }]
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains.filter((gain) => {
      const date = new Date(gain.date);
      const year =  String(date.getFullYear());
      const month = String(date.getMonth() + 1);

      return month === monthSelected && year === yearSelected;
    })
    .forEach((gain) => {
      if(gain.frequency ==='recorrente'){
        return amountRecurrent += Number(gain.amount);
      }

      if(gain.frequency === 'eventual'){
        return amountEventual += Number(gain.amount);
      }
    })

    const total = amountRecurrent + amountEventual;
    const recurrentPercentual = Number(((amountRecurrent / total) * 100).toFixed(1));
    const eventualPercentual = Number(((amountEventual / total) * 100).toFixed(1));

    return [{
      name: 'Recorrentes',
      amount: String(amountRecurrent),
      percent: recurrentPercentual ? recurrentPercentual : 0,
      color: "#F7931B"
    },
    {
      name: 'Eventuais',
      amount: String(amountEventual),
      percent: eventualPercentual ? eventualPercentual : 0,
      color: "#E44C4E"
    }]
  }, [monthSelected, yearSelected]);
  
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
        <PieChartBox data={relationExpensesVersusGains} />
        <HistoryBox 
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />
        <BarChartBox 
          data={relationExpensesRecurrentVersusEventual}
          title="Saídas"/>

        <BarChartBox 
          data={relationGainsRecurrentVersusEventual}
          title="Entradas"/>
      </Content>
    </Container>
  );
}

export default Dashboard;
