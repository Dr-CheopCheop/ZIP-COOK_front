import React from 'react';
import * as S from './ShareMainStyle';
import { Link } from 'react-router-dom';


const SharePosts = ({ posts, loading }: any) => {
    return (
      <>
        {loading && <div> loading... </div>}
        <S.PostList>
          {posts.map((post: any) => (
            <Link to={`/community/share/${post.id}`} key={post.id}>
            <S.PostWrap>
              <S.PostImg src={`/images/${post.filepath}`} />{<br />}
              {post.title}{<br />}
              DATE: {post.date}
            </S.PostWrap>
            </Link>
          ))}
        </S.PostList>
      </>
    );
  };

  export default SharePosts;