# MetroCrowd Client
![Feb-21-2023 16-34-35](https://user-images.githubusercontent.com/15665709/220310353-7231c1cd-9488-4ace-9ca0-7f50370c15a7.gif)

## Introduction

#### [2020/05/13] New Service Online

因為疫情的關係，2020/05/08的時候  
台北捷運在App中推出了[查詢「車廂擁擠度」的功能](https://www.bnext.com.tw/article/57610/mrt-app)   
讓大家能知道各列車上哪些車廂人比較多  
讓那些要上車，或是已經在車上的乘客能夠自行分流  
在這段疫情期間，是個不錯的功能😇  

不過由於台北捷運App的操作介面用起來不太直覺  
為了讓大家查詢上能更方便、更直覺一些  
我把上述的功能做成了網頁版給大家使用，叫做「[捷報](https://metrocrowd.netlify.app/)」  
希望也能透過自己的力量，為台灣的防疫盡一份心力💪  
不過因為台北捷運目前只有提供藍線的資料，所以捷報目前也只支援藍線👍

目前服務已經於2020/05/13上線哩🎉🎉🎉  
有需要的朋友可以點[這裡](https://metrocrowd.netlify.app/)用用看  
有任何回饋或是問題，都歡迎透過網頁內的email和我聯繫！  

#### [2023/03/21] Service Termination 

隨著台灣的疫情逐步趨緩、Covid19流感化，捷報也於今天正式走入歷史  
未來我不會再進行任何更新與維護啦，希望捷報在這3年中有幫助到大家！

## Project setup

### Development Environment
**Execute environment：**
- Node version: v16.16.0
- NPM version: v8.13.2

**Dependency install：**
```bash
npm install
```

**Environment variable without versioning：**  

在這個專案中， 有個`.env.local`檔案負責儲存不該加入版控的環境變數  
由於`.env.local`沒有加入版控，所以在Github上看不到他的存在  
如果要將專案clone下來開發，要記得在本地專案中自己新增`.env.local`檔案  
並且加入以下的環境變數  

| Name        | Value           |
| ------------- |:-------------:|
| `VUE_APP_GA_ID` | UA-XXXXX-Y | 

ps. 由於2023/02/21時已經移除捷報的GA code，因此不再需要`VUE_APP_GA_ID`這個環境變數

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### Server API Document

Server端API的相關說明文件  
放在[/docs/api.md](/docs/api.md)  
內容包含API的用途、Request/Response格式、範例

### Note

專案中有安裝`vue-router` & & `PWA`，但是都沒有使用到  
目前也沒有解除安裝，只有在`main.js`中把相關的import註解掉  
方便日後如果新增功能有需要，可以直接使用，不需要再額外安裝

而由於當初在vue cli創建專案時，有選擇要支援PWA  
只要有支援PWA，就算不import `/MetroCrowd/src/registerServiceWorker.js`  
執行`npm run build`完之後，`/MetroCrowd/dist`資料夾中還是會有`service-worker.js` 

所以我多撰寫了一隻`/MetroCrowd/postbuild.js`，讓他在`npm run build`執行完後自動執行    
刪除`/MetroCrowd/dist`資料夾內的`service-worker.js`  


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
