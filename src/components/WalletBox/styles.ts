import styled from 'styled-components';

interface IContainerProps{
  color: string;
}
export const Container = styled.div<IContainerProps> `
  width: 32%;
  height: 150px;

  margin: 10px 0;

  background-color: ${props => props.color};
  color: ${props => props.theme.colors.white};

  border-radius: 7px;
  padding: 10px 20px;

  position: relative;
  overflow: hidden;

  >img {
    position: absolute;
    height: 110%;

    top: -10px;
    right: -30px;
    
    opacity: .3;
  }

  >span {
    font-size: 18px;
    font-weight: 500px;
  }

  >small {
    font-size: 12px;

    position: absolute;
    bottom: 10px;
  }

  @media(max-width: 770px){
    >span {
      font-size: 14px;
    }
    >h1{
      word-wrap: break-word;
      font-size: 20px;
    }
  }
  @media(max-width: 420px){
    width: 100%;
  }
`;