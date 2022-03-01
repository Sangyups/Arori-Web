## 개발 환경

- 동영상, ply 모델을 로컬 스토리지와 연동
  - 아직 S3 등의 스토리지와 연결되어 있지 않기 때문에 임시 처리.
  - 만약 머신러닝 서버와 연결하여 동영상을 처리하거나 주고 받는 로직 필요.
- `.env` 파일에 환경변수 값이 저장되어 있으며(git에는 commit X), 개발 당시 db는 mysql을 사용.

## Backend

```
GET /api/items : 전체 저장되어 있는 아이템을 불러온다.
POST /api/items : form-data로 item name, price, description(desc), video를 받는다.
GET /api/items/{itemId} : 해당 itemId를 가진 item의 정보와 3D 모델링 정보를 가져온다.
```

## Frontend

```
/ : 홈 디렉토리에서 전체 아이템 리스트를 보여주는 페이지
/upload : 아이템을 업로드하는 페이지
```
