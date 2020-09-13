import styled from 'styled-components';

interface ITitleContainerProps {
  lineColor: string;
}

export const Container = styled.div`
  width:100%;

  display:flex;
  justify-content:space-between;
  margin-bottom:25px;

  @media(max-width: 320px){
      flex-direction: column;
    }

`;

export const TitleContainer = styled.div<ITitleContainerProps>`
  >h1 {
    color: ${props => props.theme.colors.white};

    &::after {
      content: '';
      display: block;
      width:55px;
      border-bottom: 5px solid ${props => props.lineColor};
    }
  }
  @media(max-width: 420px){
    >h1 {
      font-size: 22px;
    }
  }
`;
export const Controllers = styled.div`
  display: flex;

  @media(max-width: 320px){
      width: 100%;
      margin-top: 20px;
      justify-content: space-around;
    }

  `;
