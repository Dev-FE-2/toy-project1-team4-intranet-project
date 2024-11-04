/**
 * 
 * 공지사항 관련 api 쿼리는 모두 여기 작성됩니다.
 * 
 * 요청한 페이지네이션 데이터에 따라 공지사항 목록 페이지가 나타납니다.
 * 공지사항 클릭 시 notice_id에 따라 공지사항 상세 데이터를 불러옵니다.
 */


const express = require('express');
const db = require('../../database.cjs'); // 분리된 db 모듈을 불러옴
const router = express.Router();

module.exports = router;