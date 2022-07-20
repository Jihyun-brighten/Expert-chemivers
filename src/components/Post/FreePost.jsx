import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import SearchHeader from './SearchHeader';
import styles from './css/PostTab.module.css';
import { Link } from 'react-router-dom';
import data from '../../data/freePostData.json';
import PostList from './PostList';
import { useRef } from 'react';

const FreePost = () => {
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1);

  const LIST_PER_PAGE = 10;
  const startNum = (page - 1) * LIST_PER_PAGE;
  const endNum = startNum + LIST_PER_PAGE;

  const searchRef = useRef('');

  useEffect(() => {
    const postLatest = [...data].reverse();
    setLists(postLatest);
  }, []);

  const onChangeSearchCategory = (e) => {
    onChangeSearch('', e.target.value);
  };
  const onChangeSearch = (e, category) => {
    const search = searchRef.current.value;
    const postLatest = [...data].reverse();
    console.log(category);
    if (search === null || search === '') {
      setLists(postLatest);
    } else if (category === '전체' || category === undefined) {
      const filterData = [...postLatest].filter(
        (ele) =>
          ele.title.includes(search) ||
          ele.body.includes(search) ||
          ele.userId.includes(search)
      );
      setLists(filterData);
    } else if (category === '제목') {
      const filterData = [...postLatest].filter((ele) =>
        ele.title.includes(search)
      );
      setLists(filterData);
    } else if (category === '작성자') {
      const filterData = [...postLatest].filter((ele) =>
        ele.userId.includes(search)
      );
      setLists(filterData);
    } else if (category === '내용') {
      const filterData = [...postLatest].filter((ele) =>
        ele.body.includes(search)
      );
      setLists(filterData);
    }
  };
  return (
    <div className={styles.post}>
      <SearchHeader
        data={lists}
        onChangeSearch={onChangeSearch}
        searchRef={searchRef}
        onChangeSearchCategory={onChangeSearchCategory}
      />
      <PostList lists={lists} startNum={startNum} endNum={endNum} />
      <Link to='./write'>
        <button className={styles.writeBtn}>작성하기</button>
      </Link>
      <Pagination
        total={lists.length}
        page={page}
        setPage={setPage}
        LIST_PER_PAGE={LIST_PER_PAGE}
      />
    </div>
  );
};

export default FreePost;
