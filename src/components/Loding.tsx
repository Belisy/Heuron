import styled from "styled-components";

function Loding() {
  return <LodingTag>로딩중...</LodingTag>;
}

const LodingTag = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  white-space: nowrap;
  font-size: 2rem;
  font-weight: 700;
  color: #df2e0e;
`;

export default Loding;
