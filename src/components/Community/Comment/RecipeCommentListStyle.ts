import styled from "styled-components";
import Colors from "../../../Styles/Colors";
//FromStyle의 width margin auto 적용되어있음
export const CommentListWrapper = styled.div`
  text-align: left;
`;

export const CountComments = styled.div`
  border-top: 2px solid black;
  border-bottom: 1px solid black;
  padding: 10px 20px;
  font-size: 16px;
  span {
    color: ${Colors.postBackgroundBorder};
  }
`;
