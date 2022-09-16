import styled from "@emotion/styled";

const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #FFFFFF;
  position: relative;
  padding-right: 20px;
  padding-left: 20px;
`;

//unused
const Wrapper = styled.div<{ isApp: boolean }>`
  width: 100%;
  min-height: 100vh;
  background-color: #FFFFFF;
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 20px 0px;
  position: relative;
  ${({ isApp }) =>
    isApp
      ? `max-width: 768px;`
      : `max-width: 425px;
        @media (min-width: 1024px) {
          margin-left: 15rem;
        }}
      `};
`;

const MainWrapper = styled.main<{
  isMainPage: boolean;
  backgroundColor?: string;
}>`
  width: 100%;
  min-height: ${({ isMainPage }) =>
    isMainPage ? "calc(100vh - 7.2rem)" : "calc(100vh - 3.2rem)"};
  background-color: ${({ backgroundColor }) => backgroundColor || '#FFFFFF'};
  position: relative;
`;

export {Background, Wrapper, MainWrapper}