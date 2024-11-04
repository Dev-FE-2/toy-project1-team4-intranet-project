/**
 * 
 * 근태 관련 api 쿼리는 모두 여기 작성됩니다.
 * 로그인한 회원 id에 따라 vacation 테이블에서 해당하는 정보 불러오기
 * 요청한 pageid 페이지네이션에 따라서 해당하는 리스트 불러오기
 * 로그인한 회원 id에 맞는 근태 신청 정보 추가하기
 */


const express = require('express');
const db = require('../../database.cjs'); // 분리된 db 모듈을 불러옴
const router = express.Router();

module.exports = router;
