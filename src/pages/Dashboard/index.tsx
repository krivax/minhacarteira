import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import {Container} from './styles';

const options = [
  {value: 'Krivax', label: 'Krivax'},
  {value: 'Vankore', label: 'Vankore'},
  {value: 'Alice', label: 'Alice'}
]

const Dashboard: React.FC = ()=> {
  return(
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
        <SelectInput options={options} />
      </ContentHeader>
    </Container>
  );
}

export default Dashboard;
