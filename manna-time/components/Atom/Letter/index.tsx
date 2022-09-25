import styled from "@emotion/styled";

// 강조하는 문구
export const StyledSpan = styled.span<{fontSize: string}>`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: ${({ fontSize })=>fontSize};
line-height: 150%;
/* identical to box height, or 24px */

letter-spacing: -0.003em;

color: #5194FF;
`

// 평서문
export const StyledP = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 150%;
/* identical to box height, or 24px */

letter-spacing: -0.003em;

color: #333333;
`

export const NoticeTitle = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 150%;
    /* identical to box height, or 48px */

    text-align: center;
    letter-spacing: -0.003em;

    color: #333333;
`

export const NoticeDescription = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    /* identical to box height, or 26px */

    text-align: center;
    letter-spacing: -0.003em;

    color: #333333;
`

export const Headline4 = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 52px;
    /* identical to box height, or 130% */

    display: flex;
    align-items: center;
    letter-spacing: -0.6px;

    color: #333333;
`

export const Headline3 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 42px;
/* or 131% */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;
`

export const Headline2 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 34px;
/* or 142% */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;

`

export const Headline1 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 28px;
/* or 140% */

display: flex;
align-items: center;
letter-spacing: -0.003em;

color: #333333;
`

export const Subhead1 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 22px;
/* or 122% */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;
`

export const Subhead2 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 22px;
/* or 138% */

display: flex;
align-items: center;
letter-spacing: -0.003em;

color: #333333;
`

export const Subhead3 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 160%;
/* or 22px */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;

`

export const Body2 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 160%;
/* identical to box height, or 26px */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;
`

export const Body1 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 160%;
/* or 22px */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;

`

export const Caption = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 160%;
/* or 19px */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;
`

export const Button3 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;
`

export const Button2 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 100%;
/* identical to box height, or 14px */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;
`

export const Button1 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 100%;
/* identical to box height, or 12px */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;

`

export const Label2 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 100%;
/* identical to box height, or 14px */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;
`

export const Label1 = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 100%;
/* identical to box height, or 12px */

display: flex;
align-items: center;
letter-spacing: -0.3px;

color: #333333;
`