/**
 * 
 * 유저 프로필 관련 api 쿼리는 모두 여기 작성됩니다.
 * 
 * 로그인한 회원 id에 따라 users 테이블의 회원 정보를 수정합니다. -> modified_date 컬럼을 추가해야 될 것 같습니다. 요청하시면 반영할게요
 * users 테이블에서 직원 목록을 불러옵니다.
 * 직원 등록 페이지 -> 계속 사용한다고 하면 추가하는 쿼리 작성해 놓을테니 사용하시고 아니면 회원가입 기능으로 대체하겠습니다.
 * 사진 업로드 기능은 데이터를 blob으로 변경해야 하는데 일단은 img src(경로)로 작성해놓고 업로드 기능에 적용하신다고 요청주시면 반영하겠습니다.
 */


const express = require('express');
const db = require('../../database.cjs'); // 분리된 db 모듈을 불러옴
const router = express.Router();

module.exports = router;
