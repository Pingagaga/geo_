# AERO

AERO 是一個以瀏覽器執行的 AI 課程探索研究原型，用來呈現不同的 AI 輔助流程、課程情境與推薦結果，並記錄受測者的操作與問卷資料。專案另附 Hahow 課程資料擷取及課程時數補齊工具。

## 功能概覽

- 純 HTML、CSS、JavaScript 前端，不需要建置或前端套件管理器
- 受測者流程、AI 體驗順序及四種實驗情境
- 研究者模式與後台儀表板
- 使用瀏覽器 `localStorage` 保存進度、事件紀錄及問卷結果
- 後台資料可匯出為 CSV，或複製為 JSON
- 從 Hahow 課程／合輯網址擷取課程中繼資料
- 驗證課程資料並補齊缺少的課程時數

## 專案結構

```text
.
├── README.md
└── geo_
    ├── AERO.html                    # 前端頁面與研究後台
    ├── AERO.css                     # 樣式
    ├── AERO.js                      # 實驗流程、課程資料與本機儲存邏輯
    ├── hahow_courses_scraper.py     # Hahow 課程資料擷取工具
    ├── fill_hours.py                # 課程時數補齊工具
    ├── my_input_urls.xlsx           # 擷取工具的預設輸入
    ├── hahow_courses.xlsx           # 擷取工具的預設輸出
    ├── courseData.generated.jsfrag  # 產生的前端課程資料片段
    └── courseData.validation.json   # 課程資料驗證摘要
```

## 啟動前端

前端沒有安裝步驟。可直接開啟 `geo_/AERO.html`，或在專案根目錄啟動本機伺服器：

```powershell
python -m http.server 8000 --directory geo_
```

接著開啟：

- 受測者入口：<http://localhost:8000/AERO.html>
- 研究者入口：<http://localhost:8000/AERO.html?role=researcher>
- 直接進入研究後台：<http://localhost:8000/AERO.html?role=researcher&backend=1>

研究資料只會保存在目前瀏覽器與來源網域的 `localStorage` 中；清除瀏覽器網站資料、改用其他瀏覽器，或更換連接埠後，原資料將不會出現在新環境。需要保留資料時，請先從後台匯出 CSV 或複製 JSON。

## 課程資料工具

需要 Python 3.10 以上及下列套件：

```powershell
python -m pip install pandas requests beautifulsoup4 openpyxl
```

所有指令建議在 `geo_` 目錄執行：

```powershell
Set-Location geo_
```

### 擷取 Hahow 課程資料

輸入 Excel 必須包含 `course_url` 欄位。工具會去除重複網址、保留輸出檔中已有有效時數的資料，並輸出課程名稱、價格、購買數、評分、總時數、狀態與錯誤訊息。

```powershell
python hahow_courses_scraper.py
```

指定其他檔案：

```powershell
python hahow_courses_scraper.py --input input.xlsx --output output.xlsx
```

預設輸入為 `my_input_urls.xlsx`，預設輸出為 `hahow_courses.xlsx`。程式會呼叫 Hahow API 與課程頁面，執行時需要網路連線，並會在請求之間加入延遲。

### 補齊課程時數

目標 Excel 必須同時包含 `course_url` 與 `total_hours` 欄位。已有正數時數的列會略過；缺少時數的列會嘗試從頁面解析。無法解析時，工具目前會以隨機的 3、4 或 5 小時作為備援值，並直接覆寫指定檔案。

```powershell
python fill_hours.py --file hahow_courses.xlsx
```

建議執行前先備份工作簿，並人工檢查輸出中的備援值。

## 修改課程資料

前端使用的課程陣列位於 `geo_/AERO.js` 開頭的 `courseData`。更新爬取結果後，請同步產生或更新 `courseData.generated.jsfrag`，確認 `courseData.validation.json` 沒有非預期的缺值，再將資料整合回 `AERO.js`。

## 注意事項

- Google Fonts 與 Hahow 課程連結需要網路連線；核心前端互動可在本機執行。
- 擷取工具依賴第三方 API 與頁面結構，對方變更後可能需要調整解析邏輯。
- 請遵守資料來源網站的服務條款、存取頻率限制及適用的隱私規範。
- 研究資料可能包含受測者輸入；分享或匯出前請先確認資料治理與去識別化要求。

