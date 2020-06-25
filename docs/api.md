# Server API 資料格式說明

由於北車有不同線交會，車輛資料是比較複雜的  
而且同時包含以下4種藍線的列車  

- 往南港展覽館
- 往頂埔
- 往亞東醫院
- 往昆陽

所以下面以取得「台北車站」的列車資料、車廂擁擠程度資料為範例進行說明  

### GET  `/station/{stationCode}`

傳入車站代碼，取得未來將經過該車站的所有列車的相關資料  

定義：
- 車站代碼(station code)：台北車站 - 051
- 車站ID (station id)：台北車站 - BL12

##### Example

`051`是台北車站的車站代碼  
透過呼叫`/station/051`，可以取得下面的資料  

**參數說明**

| 參數名稱    | 範例值                   | 說明                                          |
| ----------- |:-------------------------|:----------------------------------------------|
| flag        | `"0  "`                  |不知道是什麼數值，看不懂，只知道內容是`0`或是`1`|
| priority    | `"200"`                  | 感覺是只是排列順序，數字越小越前面，但不確定  |
| platform    | `"NR1A"`                 | 列車屬於哪一條線，像是`BL`就是藍線            |
| stnid       | `"R13"`                  | 車站ID，北車在platform NR1A(紅線)上的ID是R13  |
| tripno      | `"205       "`           | 列車ID，如果是非營運時間則會取得空字串`""`    |
| destination | `"淡水站"`               | 列車開往的終點站                              |
| countdown   | `"59:50*    "`           | 還有多久到站，如果是非營運時間則會取得`59:50*    ` |
| updatetime  | `"2020-06-25 04:23:35 "` | 資料更新時間                                  |
| nowtime     | `"2020-06-25 04:23:38 "` | 取得資料的時間                                |
| diffsec     | `"3"`                    | 列車進站可能的誤差時間(秒)                    |

**Response payload**

```json
[{
	"flag": "1  ",
	"priority": "200",
	"platform": "NR1A",
	"stnid": "R13 ",
	"tripno": "103       ",
	"destination": "淡水站",
	"countdown": "04:41     ",
	"updatetime": "2020-06-25 07:36:55 ",
	"nowtime": "2020-06-25 07:37:04 ",
	"diffsec": "9"
}, {
	"flag": "1  ",
	"priority": "220",
	"platform": "NR1A",
	"stnid": "R13 ",
	"tripno": "143       ",
	"destination": "北投站",
	"countdown": "00:13     ",
	"updatetime": "2020-06-25 07:36:55 ",
	"nowtime": "2020-06-25 07:37:04 ",
	"diffsec": "9"
}, {
	"flag": "1  ",
	"priority": "290",
	"platform": "NR1A",
	"stnid": "R13 ",
	"tripno": "107       ",
	"destination": "象山站",
	"countdown": "04:24     ",
	"updatetime": "2020-06-25 07:36:55 ",
	"nowtime": "2020-06-25 07:37:04 ",
	"diffsec": "9"
}, {
	"flag": "1  ",
	"priority": "295",
	"platform": "NR1A",
	"stnid": "R13 ",
	"tripno": "133       ",
	"destination": "大安站",
	"countdown": "07:36     ",
	"updatetime": "2020-06-25 07:36:57 ",
	"nowtime": "2020-06-25 07:37:04 ",
	"diffsec": "7"
}, {
	"flag": "1  ",
	"priority": "510",
	"platform": "BL1",
	"stnid": "BL07 ",
	"tripno": "205       ",
	"destination": "南港展覽館站",
	"countdown": "04:48     ",
	"updatetime": "2020-06-25 07:36:36 ",
	"nowtime": "2020-06-25 07:37:04 ",
	"diffsec": "28"
}, {
	"flag": "1  ",
	"priority": "530",
	"platform": "BL1",
	"stnid": "BL07 ",
	"tripno": "221       ",
	"destination": "頂埔站",
	"countdown": "07:23     ",
	"updatetime": "2020-06-25 07:36:56 ",
	"nowtime": "2020-06-25 07:37:04 ",
	"diffsec": "8"
}]
```

### GET `/train/{trainId}`
傳入列車ID，取得列車的車廂擁擠程度資料  

##### Example

`205`是某個時刻，台北車站往南港展覽館的列車ID  
透過呼叫`/train/205`，可以取得下面的資料  


**參數說明**

| 參數名稱    | 範例值                   | 說明                                         |
| ----------- |:-------------------------|:---------------------------------------------|
| updatetime  | `"2020-06-25 07:37:10"` | 資料更新時間                                  |
| CID         | `"2"`                   | 不知道是什麼數值，看不懂                      |
| Cart6W      | `"3.486"`               | 第6節車廂的車廂壓力值                       |
| Cart6L      | `"1"`                   | 第6節車廂的擁擠程度，                         |
| Cart5W      | `"3.933"`               | 第5節車廂的的車廂壓力值                       |
| Cart5L      | `"2"`                   | 第5節車廂的擁擠程度                           |
| Cart4W      | `"3.645"`               | 第4節車廂的車廂壓力值                       |
| Cart4L      | `"1"`                   | 第4節車廂的擁擠程度                           |
| Cart3W      | `"3.497"`                | 第3節車廂的車廂壓力值                       |
| Cart3L      | `"1"`                   | 第3節車廂的擁擠程度                           |
| Cart2W      | `"3.638"`               | 第2節車廂的車廂壓力值                       |
| Cart2L      | `"1"`                   | 第2節車廂的擁擠程度                           |
| Cart1W      | `"3.478"`               | 第1節車廂的車廂壓力值                       |
| Cart1L      | `"1"`                   | 第1節車廂的擁擠程度                           |
| TrainNumber | `"205"`                 | 列車ID                                        |
| StationID   | `"BL10"`               | 現在所在的車站ID                              |

`Cart6W`的W是Weight，代表車廂承受的重量，單位不確定
`Cart6L`的L是Level，代表擁擠程度，共有`0`,`1`,`2`,`3`,`4`，5種數值
- Level1：舒適(綠色)
- Level2 & Level0：普通(黃色)
- Level3：略多(橘色)
- Level4：人多(紅色)

**Response payload**

```json
{
	"updateTime": "2020-06-25 07:37:10",
	"CID": "2",
	"Cart6W": "3.486",
	"Cart6L": "1",
	"Cart5W": "3.933",
	"Cart5L": "2",
	"Cart4W": "3.645",
	"Cart4L": "1",
	"Cart3W": "3.497",
	"Cart3L": "1",
	"Cart2W": "3.638",
	"Cart2L": "1",
	"Cart1W": "3.478",
	"Cart1L": "1",
	"TrainNumber": "205",
	"StationID": "BL10"
}
```
