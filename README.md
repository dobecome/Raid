## Boss Raid 백엔드 서비스 개발

## 개발 Notion Link
https://voracious-puffin-506.notion.site/5-daffd94126d94c55b2b657e21cfed68d

## 1. 프로젝트 목표
- 보스레이드 PVE 컨텐츠 백엔드 서비스 개발
- 기능
1) 유저 생성/조회

2) 보스 레이드 상태 조회

- 입장 가능 상태 확인 등

3) 보스 레이드 시작

- 레이드 record 생성

- 레이드 제한 시간(웹 JSON 파일 읽기)동안 레이드 점유

4) 보스 레이드 종료 

- 레이드 level(웹 JSON 파일 읽기)에 따른 score 반영(Redis client로 userId-totalScore 저장)

- 레이드 제한 시간 이내에 처리되지 않을 경우 예외처리

5) 랭킹 조회

- Redis 에 캐싱된 데이터로 랭킹 조회

# 2. 백엔드 프로젝트 구성
1) Server : Nestjs
2) DB : PostgreSQL (Docker)
3) ORM : Prisma
4) In-memory data structure store : Redis (Docker)


## 3. API 명세
| INDEX | METHOD | URI | DESCRIPTION | RESPONSE | REMARK |
| --- | --- | --- | --- | --- | --- |
| 1 | POST | /api/user | 유저 생성 | { userId: number } | O |
| 2 | GET | /api/user | 유저 조회 | { totalScore: number, bossRaidRecord: [] } | O |
| 3 | GET | /api/bossRaid | 보스레이드 상태 조회 | { canEnter:boolean, enteredUserId: number } | O |
| 4 | POST | /api/bossRaid/enter | 보스레이드 시작 | { raidRecordId: number, isEntered: boolean } or { isEntered: boolean } | O |
| 5 | PATCH | /api/bossRaid/end | 보스레이드 종료, 종료 결과 Redis에 캐싱 | {} | O |
| 6 | GET | /api/bossRaid/topRankerList | 랭킹 조회 | { topRankerInfoList: RankingInfo[], myRankingInfo: RankingInfo } | O |

## 4. ERD 설계 
| User |  |  |
| --- | --- | --- |
| Column | Type | REMARK |
| id | Int |  |
| totalScore | Int |  |
| bossRaids | Array | FK (BossRaid - id) |
| bossRaidRecord | Array | FK (BossRaidRecord - id) |

| BossRaid |  |  |
| --- | --- | --- |
| Column | Type | REMARK |
| id | Int |  |
| enteredUserId | Int | FK (User -id) |
| canEnter | boolean |  |
| bossRaidRecord | Array | FK (BossRaidRecord - id) |

| BossRaidRecord |  |  |
| --- | --- | --- |
| Column | Type | REMARK |
| id | Int | Raid 시작 시 새로운 id생성 |
| userId | Int | FK (User - id) |
| bossRaidId | Int | FK (BossRaid - id) |
| level | Int |  |
| score | Int |  |
| isDone | boolean | 종료 시 true |

## 미비 사항 및 추후 적용 예정 사항
1) 기능 개발 완료 (Request 및 Response 요구 사항 충족, Redis 사용하여 랭킹 조회 기능 구현, staticData 웹서버 캐싱 등)
2) Unit Test 코드 작성 예정
