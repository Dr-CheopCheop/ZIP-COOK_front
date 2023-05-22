import * as S from "./CommentListStyle";
// import useAxios from "../../hooks/useAxios";
import CommentPost from "./CommentPost";
import CommentItem from "./CommentItem";
import type { commentDataProps } from "../../../constants/interfaces";
import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { useLocation, useParams } from "react-router-dom";

const CommentList = (props: any) => {
  const [datas, setDatas] = useState<commentDataProps[]>([]);
  const axiosData = useAxios();
  const { sendRequest: getCommentsRequest } = axiosData;
  const location = useLocation();
  const { id } = props;
  const category = location.key;
  const { sid } = useParams();
  console.log(location.pathname, sid);

  useEffect(() => {
    const loadCommentsList = (responseData: any) => {
      const loadedDatas: commentDataProps[] = [];

      for (const key in responseData) {
        loadedDatas.push({
          id: responseData[key].id,
          writer: responseData[key].writer,
          time: responseData[key].time,
          content: responseData[key].content,
        });
      }
      setDatas(loadedDatas);
    };
    getCommentsRequest(
      {
        url: `/${category}-comment/${id}`,
        method: "GET",
      },
      loadCommentsList
    );
  }, [getCommentsRequest, category, id]);

  const onAddCommentHanlder = (content: any) => {
    setDatas([...datas, content]);
  };

  const onDeleteCommentHandler = (id: any) => {
    const filteredDatas = datas.filter((data) => data.id !== id);
    setDatas(filteredDatas);
  };

  const onEditCommentHandler = (id: any, editComment: string) => {
    setDatas(
      datas.map((data) =>
        data.id === id ? { ...data, content: editComment } : data
      )
    );
  };

  return (
    <S.CommentListWrapper>
      <S.CountComments>
        댓글 <span>{datas.length}</span>
      </S.CountComments>
      {datas.map((data) => (
        <CommentItem
          key={data.id}
          data={data}
          onDeleteComment={onDeleteCommentHandler}
          onEditComment={onEditCommentHandler}
        />
      ))}
      <CommentPost onAddComment={onAddCommentHanlder} />
    </S.CommentListWrapper>
  );
};

export default CommentList;