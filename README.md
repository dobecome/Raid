# Raid

## 개발 Notion Link
https://mellow-deer-e21.notion.site/5-4a46473bd7e7468caa3a099311bcf8da

## 1. 프로젝트 목표
- 보스레이드 PVE 컨텐츠 백엔드 서비스 개발
- 기능
  유저 생성/조회
  보스 레이드 상태 조회 : 입장 가능 상태 확인 등
  보스 레이드 시작 : 레이드 record 생성, 레이드 제한 시간(웹 JSON 파일 읽기)동안 레이드 점유
  보스 레이드 종료 : 레이드 level(웹 JSON 파일 읽기)에 따른 score 반영(Redis client로 userId-totalScore 저장), 레이드 제한 시간 이내에 처리되지 않을 경우 예외처리
  랭킹 조회 : Redis 에 캐싱된 데이터로 랭킹 조회

# 2. 백엔드 프로젝트 구성
1) Server : Nestjs
2) DB : PostgreSQL (Docker)
3) ORM : Prisma
4) Key-Value cache storage : Redis (Docker)


## 3. API 명세
| --- | --- | --- | --- | --- | --- |
| INDEX | METHOD | URI | DESCRIPTION | RESPONSE | REMARK |
| 1 | POST | /api/user | 유저 생성 | userId: string | O |
| 2 | GET | /api/user | 유저 조회 | totalScore: Int, bossRaidRecord: [] | O |
| 3 | GET | /api/bossRaid | 보스레이드 상태 조회 | canEnter:boolean, enteredUserId:string | O |
| 4 | POST | /api/bossRaid/enter | 보스레이드 시작 | 시작 가능= RaidRecordId + isEntered true, 시작 불가능= isEntered false |  |
| 5 | POST | /api/bossRaid/end | 보스레이드 종료, 종료 결과 Redis에 캐싱 |  |  |
| 6 | GET | /api/bossRaid/topRankerList | 랭킹 조회 | User - totalScore 내림차순 |  |

## 4. ERD 설계 
| User |  |  |
| --- | --- | --- |
| Column | Type | REMARK |
| id | Int |  |
| totalScore | Int |  |
| bossRaids | [] | FK (BossRaid - id) |
| bossRaidRecord | [] | FK (BossRaidRecord - id) |

| BossRaid |  |  |
| --- | --- | --- |
| Column | Type | REMARK |
| id | Int |  |
| enteredUserId | Int | FK (User -id) |
| canEnter | boolean |  |
| bossRaidRecord | [] | FK (BossRaidRecord - id) |

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
