# 佩欣每日工作台 Apps Script 版本

這是一個 Google Apps Script Web App 原型，用來做到「打開工作台就即時讀 Google Sheet」。目前只讀取 Kevin 提供的兩份表單：課務及客戶申請、單據核銷。

## 安全邊界

- 只讀取 Google Sheet。
- Apps Script manifest 只要求 `spreadsheets.readonly` 權限。
- `Code.gs` 使用 `getLastRow()`、`getLastColumn()`、`getRange()`、`getDisplayValues()` 讀取資料。
- 沒有使用 `setValue()`、`setValues()`、`appendRow()`、`deleteRow()`、`clear()`、`sort()` 等寫入或改動原表單的方法。
- 不會建立 Calendar、寄 Email、發 Line、更新 InfoCenter 或修改原始資料。

## 已綁定資料來源

- 課務：馴錢師財商研究中心 - 課程邀約申請表單 (回覆)
- 核銷：馴錢師報帳表單 (回應)

## 部署方式

1. 開啟 [script.google.com](https://script.google.com/) 並建立新 Apps Script 專案。
2. 新增或貼上這些檔案：
   - `Code.gs`
   - `Index.html`
   - `Styles.html`
   - `Client.html`
   - `appsscript.json`
3. 部署為 Web App。
4. 第一次開啟時授權只讀 Google Sheets。
5. 分享 Web App URL 給佩欣或測試人員。

## 讀取筆數

目前預設讀取：

- 課務：最新 300 筆
- 核銷：最新 600 筆

可在 `Client.html` 的 `getDashboardData({ courseLimit: 300, expenseLimit: 600 })` 調整。

## 後續擴充

- 加入更多工作流表單來源。
- 增加每日提醒清單。
- 佩欣確認後，再評估受控寫回 Sheet 或建立 Calendar 事件。
