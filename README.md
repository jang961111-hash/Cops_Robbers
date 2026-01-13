# 🚓 SAFE-PLAY

**오프라인 경찰과 도둑 보조 앱**

> ⚠️ **이것은 일반적인 게임 앱이 아닙니다**  
> 안전 관리 시스템 위에 게임 같은 UX를 입힌 청소년 보호 플랫폼입니다.

## 📋 프로젝트 정체성

| 구분 | 내용 |
|------|------|
| **프로젝트명** | SAFE-PLAY (오프라인 경찰과 도둑 보조 앱) |
| **핵심 경험** | 경찰과 도둑 "게임 UX" |
| **핵심 시스템** | 청소년 오프라인 활동 안전 관리 플랫폼 |
| **설계 원칙** | 사용자 화면 = 게임 UX / 관리자 = 안전·운영 시스템 |
| **타겟** | 모바일 우선 SPA 프로토타입 |

## 💡 개요

청소년들의 오프라인 활동(경찰과 도둑 게임)을 재미있게 즐기도록 하면서, 운영진은 실시간으로 안전하게 관리할 수 있는 이중 시스템입니다.

- **플레이어 관점:** 재미있는 경찰과 도둑 게임
- **운영진 관점:** 청소년 안전 관리 플랫폼

### 🎯 개발 시 반드시 지켜야 할 것

#### ✅ DO (반드시 하기)
- 경찰 vs 도둑 **경험 차이**에 집중
- 색상, 애니메이션, 배지로 정보 전달
- 더미 데이터와 시뮬레이터 패널 활용
- 모바일 우선 UI/UX
- 역할별로 다른 느낌 제공

#### ❌ DON'T (절대 하지 말기)
- 긴 텍스트로 규칙 설명
- 일반적인 게임 앱처럼 설계
- 경찰과 도둑이 같은 화면 보기
- AI 점수를 플레이어에게 노출
- 정확도에 집착 (MVP는 UX 플로우 검증)

## 🛠️ 기술 스택

### Frontend
- **Framework:** React 18.3.1
- **Language:** TypeScript 5.5.4
- **Build Tool:** Vite 5.4.8
- **Routing:** React Router DOM 6.26.2
- **State Management:** Zustand 4.5.5
- **Styling:** TailwindCSS 3.4.13
- **UI Utilities:** clsx

### Backend
- **Framework:** Spring Boot
- **Communication:**
  - REST API (HTTP)
  - WebSocket (실시간 통신)
- **Database:** TBD

### AI Service
- **Language:** Python
- **Framework:** FastAPI
- **Purpose:** Movement Risk Classification

### Map
- **외부 API 사용 안 함** (No external map API)
- 자체 구현 그리드 기반 지도
- 실제 GPS 좌표 → 게임 좌표 변환 시스템

### Architecture
```
┌─────────────────────────────────────────────────┐
│              Frontend (React)                   │
│  - UI/UX (역할별 차별화)                         │
│  - 게임 로직                                     │
│  - 실시간 상태 관리 (Zustand)                    │
└─────────────┬───────────────────────────────────┘
              │
              ├─ REST API ──────────┐
              │                     │
              └─ WebSocket ─────────┤
                                    ▼
              ┌──────────────────────────────────┐
              │   Backend (Spring Boot)          │
              │  - 게임 세션 관리                 │
              │  - 플레이어 인증/인가             │
              │  - 실시간 위치 동기화             │
              │  - 게임 규칙 검증                │
              └─────────────┬────────────────────┘
                            │
                            │ REST API
                            ▼
              ┌──────────────────────────────────┐
              │   AI Service (FastAPI)           │
              │  - 이동 패턴 분석                 │
              │  - 위험 레벨 분류                │
              │  - UI 신호 생성                  │
              └──────────────────────────────────┘
```

## � 필수 스크린 (Required Screens)

### 1️⃣ LobbyPage
```
[방 정보]
├─ 🔑 Room Code
├─ 👥 참가자 목록
│  └─ 플레이어 이름 + 역할 배지 + Ready 상태
├─ 🎮 게임 설정
│  └─ 게임 시간, 규칙 설정
└─ [게임 시작 버튼]
```

### 2️⃣ GamePage
레이아웃 구조:
```
┌─────────────────────────────┐
│  📊 GameStatusBar           │ ← 항상 표시
├─────────────────────────────┤
│                             │
│  Tab Content Area           │ ← 현재 탭 내용
│  (활성 탭에 따라 변경)       │
│                             │
├─────────────────────────────┤
│ 🗺️ 🛡️ 📋 👤              │ ← Tab Navigation
│ Map Safety Rules Profile    │
└─────────────────────────────┘
```

#### 📊 GameStatusBar
- ⏱️ 경과 시간
- 🎮 게임 상태
- 👥 팀 인원 (경찰/도둑)
- ⚙️ 게임 제어 (일시정지/종료)

#### 🎯 탭 (Tabs)

| 탭 | 역할 | 목적 |
|----|------|------|
| **MapTab** 🗺️ | 모든 역할 | 위치 추적 / 팀 현황 |
| **SafetyTab** 🛡️ | 모든 역할 | 안전 상태 / 감옥 / 경고 |
| **RulesTab** 📋 | 모든 역할 | 역할별 규칙 확인 |
| **ProfileTab** 👤 | 모든 역할 | 플레이어 프로필 / 통계 |

---

## �📁 프로젝트 구조

```
Cops_Robbers/
├── src/
│   ├── App.tsx                 # 메인 앱 컴포넌트 및 라우팅
│   ├── main.tsx                # 진입점
│   ├── index.css               # 전역 스타일
│   │
│   ├── features/               # 주요 화면/기능
│   │   ├── Onboarding.tsx      # 온보딩 화면
│   │   ├── Home.tsx            # 홈 화면
│   │   ├── Lobby.tsx           # 🔧 대기실 (LobbyPage)
│   │   ├── GameMain.tsx        # 🎮 게임 화면 (GamePage)
│   │   └── tabs/               # 게임 탭 화면
│   │       ├── MapTab.tsx      # 🗺️ 지도/위치 탭
│   │       ├── SafetyTab.tsx   # 🛡️ 안전/감옥 탭 (구 JailTab)
│   │       ├── RulesTab.tsx    # 📋 규칙 탭
│   │       └── ProfileTab.tsx  # 👤 프로필 탭
│   │
│   ├── components/             # 재사용 컴포넌트
│   │   ├── PhoneShell.tsx      # 모바일 UI 쉘
│   │   ├── TabBar.tsx          # 탭 네비게이션 (4개 탭)
│   │   ├── GameStatusBar.tsx   # 게임 상태 표시줄
│   │   ├── MapDummy.tsx        # 지도 더미 컴포넌트
│   │   ├── BottomSheet.tsx     # 바텀시트 UI
│   │   ├── ConfirmModal.tsx    # 확인 모달
│   │   ├── ToastStack.tsx      # 토스트 알림
│   │   └── DevPanel.tsx        # 개발자 패널
│   │
│   ├── utils/                  # 유틸리티 함수
│   │   ├── roleConfig.ts       # 역할별 UX 설정
│   │   └── aiRiskClassifier.ts # 🤖 AI 위험 분류 시스템
│   │
│   ├── store/                  # 상태 관리
│   │   └── gameStore.ts        # Zustand 게임 전역 상태
│   │
│   ├── types/                  # TypeScript 타입 정의
│   │   └── game.ts             # 게임 관련 타입
│   │
│   └── data/                   # 초기 데이터
│       └── initialData.ts      # 초기 플레이어, 지오펜스 데이터
│
├── index.html                  # HTML 템플릿
├── package.json                # 패키지 설정
├── vite.config.ts              # Vite 설정
├── tsconfig.json               # TypeScript 설정
├── tailwind.config.cjs         # TailwindCSS 설정
└── postcss.config.cjs          # PostCSS 설정
```

## 👥 역할 시스템 (User Roles)

### 1️⃣ 경찰 (Police)
| 항목 | 내용 |
|------|------|
| **목표** | 추적 / 체포 |
| **UX 톤** | 정보 우위, 안정감 |
| **주요 기능** | 도둑 위치 추적, 체포 시도, 팀 조율 |
| **정보 표시** | 지도 중심, 도둑 위치, 거리 정보 |
| **팀 위치** | ✅ **표시** (팀 위치 명확) |
| **경고 메시지** | ✅ **명확** (구체적 정보) |
| **UI 색상** | 🔵 **파란색** (안정감, 신뢰) |

**경찰 메시지 예시:**
- "도둑 3명이 400m 거리에 있습니다"
- "팀원 A가 (120, 85)에 위치합니다"
- "도둑 B를 체포할 수 있는 거리입니다"

### 2️⃣ 도둑 (Thief)
| 항목 | 내용 |
|------|------|
| **목표** | 회피 / 생존 |
| **UX 톤** | 불안, 긴장, 은신 |
| **주요 기능** | 위치 은폐, 경찰 감시 회피, 동료 연락 |
| **정보 표시** | 경찰 감지 거리, 안전 지역, 경고 알림 |
| **팀 위치** | ❌ **숨김** (위치 노출 방지) |
| **경고 메시지** | ⚠️ **모호** (불안감 조성) |
| **UI 색상** | 🔴 **빨간색** (위험, 긴장) |

**도둑 메시지 예시:**
- "주변에 위협이 감지되었습니다"
- "경찰이 가까워지고 있습니다"
- "지금 움직이면 위험할 수 있습니다"

### 3️⃣ 마스터 (Master / 관리자)
| 항목 | 내용 |
|------|------|
| **목표** | 운영 / 안전 관리 |
| **UX 톤** | 통제, 요약, 판단 |
| **주요 기능** | 게임 진행 관리, 안전 모니터링, 비상 처리 |
| **정보 표시** | 전체 플레이어 현황, 안전 상태, 통계 |
| **팀 위치** | ✅ **표시** (전체 맵) |
| **경고 메시지** | ✅ **명확** (상세 정보) |
| **UI 색상** | 🟢 **초록색** (관리, 통제) |
## 🤖 AI 기능 (AI Function)

### Movement Risk Classification (이동 위험 분류)

**목적:** 플레이어 이동 패턴을 분석하여 관리자가 주의를 기울여야 할 플레이어를 시각적으로 강조

#### 입력 (Input)
- **위치 시퀀스**: `(x, y, timestamp)` - 시간순 위치 데이터
- **경계 정보**: 지오펜스 좌표, 허용 반경

#### 출력 (Output)
```typescript
{
  riskLevel: 'normal' | 'warning' | 'danger',
  reasons: string[],        // 위험 판단 근거
  signals: {
    color: string,          // UI 색상
    icon: string,           // 아이콘
    badge?: string          // 배지 텍스트
  }
}
```

#### 분석 요소
1. **경계 이탈 감지** - 지오펜스 영역 벗어남
2. **비정상 속도 감지** - 사람이 걷기 어려운 속도
3. **급격한 방향 전환** - 120도 이상 급회전
4. **장시간 정지** - 5분 이상 움직임 없음

#### ⚠️ 핵심 원칙

| 원칙 | 설명 |
|------|------|
| **AI는 처벌 결정 금지** | AI는 절대 플레이어 퇴장/제재를 결정하지 않음 |
| **UI 신호만 발생** | 색상, 배지, 알림으로만 정보 표시 |
| **최종 판단은 관리자** | Master 역할이 모든 최종 결정 수행 |
| **투명성** | 플레이어에게 AI 점수/알고리즘 보이지 않음 |

#### 위험 레벨 시각화

| 레벨 | 아이콘 | 배지 | 색상 | 점수 | 의미 |
|------|-------|------|------|------|------|
| **Normal** | ✅ | - | 🟢 초록 | 0-14 | 정상 활동 |
| **Warning** | ⚠️ | 주의 | 🟡 노랑 | 15-29 | 모니터링 필요 |
| **Danger** | 🚨 | 위험 | 🔴 빨강 | 30+ | 즉시 확인 필요 |

---
## � UX 원칙 (UX Principles)

### 핵심 원칙
1. **텍스트 최소화**: 긴 텍스트로 규칙 설명 금지
   - ❌ "경찰과 도둑으로 나뉘어 진행되는 게임입니다..."
   - ✅ 색상, 배지, 애니메이션, 토스트로 표현

2. **게임 긴장감 우선**: 정보 정확도보다 게임 경험 중심
   - 약간의 지연 허용 (실시간 100% 정확도 불필요)
   - 긴장감과 몰입감 극대화

3. **AI 투명성**: AI 점수/알고리즘 플레이어에게 보이지 않음
   - 자연스러운 게임처럼 느껴야 함
   - 백그라운드 시스템은 숨김

4. **역할별 차별화**: 같은 액션도 역할마다 다르게 느껴야 함
   - 경찰: 같은 위치 표시 → "추적 성공" (안정감)
   - 도둑: 같은 위치 표시 → "들켰다!" (긴장감)
   - 색상, 음향, 애니메이션 등으로 차별화

### 적용 예시

| 상황 | 경찰 UX | 도둑 UX |
|------|---------|--------|
| **위치 추적** | 🟢 안정적 블루 / 직선 경로 | 🔴 불안한 레드 / 점멸 효과 |
| **감지됨** | ✅ "체포 기회" (배지) | ⚠️ "추적 중!" (빨간 배경 + 사운드) |
| **안전 지역** | 중요도 낮음 | 🟢 강조 표시 + 빛 효과 |
| **팀 위치** | 📍 명확한 표시 | 🔒 제한된 정보 |

## �🎮 핵심 기능

### 공통 기능
- ✅ 실시간 플레이어 위치 추적
- ✅ 체포 요청 및 확인 시스템
- ✅ 지오펜싱 (범위 이탈 경고)
- ✅ 감옥 시스템 (체포된 플레이어 관리)
- ✅ 팀별 플레이어 상태 관리
- ✅ 토스트 알림 시스템
- ✅ 모바일 우선 UI/UX

## � 사용자 플로우 (User Flow)

### 1️⃣ 온보딩 (Onboarding)
```
시작 → 닉네임 입력 → 역할 인식 (경찰/도둑) → 대기실 입장
```
- 간단한 닉네임 설정
- 역할별 UX/톤 미리 보기
- 선택한 역할의 특징 설명

### 2️⃣ 대기실 (Room Lobby)
```
참가자 목록 확인 → 역할 배지 표시 → Ready 선택 → 게임 시작 대기
```
- 📍 참가 플레이어 목록
- 🎭 각 플레이어 역할 배지 (경찰/도둑)
- ✅ Ready 상태 표시
- 마스터가 게임 시작

### 3️⃣ 게임 시작 트랜지션 (Game Start Transition)
```
[준비] → 애니메이션 + 카운트다운 → [게임 시작]
```
- 전체 플레이어에게 동시 알림
- 카운트다운 애니메이션 (5초 또는 10초)
- 게임 시작 신호 (사운드 + 진동)

### 4️⃣ 게임 진행 (Game Active)

#### 📊 상단 상태 바 (Top Status Bar)
- ⏱️ **경과 시간** (게임 시작부터)
- 🎮 **게임 상태** (진행중 / 일시정지 / 종료)
- 👥 **팀 정보** (경찰/도둑 생존 인원)

#### 🎯 하단 탭 (Bottom Tabs)
| 탭 | 경찰 | 도둑 | 마스터 |
|----|------|------|--------|
| **Map** | 📍 도둑 위치 + 팀 위치 | 🔍 경찰 감지 거리 | 🗺️ 전체 맵 |
| **Jail** | ⛓️ 체포된 도둑 관리 | 🔒 감옥 상태 모니터링 | ⚖️ 감옥 현황 |
| **Rules** | 📋 경찰 규칙 | 📋 도둑 규칙 | 📋 전체 규칙 |
| **Profile** | 👤 내 프로필 | 👤 내 프로필 | 👥 전체 프로필 |

### 5️⃣ 게임 종료 (Game End)

#### 결과 요약 (Result Summary)
```
🏆 [경찰 승리 / 도둑 승리]
├─ AI 생성 게임 리포트
│  ├─ 가장 위협적인 플레이어
│  ├─ 최고의 순간
│  ├─ 전략 분석
│  └─ 통계 요약
└─ 다시하기 / 로비로 돌아가기
```

- 🤖 **AI 생성 분석**: 게임 흐름 기반 자동 생성
- 📊 **통계**: 플레이타임, 이동 거리, 체포 시도 등
- 🎬 **하이라이트**: 중요 순간 재생 (옵션)

---

## �🗺️ 라우팅 구조

| 경로 | 컴포넌트 | 설명 |
|------|---------|------|
| `/` | Onboarding | 게임 시작 화면 |
| `/home` | Home | 홈 화면 |
| `/lobby` | Lobby | 대기실 (게임 시작 전) |
| `/game` | GameMain | 메인 게임 화면 |

## 📊 개발 진행 상황

### ✅ MVP Phase 1 완료
- [x] **Frontend 프로토타입**
  - 프로젝트 초기 세팅 (React + TypeScript + Vite)
  - TailwindCSS 스타일링 시스템
  - 기본 라우팅 구조
  - Zustand 상태 관리
  - 게임 타입 정의
- [x] **UI 컴포넌트**
  - PhoneShell, TabBar, GameStatusBar
  - BottomSheet, Modal, Toast
  - 게임 화면 4개 탭 (Map, Safety, Rules, Profile)
- [x] **역할별 UX 차별화**
  - 경찰: 🔵 파란색, 명확한 정보, 팀 위치 표시
  - 도둑: 🔴 빨간색, 모호한 경고, 경찰 위치 숨김
  - 마스터: 🟢 초록색, 전체 통제
- [x] **시뮬레이터 (DevPanel)**
  - 역할 변경
  - 위치 이동
  - 체포 시뮬레이션
  - 경계 이탈 테스트
- [x] **AI 알고리즘 (룰 베이스)**
  - 이동 패턴 분석 로직
  - 위험 레벨 분류 (Normal/Warning/Danger)
  - UI 신호 생성

### 🚧 MVP Phase 2 진행 중
- [ ] **게임 플로우 완성**
  - [ ] 게임 시작 트랜지션 (카운트다운)
  - [ ] 게임 종료 화면
  - [ ] AI 생성 결과 요약
- [ ] **Backend (MVP 버전)**
  - [ ] Spring Boot 기본 설정
  - [ ] REST API (방 생성/입장/시작)
  - [ ] WebSocket 기본 통신
  - [ ] 더미 데이터 관리
- [ ] **Frontend-Backend 연동**
  - [ ] WebSocket 클라이언트
  - [ ] REST API 클라이언트
  - [ ] 실시간 상태 동기화

### 📝 Phase 3 예정 (실제 데이터)
- [ ] 실제 GPS 연동 (Geolocation API)
- [ ] GPS → 게임 좌표 변환
- [ ] AI Service (FastAPI) 서버화
- [ ] 지오펜싱 고도화
- [ ] 게임 통계 및 히스토리
- [ ] 회원가입/로그인
- [ ] 배포 준비

---

## 🔌 API 명세 (예정)

### Backend (Spring Boot) REST API

#### 인증/회원
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃

#### 게임 세션
- `POST /api/rooms` - 방 생성
- `GET /api/rooms/:roomCode` - 방 정보 조회
- `POST /api/rooms/:roomCode/join` - 방 입장
- `POST /api/rooms/:roomCode/start` - 게임 시작
- `POST /api/rooms/:roomCode/end` - 게임 종료

#### 플레이어
- `GET /api/rooms/:roomCode/players` - 플레이어 목록
- `PUT /api/players/:playerId/position` - 위치 업데이트
- `PUT /api/players/:playerId/status` - 상태 업데이트

#### 체포
- `POST /api/arrest` - 체포 요청
- `PUT /api/arrest/:arrestId/confirm` - 체포 확인

### WebSocket (실시간 통신)

#### 구독 (Subscribe)
- `/topic/rooms/:roomCode/positions` - 위치 업데이트
- `/topic/rooms/:roomCode/arrests` - 체포 알림
- `/topic/rooms/:roomCode/status` - 게임 상태 변경

#### 발행 (Publish)
- `/app/position` - 위치 전송
- `/app/arrest` - 체포 요청

### AI Service (FastAPI)

#### 위험 분류
- `POST /api/ai/classify-risk` - 이동 패턴 분석
  ```json
  {
    "playerId": "string",
    "positions": [
      { "x": 0, "y": 0, "timestamp": 0 }
    ],
    "boundary": {
      "points": [{ "x": 0, "y": 0 }],
      "radius": 100
    }
  }
  ```
  Response:
  ```json
  {
    "riskLevel": "warning",
    "reasons": ["경계 이탈 2회 감지"],
    "signals": {
      "color": "bg-yellow-500",
      "icon": "⚠️",
      "badge": "주의"
    }
  }
  ```

---

## 🗺️ 자체 지도 시스템

### 외부 API 사용 안 함
- Google Maps, Kakao Maps 등 외부 지도 API 미사용
- 자체 구현 그리드 기반 지도
- 경량화 및 커스터마이징 용이

### 좌표 변환 시스템
```
실제 GPS 좌표 → 게임 좌표 변환

1. 게임 영역 설정 (예: 학교 운동장)
   - 중심점: (위도, 경도)
   - 반경: 200m

2. 좌표 변환
   - GPS (37.xxx, 127.xxx) 
   → 상대 좌표 (dx, dy)
   → 게임 좌표 (x: 0-10, y: 0-10)

3. 그리드 표시
   - 10×10 그리드
   - 각 셀: 약 20m × 20m
```

### 지도 컴포넌트 구조
```typescript
<GameMap>
  <Grid />                    // 그리드 배경
  <Boundary />                // 지오펜스 경계
  <PlayerMarkers />           // 플레이어 위치
  <SafeZones />               // 안전 구역
  <RiskOverlay />             // AI 위험 레벨 오버레이
</GameMap>
```

### 장점
- ✅ 비용 절감 (외부 API 비용 없음)
- ✅ 완전한 커스터마이징
- ✅ 오프라인 지원 가능
- ✅ 게임에 최적화된 단순한 UI
- ✅ 빠른 렌더링

---

## 🚀 실행 방법

### 개발 서버 실행
```bash
npm install
npm run dev
```

### 빌드
```bash
npm run build
```

### 프리뷰
```bash
npm run preview
```

## � 코딩 규칙 (Coding Standards)

### 출력 요구사항 (Output Requirements)

#### 1. 컴포넌트 기반 구조
```typescript
// ✅ Good: 재사용 가능한 작은 컴포넌트
const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

// ❌ Bad: 모든 로직을 한 컴포넌트에
const GamePage = () => {
  // 500 lines of code...
};
```

#### 2. 최소한이지만 실행 가능한 코드
- 불필요한 추상화 지양
- 필요한 기능만 구현
- 테스트 가능한 상태 유지

```typescript
// ✅ Good: 단순하고 명확
const getRoleColor = (role: Role) => {
  return role === 'cop' ? 'blue' : 'red';
};

// ❌ Bad: 과도한 추상화 (MVP 단계에서)
class ColorThemeFactory {
  private strategy: ColorStrategy;
  public getColorForRole(role: Role): Color { ... }
}
```

#### 3. 명확한 파일/폴더 구조
```
src/
├── features/        # 페이지 단위 기능
├── components/      # 재사용 컴포넌트
├── utils/           # 유틸리티 함수
├── store/           # 상태 관리
└── types/           # 타입 정의
```

#### 4. 주석 작성 원칙
- **What보다 Why** 설명
- 복잡한 로직에만 주석
- 함수명으로 설명 가능하면 주석 불필요

```typescript
// ✅ Good: 의도 설명
// 도둑은 경찰 위치를 볼 수 없어야 함 (게임 규칙)
const visiblePlayers = canSeePolicePositions(role)
  ? allPlayers
  : allPlayers.filter(p => p.team === 'robber');

// ❌ Bad: 코드 반복
// visiblePlayers에 필터링된 플레이어 할당
const visiblePlayers = filter(allPlayers);
```
#### 4. 주석 작성 원칙
- **What보다 Why** 설명
- 복잡한 로직에만 주석
- 함수명으로 설명 가능하면 주석 불필요

```typescript
// ✅ Good: 의도 설명
// 도둑은 경찰 위치를 볼 수 없어야 함 (게임 규칙)
const visiblePlayers = canSeePolicePositions(role)
  ? allPlayers
  : allPlayers.filter(p => p.team === 'robber');

// ❌ Bad: 코드 반복
// visiblePlayers에 필터링된 플레이어 할당
const visiblePlayers = filter(allPlayers);
```

### 파일 네이밍 규칙

| 타입 | 규칙 | 예시 |
|------|------|------|
| **컴포넌트** | PascalCase | `GameStatusBar.tsx` |
| **페이지/기능** | PascalCase | `GameMain.tsx`, `Lobby.tsx` |
| **유틸리티** | camelCase | `roleConfig.ts`, `aiRiskClassifier.ts` |
| **타입 정의** | camelCase | `game.ts`, `api.ts` |
| **상수** | UPPER_SNAKE_CASE | `ROLE_CONFIG`, `API_ENDPOINTS` |
| **폴더** | lowercase | `components/`, `features/`, `utils/` |

### 컴포넌트 구조 템플릿

```typescript
/**
 * [컴포넌트 설명]
 * 
 * @example
 * <ComponentName prop1="value" />
 */

// 1. Imports
import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

// 2. Types/Interfaces
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

// 3. Component
const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  // 3.1. Hooks
  const [state, setState] = useState();
  const { data } = useGameStore();

  // 3.2. Handlers
  const handleClick = () => {
    // ...
  };

  // 3.3. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// 4. Export
export default ComponentName;
```
---

## �💡 개발 참고사항

### MVP 구현 범위 (Implementation Scope)

| 항목 | MVP | 향후 개선 |
|------|-----|----------|
| **위치 데이터** | ✅ 더미 데이터 사용 | 실제 GPS 연동 |
| **이동 제어** | ✅ 시뮬레이터 패널 | 실시간 위치 추적 |
| **AI 분석** | ✅ 룰 베이스 | 머신러닝 모델 |
| **초점** | ✅ **UX 플로우** | 정확도/성능 |

**MVP 철학:**
- 🎯 **UX 플로우 검증** 우선
- 🚀 **빠른 프로토타이핑**
- 🎮 **게임 경험** 중심
- 📊 정확도는 나중에

### 현재 상태
- **Frontend**: ✅ 프로토타입 완성
  - 더미 데이터로 전체 플로우 테스트 가능
  - 역할별 UX 차별화 구현
  - 시뮬레이터(DevPanel)로 게임 시나리오 테스트
- **Backend**: ⏳ 미구현 (Spring Boot 개발 예정)
- **AI Service**: ⏳ 알고리즘만 구현, FastAPI 서버 미구현
- **실제 GPS**: ⏳ 미구현, 시뮬레이터로 대체

### 다음 스텝

#### Phase 1: MVP 완성 (UX 플로우 검증)
1. **Frontend 개선**
   - [x] 더미 데이터 기반 전체 플로우
   - [x] 시뮬레이터 패널 (DevPanel)
   - [ ] 게임 시작 트랜지션 애니메이션
   - [ ] 게임 종료 화면
   - [ ] 역할별 UI 차별화 완성

2. **Backend (간소화)**
   - [ ] 기본 REST API (방 생성/입장)
   - [ ] WebSocket 기본 연동
   - [ ] 더미 데이터 저장/조회

3. **AI (룰 베이스)**
   - [ ] 간단한 if-else 규칙
   - [ ] 위험 레벨 분류 (경계 이탈만)
   - [ ] UI 신호 생성

#### Phase 2: 실제 데이터 연동
4. **실제 GPS 통합**
   - [ ] 브라우저 Geolocation API
   - [ ] GPS → 게임 좌표 변환
   - [ ] 실시간 위치 동기화

5. **AI 개선**
   - [ ] FastAPI 서버 구현
   - [ ] 이동 패턴 분석 고도화
   - [ ] 머신러닝 모델 (옵션)

### 테스트 방법
- ✅ **개발자 패널**(게임 화면 하단) 활용
  - 역할 변경 (경찰 ↔ 도둑 ↔ 마스터)
  - 위치 이동 시뮬레이션
  - 팀 랜덤 이동
  - 체포 요청/확인 테스트
  - 경계 이탈 시뮬레이션
- ✅ **시나리오 테스트**
  - 전체 게임 플로우 확인
  - 역할별 화면 차이 검증
  - 알림/토스트 동작 확인

---

**Last Updated:** 2026-01-13