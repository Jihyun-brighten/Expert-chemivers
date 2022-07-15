import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './css/PostDetail.module.css';
import SearchBar from './SearchBar';
import { useLocation } from 'react-router-dom';

const PostDetail = ({ data }) => {
  const { post } = useParams();
  const selectedPost = data.find((x) => {
    return Number(x.id) === Number(post);
  });

  const location = useLocation();
  const navigate = useNavigate();

  const locationInclude = (name) => {
    return location.pathname.includes(name);
  };

  const backListBtn = () => {
    if (locationInclude('freepost')) {
      navigate('/main/post/freepost');
    } else if (locationInclude('suggestIdea')) {
      navigate('/main/post/suggestIdea');
    } else if (locationInclude('notice')) {
      navigate('/board/notice');
    }
  };

  const body = selectedPost.body.split(`\n`).map((line) => {
    return (
      <span>
        {line}
        <br />
      </span>
    );
  });

  return (
    <div className={styles.wrap}>
      <SearchBar />
      <div className={styles.headerBox}>
        <h2 className={styles.title}>{selectedPost.title}</h2>
        <div className={styles.postInfo}>
          <span>{selectedPost.userId}</span>
          <span>{selectedPost.date}</span>
          <span>조회수 {selectedPost.view}</span>
        </div>
      </div>
      <img src={selectedPost.img} alt='' />
      <div className={styles.body}>{body}</div>
      <div className={styles.fileBox}>
        첨부파일 : <a href={selectedPost.fileLink}>{selectedPost.file}</a>
      </div>
      <div>
        <button onClick={backListBtn} className={styles.listBtn}>
          목록
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
