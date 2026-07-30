# 고양이 인터랙션 1차 프로토타입

## 확인 방법

개발 서버를 실행한 뒤 `http://localhost:3000/?cats=1`로 접속한다.
일반 주소에는 실험 UI와 고양이가 나타나지 않는다.

실험 모드:

- `2D`: 누끼 사진을 그대로 이동한다.
- `2.5D`: 방향, 원근, 점프, 접지 그림자를 적용하고 도착하면 앉은 자세로 바꾼다.
- `영상`: 원본 MOV에서 추출해 누끼 처리한 프레임을 이동 중 재생한다.
- `AI`: 생성형 배경 교체 후 크로마키를 제거한 두 고양이 누끼를 보여준다.
- `3D`: WebGL 기본 메시로 만든 검은 고양이가 걷고 앉는 상태를 시험한다.

## 자산 처리

원본 1.5GB는 복제하지 않고 `/Users/minhyun/Desktop/wedding-invitation/cats`에 그대로 둔다.
웹에서 사용하는 최적화 결과만 `public/cats`에 저장한다.

사진 누끼:

```sh
swift scripts/remove-cat-background.swift <input-image> <output-png> [instance-number]
```

영상 탐색용 프레임 추출:

```sh
swift scripts/extract-video-frames.swift <input-video> <output-directory> [interval-seconds]
```

검은 털과 어두운 침구가 겹치거나 움직임이 빠른 영상 프레임은 전경 마스크가
배경 일부를 함께 잡거나 고양이를 감지하지 못할 수 있다. 실제 배포용 영상은
짧은 구간을 먼저 선정하고 프레임별 마스크를 보정해야 한다.

## 실제 3D로 확장할 때

현재 `2.5D`는 투명 고양이 이미지를 원근 공간에 배치한 방식이고, `3D`는 기본
지오메트리로 실제 WebGL 이동과 자세 전환을 검증하는 방식이다. 두 고양이와 정확히
닮은 모델로 교체하려면 텍스처와 뼈대, `idle`, `walk`, `sit` 애니메이션이 포함된
GLB 파일이 필요하다. 같은 고양이를 여러 방향에서 촬영한 자료를 확보한 뒤 모델
생성과 리깅을 별도 단계로 진행한다.
