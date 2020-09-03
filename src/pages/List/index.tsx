import React, { useMemo, useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

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
    const response = listData.map(item => {
      return {
        id: String(Math.random () * data.length),
        description: item.description,
        amountFormatted: item.amount,
        frequency: item.frequency,
        dataFormatted: item.date,
        tagColor:item.frequency === 'recorrente' ? '#E44C4E' : '#4E41F0'
      }
    })
    setData(response);
  });

  const months = [
    {value: 7, label: 'Julho'},
    {value: 8, label: 'Agosto'},
    {value: 9, label: 'Setembro'}
  ]
  
  const years = [
    {value: 2020, label: 2020},
    {value: 2019, label: 2019},
    {value: 2018, label: 2018}
  ]
  

  return(
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput options={months} />
        <SelectInput options={years} />
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
