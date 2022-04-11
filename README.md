# Music-Client

![Badge](https://img.shields.io/badge/React-61DAFB.svg?&logo=React&logoColor=fff)
![Badge](https://img.shields.io/badge/CreateReactApp-09D3AC.svg?&logo=CreateReactApp&logoColor=fff)
![Badge](https://img.shields.io/badge/ReactRouter-CA4245.svg?&logo=ReactRouter&logoColor=fff)
![Badge](https://img.shields.io/badge/Sass-CC6699.svg?&logo=Sass&logoColor=fff)
![Badge](https://img.shields.io/badge/styledcomponents-DB7093.svg?&logo=styledcomponents&logoColor=fff)
![Badge](https://img.shields.io/badge/AntDesign-0170FE.svg?&logo=AntDesign&logoColor=fff)

### music-client 사이트
---
- 프로젝트 소요 기간: 16일
- 사이트 주소: https://ene8255.github.io/music-client/
---
- 각 카테고리에 맞는 플레이리스트와 노래 정보를 등록 또는 수정할 수 있고,   
랜덤으로 노래를 추천 받을 수 있는 기능이 있는 프로젝트 사이트 입니다.   

- 페이지 디자인은 Spotify 웹플레이어 사이트의 디자인을 참고하였습니다.
<br/>

- 기능
> - 데이터베이스로부터 플레이리스트 전체 목록 데이터와 각 플레이리스트의 노래 목록 데이터를 가져와서 화면에 나타냅니다. 
> - 노래 제목을 클릭하면 상세한 노래 정보를 볼 수 있는 페이지로 이동합니다. (READ, GET)
> <img src='https://user-images.githubusercontent.com/86288109/157594249-3469dc6e-ea82-4eef-9b10-3451031f8867.gif' width='85%'>
<br/>

> - 전체 노래 데이터 중에서 입력한 수 만큼의 곡을 랜덤으로 가져와 추천해주는 기능이 있습니다.
> <img src='https://user-images.githubusercontent.com/86288109/157594330-bb788f8a-152e-4007-99ff-03e9dcc17f55.gif' width='85%'>
<br/>

> - 노래 제목, 아티스트, 앨범명으로 노래를 검색할 수 있는 기능이 있습니다. 
> - input의 value가 바뀔때마다 데이터베이스로부터 데이터를 가져와서 검색 결과가 계속 갱신됩니다.
> <img src='https://user-images.githubusercontent.com/86288109/157594507-ecea0e7a-2c50-4634-affc-344697e2090d.gif' width='85%'>
<br/>

> - 플레이리스트 생성 페이지와 노래 추가하기 페이지의 form 양식에 맞게 데이터를 입력하고 submit 버튼을 클릭하면 새로운 플레이리스트와 노래를 추가할 수 있습니다. (CREATE, POST)
> - 데이터 유효성 검사를 통해 양식에 맞지 않는 데이터를 입력하거나 비어 있는 칸이 있을 경우 submit이 되지 않습니다. 
<br/>

> - 플레이리스트 페이지에서 수정하기 버튼을 클릭하면 플레이리스트 정보를 수정할 수 있고, 노래 정보를 볼 수 있는 페이지에서 수정하기 버튼을 클릭하면 노래 정보를 수정할 수 있는 페이지로 이동합니다. (UPDATE)
<br/>

> - 플레이리스트 페이지에서 삭제 버튼을 클릭하면 플레이리스트를 삭제할 수 있고, 노래 목록의 휴지통 버튼을 클릭하면 각각의 노래를 삭제할 수 있습니다. (DELETE)

