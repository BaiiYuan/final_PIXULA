# [107-2] Web Programming Final Project
(Group 11) PIXULA



### 簡介

* 這是一個可以供使用者註冊登入、上傳自己的照片、編輯、分享、下載的app
* GitHub： <https://github.com/BaiiYuan/final_PIXULA>
* Demo影片連結：

### Usage

***本App有註冊功能，不建議使用常用的帳號密碼***

*無論是local或從上述網址進入皆會連接到同樣的db*

#### Local

1. git clone https://github.com/BaiiYuan/final_PIXULA
2. cd final_PIXULA
3. cd backend && npm install && npm start
4. cd frontend && npm install && npm start
5. open localhost:3000

#### Deployment

* <https://pixula.herokuapp.com/>
* **由於伺服器在長時間閒置會進入休眠，所以有時開啟要等很久（真的很久）**



### 功能

* 可以註冊帳號登入
* 可新增專案並上傳照片到自己的gallery
* 可從預設的風格庫裡選一個當作目標風格做style transfer
* 可對照片的多項屬性進行更改，亮度、模糊、色溫、彩度⋯⋯等
* 可直接套用多達42種filter
* 可在下載時裁剪並預覽照片
* 可將專案設定為公開，並可在public gallery看到自己與別人設為公開的作品
* 可以下載別人公開的專案或複製一份到自己的gallery



### 使用、參考之第三方套件、框架、程式碼

* **css**: <https://freehtml5.co/>
* **imgur**: <https://github.com/MiguhRuiz/react-imgur-upload>
* **style-transform** <https://github.com/reiinakano/arbitrary-image-stylization-tfjs>
* **filter**: <https://github.com/picturepan2/instagram.css>
* **image crop**: <https://github.com/DominicTobias/react-image-crop>
* **backend**: graphql-yoga, babel, mongoose, nodemon
* **frontend**: React, bootstrap, magenta, apollo
* **db**: mongodb
* **deployment**: heroku



### 分工

* 杜杰翰：後端、前後端連接、deployment

* 李栢淵：前端、filter、style transform

* 蔡青邑：前端、功能整合、demo影片



### 心得



