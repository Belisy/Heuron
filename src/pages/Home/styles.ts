import styled from "styled-components";

const HomeWrapper = styled.div`
  & h1 {
    font-size: 3rem;
    font-weight: 900;
    color: #ff1e9d;
    margin: 2rem;
  }

  & table {
    position: relative;
    left: 0;
    right: 0;
    margin: auto;

    & img {
      width: 30vw;
    }
  }
`;

export default HomeWrapper;
