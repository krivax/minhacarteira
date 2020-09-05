import React, { useMemo, useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import { uuid } from 'uuidv4';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import monthsList from '../../utils/months';

import { Container, Content, Filters} from './styles';

interface IRouteParams {
  match: {
    params:{
      type: string;
    }
  }
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match })=> {

  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));




  const { type } = match.params;
  const title = useMemo(() => {
    return type === 'entry-balance' ? {
      title: 'Entradas',
      lineColor: '#F7931B',
      gains
     } : {
      title: 'Saídas',
      lineColor:'#E44C4E',
      expenses
    }
  }, [type]);

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses
  }, [type]);

  useEffect(() => {
    const filterDate = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1); 
      const year = String(date.getFullYear());
      
      return month === monthSelected && year === yearSelected;

    });

    const dataFormated = filterDate.map(item => {
      
      return {
        id: uuid(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor:item.frequency === 'recorrente' ? '#E44C4E' : '#4E41F0'
      }
    })
    setData(dataFormated);
  },[listData, monthSelected, yearSelected, data.length]);
  
  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach(item => {
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
  },[listData]);

  const months = useMemo(() => {
    
    return monthsList.map((month, index) => {
      return{
        value: index + 1,
        label: month,
      }
    });
  },[]);

  return(
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput options={months}  onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}/>
        <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>
      </ContentHeader>
      <Filters>
        <button 
          type="button"
          className="tag-filter tag-filter-recurrent"
        >
          Recorrentes
        </button>
        <button 
          type="button"
          className="tag-filter tag-filter-eventual"
        >
          Eventuais
        </button>
      </Filters>
      <Content>
        { 
          data.map(item => (
          <HistoryFinanceCard 
            key={item.id}
            tagColor={item.tagColor} 
            title={item.description}
            subTitle={item.dataFormatted}
            amount={item.amountFormatted}
          />
          ))
        }
      </Content>
    </Container>
  );
}

export default List;
