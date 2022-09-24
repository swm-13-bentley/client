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