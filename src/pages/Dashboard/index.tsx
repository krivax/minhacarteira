import React, { useState, useMemo } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';


import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import monthList from '../../utils/months';

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
  
  return(
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
        <SelectInput options={months}  onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}/>
        <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>
      </ContentHeader>

      <Content>
        <WalletBox
          title="Saldo"
          amount={150.00}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="dollar"
          color="#4E41F0"
        />

        <WalletBox
          title="Entradas"
          amount={5000.00}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
          color="#F7931B"
        />

        <WalletBox
          title="Saída"
          amount={4850.00}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
          color="#E44C4E"
        />
      </Content>
    </Container>
  );
}

export default Dashboard;
