(function () {
  const courseHeaders = [
    "第 1 欄",
    "課程希望執行年度",
    "您的單位全名 (含部門、中心、組別)",
    "您的姓名/職稱",
    "您的聯絡電話 (若有分機請備註)",
    "您的聯絡 Email",
    "貴單位的單位屬性",
    "貴單位所屬領域",
    "期待的課程主題?",
    "期待的課程目的? ( 例如解決實務中常發現的現象、需求、或是改善服務中的困擾等 )",
    "規劃師溝通聚焦",
    "期待的服務項目?",
    "期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)",
    "預計舉辦課程的地點?(縣市+區域，或有詳細地址也可唷)",
    "期待的授課型態",
    "課程總時數",
    "預計參與人數",
    "主要參與對象  ( 請選擇最接近的為主 )",
    "學員樣貌描述 ( 請盡可能詳細說明，如性別、年齡、背景、工作、特殊議題、先前是否接觸過相關主題等 )",
    "您是如何知道馴錢師的呢?",
    "您會想邀約馴錢師合作的原因 (可複選)",
    "貴單位是否同意支付講師鐘點費? ( 費用細節會另外致電詳談 )",
    "鐘點費金額(每小時)，或出席費金額",
    "此次課程經費來源為何?",
    "呈上題, 請問方案的計畫名稱? (若無，請填無)",
    "貴單位交通費補助標準為何?",
    "呈上題，若為實報實銷，可以核銷的交通工具為何? (複選)",
    "呈上題，若為定額補助，補助金額為多少?",
    "是否提供停車位或車站接送服務？",
    "若講師為跨區，且課程開始時間較早，是否可提供住宿費?",
    "呈上題，貴單位提供住宿費的標準為何?",
    "課程後我們將開立「發票」供貴單位核銷使用，您是否同意?",
    "呈上題，若可接受開立發票，請提供貴單位的「抬頭與統編」",
    "電子郵件地址",
    "發票特殊備註",
    "有購買教材的本數",
    "講師安排",
    "助教安排",
    "授課日期時段",
    "素菁發票開立紀錄",
    "佩欣建檔備註",
    "指派規劃師"
  ];

  const expenseHeaders = [
    "時間戳記",
    "專案類別",
    "訪視/課程/諮詢日期",
    "請款人",
    "經手人",
    "單據用途",
    "核銷類別",
    "單據數量",
    "行程起訖點說明",
    "高鐵",
    "臺鐵",
    "捷運/公車（悠遊卡加值）",
    "客運",
    "計程車",
    "租車",
    "機票",
    "船票",
    "過路費",
    "停車費",
    "機車油資金額",
    "汽車油資金額",
    "住宿費",
    "會談場所消費",
    "延伸費單據數量",
    "郵資",
    "影印費",
    "文具/耗材費",
    "信扶個案產品試吃試用費",
    "信扶協助個案行銷費",
    "信扶個案營運設備費",
    "信扶個案輔導相關費用",
    "活動場地費",
    "活動餐費/茶點費",
    "教材費/影印費",
    "運費",
    "匯費",
    "社工師積分費",
    "講師鐘點費",
    "出席費",
    "保母費",
    "獎金/禮券",
    "稿費",
    "工讀費",
    "單據費用總計",
    "單據日期",
    "辦公室單據用途",
    "郵資(運費、快遞費)",
    "公司餐費",
    "交通費",
    "雜支費",
    "文具費",
    "設備費",
    "軟體費",
    "工作內容說明",
    "工作時數",
    "電話費"
  ];

  const sheetSources = [
    {
      kind: "course",
      label: "課務",
      title: "馴錢師財商研究中心 - 課程邀約申請表單 (回覆)",
      spreadsheetId: "1OOZ9CuvDNgRLqHUIp1sdnEXD2XvcThlI2bLbT96c5RI",
      gid: "74835381",
      sheetName: "表單回應 1",
      rows: 624,
      columns: 44,
      url: "https://docs.google.com/spreadsheets/d/1OOZ9CuvDNgRLqHUIp1sdnEXD2XvcThlI2bLbT96c5RI/edit?gid=74835381#gid=74835381"
    },
    {
      kind: "expense",
      label: "核銷",
      title: "馴錢師報帳表單 (回應)",
      spreadsheetId: "1dm_IzX4kfnFWdi-gx-bcg2jPmYCrEyq_zELZgHlr39s",
      gid: "1469518282",
      sheetName: "表單回應 1",
      rows: 8649,
      columns: 76,
      url: "https://docs.google.com/spreadsheets/d/1dm_IzX4kfnFWdi-gx-bcg2jPmYCrEyq_zELZgHlr39s/edit?gid=1469518282#gid=1469518282"
    }
  ].map((source) => ({
    ...source,
    csvUrl: `https://docs.google.com/spreadsheets/d/${source.spreadsheetId}/export?format=csv&gid=${source.gid}`
  }));

  const demoCourseRows = [
    {
      "第 1 欄": "2026/5/27 下午 2:10:00",
      "課程希望執行年度": "115年",
      "您的單位全名 (含部門、中心、組別)": "OO市家庭服務中心",
      "您的姓名/職稱": "王OO / 社工師",
      "您的聯絡電話 (若有分機請備註)": "02-0000-0000#12",
      "您的聯絡 Email": "sample-course-1@example.org",
      "貴單位的單位屬性": "地方局處與直屬單位",
      "貴單位所屬領域": "社政",
      "期待的課程主題?": "家庭財務整理與風險提醒",
      "期待的課程目的? ( 例如解決實務中常發現的現象、需求、或是改善服務中的困擾等 )": "希望第一線同仁能用簡單工具與服務對象討論收支。",
      "期待的服務項目?": "工作坊 (單日或3天內系列)",
      "期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)": "6/18 09:00-12:00 或 6/25 09:00-12:00",
      "預計舉辦課程的地點?(縣市+區域，或有詳細地址也可唷)": "台北市中正區",
      "期待的授課型態": "實體授課",
      "課程總時數": "3",
      "預計參與人數": "25",
      "主要參與對象  ( 請選擇最接近的為主 )": "社工",
      "貴單位是否同意支付講師鐘點費? ( 費用細節會另外致電詳談 )": "同意",
      "鐘點費金額(每小時)，或出席費金額": "2000/時",
      "此次課程經費來源為何?": "政府方案",
      "貴單位交通費補助標準為何?": "憑單據實報實銷",
      "課程後我們將開立「發票」供貴單位核銷使用，您是否同意?": "同意",
      "講師安排": "",
      "助教安排": "",
      "授課日期時段": "",
      "素菁發票開立紀錄": "",
      "佩欣建檔備註": "",
      "指派規劃師": ""
    },
    {
      "第 1 欄": "2026/5/27 下午 4:20:00",
      "課程希望執行年度": "115年",
      "您的單位全名 (含部門、中心、組別)": "OO大學資源教室",
      "您的姓名/職稱": "陳OO / 輔導老師",
      "您的聯絡電話 (若有分機請備註)": "",
      "您的聯絡 Email": "sample-course-2@example.edu",
      "貴單位的單位屬性": "其他",
      "貴單位所屬領域": "教育",
      "期待的課程主題?": "學生基礎理財入門",
      "期待的服務項目?": "講座 (單次3小時不連貫)",
      "期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)": "",
      "預計舉辦課程的地點?(縣市+區域，或有詳細地址也可唷)": "線上",
      "期待的授課型態": "線上視訊",
      "課程總時數": "2",
      "預計參與人數": "15",
      "主要參與對象  ( 請選擇最接近的為主 )": "大學生",
      "貴單位是否同意支付講師鐘點費? ( 費用細節會另外致電詳談 )": "需另外討論",
      "課程後我們將開立「發票」供貴單位核銷使用，您是否同意?": "",
      "講師安排": "待 Ivy 確認",
      "助教安排": "",
      "授課日期時段": "",
      "佩欣建檔備註": "",
      "指派規劃師": "Sunny"
    },
    {
      "第 1 欄": "2026/5/26 上午 9:35:00",
      "課程希望執行年度": "115年",
      "您的單位全名 (含部門、中心、組別)": "OO基金會培力組",
      "您的姓名/職稱": "林OO / 專員",
      "您的聯絡電話 (若有分機請備註)": "03-0000-0000",
      "您的聯絡 Email": "sample-course-3@example.org",
      "貴單位的單位屬性": "民間單位",
      "貴單位所屬領域": "社政",
      "期待的課程主題?": "弱勢家庭財務陪伴",
      "期待的服務項目?": "講座 (單次3小時不連貫)",
      "期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)": "7/12 14:00-16:00",
      "預計舉辦課程的地點?(縣市+區域，或有詳細地址也可唷)": "新竹市",
      "期待的授課型態": "實體授課",
      "課程總時數": "2",
      "預計參與人數": "30",
      "主要參與對象  ( 請選擇最接近的為主 )": "社福從業人員",
      "貴單位是否同意支付講師鐘點費? ( 費用細節會另外致電詳談 )": "同意",
      "鐘點費金額(每小時)，或出席費金額": "2000/時",
      "此次課程經費來源為何?": "企業贊助",
      "貴單位交通費補助標準為何?": "定額補助",
      "呈上題，若為定額補助，補助金額為多少?": "1000",
      "課程後我們將開立「發票」供貴單位核銷使用，您是否同意?": "同意",
      "講師安排": "慧璇",
      "助教安排": "佳恩",
      "授課日期時段": "115/07/12，1400-1600",
      "素菁發票開立紀錄": "",
      "佩欣建檔備註": "",
      "指派規劃師": "素菁"
    }
  ];

  const demoExpenseRows = [
    {
      "時間戳記": "2026/5/26 下午 5:22:00",
      "專案類別": "單位課程",
      "訪視/課程/諮詢日期": "2026/5/24",
      "請款人": "講師A",
      "經手人": "佩欣",
      "單據用途": "OO中心課程交通",
      "核銷類別": "差旅費用",
      "單據數量": "2",
      "行程起訖點說明": "台北-台中，高鐵來回",
      "高鐵": "1400",
      "計程車": "250",
      "單據費用總計": "1650",
      "單據日期": "2026/5/24"
    },
    {
      "時間戳記": "2026/5/26 下午 6:10:00",
      "專案類別": "信扶專案",
      "訪視/課程/諮詢日期": "2026/5/20",
      "請款人": "引導員B",
      "經手人": "佩欣",
      "單據用途": "個案訪視交通",
      "核銷類別": "差旅費用",
      "單據數量": "",
      "行程起訖點說明": "",
      "汽車油資金額": "560",
      "停車費": "80",
      "單據費用總計": "600",
      "單據日期": "2026/5/20"
    },
    {
      "時間戳記": "2026/5/25 上午 11:02:00",
      "專案類別": "辦公室",
      "訪視/課程/諮詢日期": "2026/5/25",
      "請款人": "行政C",
      "經手人": "佩欣",
      "單據用途": "教材列印",
      "核銷類別": "辦公室費用",
      "單據數量": "1",
      "影印費": "320",
      "單據費用總計": "320",
      "單據日期": ""
    }
  ];

  const amountColumns = expenseHeaders.filter((header) => {
    return ![
      "時間戳記",
      "專案類別",
      "訪視/課程/諮詢日期",
      "請款人",
      "經手人",
      "單據用途",
      "核銷類別",
      "單據數量",
      "行程起訖點說明",
      "延伸費單據數量",
      "單據費用總計",
      "單據日期",
      "辦公室單據用途",
      "工作內容說明",
      "工作時數"
    ].includes(header);
  });

  const travelColumns = [
    "高鐵",
    "臺鐵",
    "捷運/公車（悠遊卡加值）",
    "客運",
    "計程車",
    "租車",
    "機票",
    "船票",
    "過路費",
    "停車費",
    "機車油資金額",
    "汽車油資金額",
    "交通費"
  ];

  const courseRequired = [
    ["您的單位全名 (含部門、中心、組別)", "單位"],
    ["您的姓名/職稱", "聯絡人"],
    ["您的聯絡電話 (若有分機請備註)", "電話"],
    ["您的聯絡 Email", "Email"],
    ["期待的課程主題?", "課程主題"],
    ["期待的服務項目?", "服務項目"],
    ["期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)", "授課時段"],
    ["預計舉辦課程的地點?(縣市+區域，或有詳細地址也可唷)", "地點"],
    ["課程總時數", "總時數"],
    ["預計參與人數", "參與人數"],
    ["貴單位是否同意支付講師鐘點費? ( 費用細節會另外致電詳談 )", "鐘點費同意"],
    ["課程後我們將開立「發票」供貴單位核銷使用，您是否同意?", "發票同意"]
  ];

  const state = {
    source: "demo",
    currentView: "dashboard",
    courseFilter: "all",
    expenseFilter: "all",
    search: "",
    showOkDrafts: false,
    courseRows: addRowNumbers(demoCourseRows),
    expenseRows: addRowNumbers(demoExpenseRows)
  };

  const elements = {
    viewTitle: document.getElementById("view-title"),
    sourceStatus: document.getElementById("source-status"),
    sheetSourceList: document.getElementById("sheet-source-list"),
    summaryGrid: document.getElementById("summary-grid"),
    priorityList: document.getElementById("priority-list"),
    priorityCount: document.getElementById("priority-count"),
    courseTable: document.getElementById("course-table"),
    expenseTable: document.getElementById("expense-table"),
    draftGrid: document.getElementById("draft-grid"),
    courseFields: document.getElementById("course-fields"),
    expenseFields: document.getElementById("expense-fields"),
    toast: document.getElementById("toast"),
    search: document.getElementById("search-input"),
    showOkDrafts: document.getElementById("show-ok-drafts")
  };

  function cleanHeader(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function addRowNumbers(rows) {
    return rows.map((row, index) => ({
      ...normalizeObject(row),
      __rowNumber: index + 2
    }));
  }

  function normalizeObject(row) {
    const normalized = {};
    Object.entries(row).forEach(([key, value]) => {
      normalized[cleanHeader(key)] = value == null ? "" : String(value).trim();
    });
    return normalized;
  }

  function value(row, key) {
    return row[cleanHeader(key)] || "";
  }

  function pick(row, candidates) {
    for (const candidate of candidates) {
      const found = value(row, candidate);
      if (found) return found;
    }
    return "";
  }

  function moneyNumber(input) {
    const text = String(input || "").replace(/[,，\s$元]/g, "");
    if (!text) return 0;
    const number = Number(text);
    return Number.isFinite(number) ? number : 0;
  }

  function formatMoney(amount) {
    return `$${Math.round(amount).toLocaleString("zh-TW")}`;
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let inQuotes = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];

      if (char === '"' && inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(cell);
        cell = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") index += 1;
        row.push(cell);
        if (row.some((item) => item.trim() !== "")) rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }

    row.push(cell);
    if (row.some((item) => item.trim() !== "")) rows.push(row);

    const headers = (rows.shift() || []).map(cleanHeader);
    return rows.map((items, index) => {
      const output = {};
      headers.forEach((header, headerIndex) => {
        output[header] = items[headerIndex] || "";
      });
      output.__rowNumber = index + 2;
      return normalizeObject(output);
    });
  }

  function analyzeCourse(row) {
    const missing = courseRequired
      .filter(([key]) => !value(row, key))
      .map(([, label]) => label);
    const speaker = value(row, "講師安排");
    const classTime = value(row, "授課日期時段");
    const planner = value(row, "指派規劃師");
    const notes = value(row, "佩欣建檔備註");
    const topic = value(row, "期待的課程主題?");
    const unit = value(row, "您的單位全名 (含部門、中心、組別)");
    const requestedTime = value(row, "期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)");

    const tags = [];
    if (missing.length) tags.push({ type: "danger", label: `缺 ${missing.length} 欄` });
    if (!speaker) tags.push({ type: "warning", label: "待派講師" });
    if (speaker && !classTime) tags.push({ type: "warning", label: "待定授課時段" });
    if (classTime && !notes) tags.push({ type: "info", label: "待確認 Calendar/建檔" });
    if (!planner) tags.push({ type: "warning", label: "未指派規劃師" });
    if (!tags.length) tags.push({ type: "ok", label: "可追後續資料" });

    const nextSteps = [];
    if (missing.length) nextSteps.push(`請補：${missing.join("、")}`);
    if (!speaker) nextSteps.push("轉給 Ivy / 素菁確認講師安排");
    if (speaker && !classTime) nextSteps.push("確認正式授課日期時段");
    if (classTime && !notes) nextSteps.push("確認是否已建立 Calendar 與內部備註");
    if (!planner) nextSteps.push("補上指派規劃師");
    if (!nextSteps.length) nextSteps.push("進入課綱、講師資料與簡報追蹤");

    return {
      type: "course",
      row,
      source: `課務 R${row.__rowNumber}`,
      title: unit || "(未填單位)",
      subtitle: topic || "(未填主題)",
      severity: missing.length ? "danger" : !speaker || !classTime || !planner ? "warning" : "ok",
      tags,
      missing,
      nextSteps,
      searchable: [unit, topic, speaker, planner, requestedTime].join(" "),
      draft: buildCourseDraft(row, missing, nextSteps)
    };
  }

  function buildCourseDraft(row, missing, nextSteps) {
    const unit = value(row, "您的單位全名 (含部門、中心、組別)") || "未填單位";
    const topic = value(row, "期待的課程主題?") || "未填主題";
    const date = pick(row, [
      "授課日期時段",
      "期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)"
    ]) || "待確認";
    const place = value(row, "預計舉辦課程的地點?(縣市+區域，或有詳細地址也可唷)") || "待確認";
    const hours = value(row, "課程總時數") || "待確認";
    const people = value(row, "預計參與人數") || "待確認";
    const fee = value(row, "鐘點費金額(每小時)，或出席費金額") || value(row, "貴單位是否同意支付講師鐘點費? ( 費用細節會另外致電詳談 )") || "待確認";

    return [
      "【課務邀約整理】",
      `單位：${unit}`,
      `主題：${topic}`,
      `日期：${date}`,
      `地點：${place}`,
      `時數 / 人數：${hours} / ${people}`,
      `費用：${fee}`,
      missing.length ? `缺資料：${missing.join("、")}` : "缺資料：目前未發現必要欄位缺漏",
      `建議下一步：${nextSteps[0] || "請確認後續追蹤"}`
    ].join("\n");
  }

  function analyzeExpense(row) {
    const missing = [];
    [
      ["專案類別", "專案"],
      ["訪視/課程/諮詢日期", "日期"],
      ["請款人", "請款人"],
      ["單據用途", "用途"],
      ["核銷類別", "類別"],
      ["單據費用總計", "總計"]
    ].forEach(([key, label]) => {
      if (!value(row, key)) missing.push(label);
    });

    const detailSum = amountColumns.reduce((sum, column) => sum + moneyNumber(value(row, column)), 0);
    const total = moneyNumber(value(row, "單據費用總計"));
    const diff = detailSum - total;
    const hasTravel = travelColumns.some((column) => moneyNumber(value(row, column)) > 0);
    const travelNeedsRoute = hasTravel && !value(row, "行程起訖點說明");
    const needsReceiptCount = detailSum > 0 && !value(row, "單據數量");
    const needsReceiptDate = detailSum > 0 && !value(row, "單據日期");

    const tags = [];
    if (missing.length) tags.push({ type: "danger", label: `缺 ${missing.length} 欄` });
    if (Math.abs(diff) >= 1) tags.push({ type: "danger", label: "金額不一致" });
    if (travelNeedsRoute) tags.push({ type: "warning", label: "缺行程起訖" });
    if (needsReceiptCount) tags.push({ type: "warning", label: "缺單據數量" });
    if (needsReceiptDate) tags.push({ type: "warning", label: "缺單據日期" });
    if (!tags.length) tags.push({ type: "ok", label: "金額可初步通過" });

    const nextSteps = [];
    if (missing.length) nextSteps.push(`請補：${missing.join("、")}`);
    if (Math.abs(diff) >= 1) nextSteps.push(`明細加總 ${formatMoney(detailSum)}，與總計差 ${formatMoney(diff)}`);
    if (travelNeedsRoute) nextSteps.push("交通費需補行程起訖點");
    if (needsReceiptCount) nextSteps.push("補單據數量，方便核對紙本或照片");
    if (needsReceiptDate) nextSteps.push("補單據日期");
    if (!nextSteps.length) nextSteps.push("可進入人工核對單據影像與專案規則");

    const claimant = value(row, "請款人") || "(未填請款人)";
    const project = value(row, "專案類別") || "(未填專案)";
    const purpose = value(row, "單據用途") || "(未填用途)";

    return {
      type: "expense",
      row,
      source: `核銷 R${row.__rowNumber}`,
      title: claimant,
      subtitle: `${project} · ${purpose}`,
      severity: missing.length || Math.abs(diff) >= 1 ? "danger" : travelNeedsRoute || needsReceiptCount || needsReceiptDate ? "warning" : "ok",
      tags,
      missing,
      detailSum,
      total,
      diff,
      nextSteps,
      searchable: [claimant, project, purpose, value(row, "核銷類別")].join(" "),
      draft: buildExpenseDraft(row, detailSum, total, diff, nextSteps)
    };
  }

  function buildExpenseDraft(row, detailSum, total, diff, nextSteps) {
    const claimant = value(row, "請款人") || "您好";
    const project = value(row, "專案類別") || "未填專案";
    const purpose = value(row, "單據用途") || "未填用途";
    const date = value(row, "訪視/課程/諮詢日期") || "未填日期";
    const issue = nextSteps[0] || "目前金額可初步通過，仍需人工核對單據。";

    return [
      `${claimant} 您好，`,
      `這筆核銷資料我先整理到工作台了：${project} / ${purpose} / ${date}`,
      `表單總計：${formatMoney(total)}；明細加總：${formatMoney(detailSum)}。`,
      Math.abs(diff) >= 1 ? `目前差額：${formatMoney(diff)}，想請您協助確認金額或分類。` : "金額目前初步一致。",
      `待確認事項：${issue}`
    ].join("\n");
  }

  function getAnalyses() {
    const course = state.courseRows.map(analyzeCourse);
    const expense = state.expenseRows.map(analyzeExpense);
    const query = state.search.trim().toLowerCase();
    if (!query) return { course, expense };
    return {
      course: course.filter((item) => `${item.searchable} ${item.draft}`.toLowerCase().includes(query)),
      expense: expense.filter((item) => `${item.searchable} ${item.draft}`.toLowerCase().includes(query))
    };
  }

  function filterCourse(items) {
    if (state.courseFilter === "missing") return items.filter((item) => item.missing.length);
    if (state.courseFilter === "assignment") return items.filter((item) => item.tags.some((tag) => tag.label.includes("待派")));
    if (state.courseFilter === "calendar") return items.filter((item) => item.tags.some((tag) => tag.label.includes("Calendar") || tag.label.includes("授課")));
    return items;
  }

  function filterExpense(items) {
    if (state.expenseFilter === "mismatch") return items.filter((item) => Math.abs(item.diff) >= 1);
    if (state.expenseFilter === "missing") return items.filter((item) => item.missing.length || item.tags.some((tag) => tag.label.includes("缺單據")));
    if (state.expenseFilter === "travel") return items.filter((item) => item.tags.some((tag) => tag.label.includes("行程")));
    return items;
  }

  function render() {
    const { course, expense } = getAnalyses();
    const all = [...course, ...expense];
    const riskItems = all.filter((item) => item.severity !== "ok");

    elements.sourceStatus.textContent =
      state.source === "demo" ? "已綁定 2 份表單 · 示範資料" : `已綁定 2 份表單 · 已載入 ${state.source}`;

    renderSheetSources();
    renderSummary(course, expense);
    renderPriority(riskItems);
    renderCourse(filterCourse(course));
    renderExpense(filterExpense(expense));
    renderDrafts(all);
    renderDictionary();
  }

  function renderSheetSources() {
    elements.sheetSourceList.innerHTML = sheetSources
      .map(
        (source) => `
          <article class="sheet-source-card">
            <header>
              <div>
                <strong>${escapeHtml(source.label)}表單</strong>
                <small>${escapeHtml(source.sheetName)} · ${source.rows.toLocaleString("zh-TW")} 列 / ${source.columns} 欄</small>
              </div>
              <span class="tag info">${escapeHtml(source.label)}</span>
            </header>
            <small>${escapeHtml(source.title)}</small>
            <div class="source-links">
              <a class="source-link" href="${source.url}" target="_blank" rel="noreferrer noopener">開啟</a>
              <a class="source-link" href="${source.csvUrl}" target="_blank" rel="noreferrer noopener">CSV</a>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderSummary(course, expense) {
    const courseMissing = course.filter((item) => item.missing.length).length;
    const courseAssignment = course.filter((item) => item.tags.some((tag) => tag.label.includes("待派"))).length;
    const expenseIssues = expense.filter((item) => item.severity !== "ok").length;
    const mismatch = expense.filter((item) => Math.abs(item.diff) >= 1).length;
    const metrics = [
      { label: "課務筆數", value: course.length, tone: "", ratio: course.length ? 88 : 0 },
      { label: "課務缺資料", value: courseMissing, tone: courseMissing ? "is-warning" : "", ratio: ratio(courseMissing, course.length) },
      { label: "待派講師", value: courseAssignment, tone: courseAssignment ? "is-warning" : "", ratio: ratio(courseAssignment, course.length) },
      { label: "核銷需處理", value: expenseIssues, tone: expenseIssues || mismatch ? "is-danger" : "", ratio: ratio(expenseIssues, expense.length) }
    ];

    elements.summaryGrid.innerHTML = metrics
      .map(
        (metric) => `
          <article class="metric-card ${metric.tone}">
            <span>${escapeHtml(metric.label)}</span>
            <strong>${metric.value}</strong>
            <div class="meter" aria-hidden="true"><i style="width:${metric.ratio}%"></i></div>
          </article>
        `
      )
      .join("");
  }

  function ratio(valueCount, total) {
    if (!total) return 0;
    return Math.max(7, Math.min(100, Math.round((valueCount / total) * 100)));
  }

  function renderPriority(items) {
    const priority = items
      .slice()
      .sort((a, b) => severityRank(a.severity) - severityRank(b.severity))
      .slice(0, 8);

    elements.priorityCount.textContent = String(priority.length);
    elements.priorityList.innerHTML = priority.length
      ? priority
          .map(
            (item) => `
              <article class="task-item ${item.severity === "danger" ? "is-danger" : "is-warning"}">
                <div>
                  <strong>${escapeHtml(item.title)}</strong>
                  <p>${escapeHtml(item.source)} · ${escapeHtml(item.nextSteps[0] || item.subtitle)}</p>
                </div>
                ${renderTags(item.tags.slice(0, 2))}
              </article>
            `
          )
          .join("")
      : `<div class="empty-state">目前沒有需要優先處理的項目。</div>`;
  }

  function renderCourse(items) {
    elements.courseTable.innerHTML = items.length
      ? items
          .map(
            (item) => `
            <tr>
              <td class="source-ref">${escapeHtml(item.source)}</td>
              <td class="primary-cell">
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.subtitle)}</span>
              </td>
              <td>${renderTags(item.tags)}</td>
              <td>${item.nextSteps.map((step) => `<div>${escapeHtml(step)}</div>`).join("")}</td>
              <td><button class="copy-button" type="button" data-copy="${encodeURIComponent(item.draft)}">複製</button></td>
            </tr>
          `
          )
          .join("")
      : `<tr><td colspan="5" class="empty-state">沒有符合條件的課務資料。</td></tr>`;
  }

  function renderExpense(items) {
    elements.expenseTable.innerHTML = items.length
      ? items
          .map(
            (item) => `
            <tr>
              <td class="source-ref">${escapeHtml(item.source)}</td>
              <td class="primary-cell">
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.subtitle)}</span>
              </td>
              <td>${renderTags(item.tags)}<div class="next-steps">${item.nextSteps.map((step) => `<div>${escapeHtml(step)}</div>`).join("")}</div></td>
              <td class="money">
                表單 ${formatMoney(item.total)}<br>
                明細 ${formatMoney(item.detailSum)}
              </td>
              <td><button class="copy-button" type="button" data-copy="${encodeURIComponent(item.draft)}">複製</button></td>
            </tr>
          `
          )
          .join("")
      : `<tr><td colspan="5" class="empty-state">沒有符合條件的核銷資料。</td></tr>`;
  }

  function renderDrafts(items) {
    const drafts = items.filter((item) => state.showOkDrafts || item.severity !== "ok");
    elements.draftGrid.innerHTML = drafts.length
      ? drafts
          .map(
            (item) => `
            <article class="draft-card">
              <header>
                <div>
                  <p class="eyebrow">${escapeHtml(item.source)}</p>
                  <h4>${escapeHtml(item.title)}</h4>
                </div>
                <button class="copy-button" type="button" data-copy="${encodeURIComponent(item.draft)}">複製</button>
              </header>
              ${renderTags(item.tags.slice(0, 3))}
              <pre>${escapeHtml(item.draft)}</pre>
            </article>
          `
          )
          .join("")
      : `<div class="empty-state">目前沒有待處理草稿。勾選右上方可顯示無異常項目。</div>`;
  }

  function renderDictionary() {
    elements.courseFields.innerHTML = courseHeaders.map(renderField).join("");
    elements.expenseFields.innerHTML = expenseHeaders.map(renderField).join("");
  }

  function renderField(header) {
    const sensitiveWords = ["姓名", "電話", "Email", "電子郵件", "請款人", "經手人", "地址", "抬頭", "統編"];
    const statusWords = ["講師安排", "助教安排", "授課日期時段", "建檔備註", "指派規劃師", "總計", "單據數量", "專案類別"];
    const className = [
      "field-chip",
      sensitiveWords.some((word) => header.includes(word)) ? "is-sensitive" : "",
      statusWords.some((word) => header.includes(word)) ? "is-status" : ""
    ]
      .filter(Boolean)
      .join(" ");

    return `<span class="${className}">${escapeHtml(header)}</span>`;
  }

  function renderTags(tags) {
    return `<div class="tag-row">${tags
      .map((tag) => `<span class="tag ${tag.type}">${escapeHtml(tag.label)}</span>`)
      .join("")}</div>`;
  }

  function severityRank(severity) {
    if (severity === "danger") return 0;
    if (severity === "warning") return 1;
    return 2;
  }

  function escapeHtml(input) {
    return String(input || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function showView(name) {
    state.currentView = name;
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-active"));
    document.getElementById(`view-${name}`).classList.add("is-active");
    document.querySelectorAll(".nav-tab").forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.view === name);
    });
    const titles = {
      dashboard: "今日總覽",
      course: "課務工作台",
      expense: "核銷檢查器",
      drafts: "訊息草稿",
      dictionary: "欄位地圖"
    };
    elements.viewTitle.textContent = titles[name] || "今日總覽";
  }

  function readFile(file, kind) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const rows = parseCsv(String(reader.result || ""));
        if (kind === "course") state.courseRows = rows;
        if (kind === "expense") state.expenseRows = rows;
        state.source = "CSV";
        render();
        showToast(`已載入 ${file.name}`);
      } catch (error) {
        showToast(`讀取失敗：${error.message}`);
      }
    };
    reader.readAsText(file, "utf-8");
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("已複製草稿");
    } catch (_error) {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      showToast("已複製草稿");
    }
  }

  function exportReport() {
    const { course, expense } = getAnalyses();
    const riskItems = [...course, ...expense].filter((item) => item.severity !== "ok");
    const lines = [
      "# 佩欣每日工作台",
      "",
      `產生時間：${new Date().toLocaleString("zh-TW")}`,
      `資料來源：${state.source === "demo" ? "示範資料" : "CSV 匯入"}`,
      `綁定表單：${sheetSources.map((source) => source.label).join("、")}`,
      "",
      "## 今日摘要",
      "",
      `- 課務筆數：${course.length}`,
      `- 課務缺資料：${course.filter((item) => item.missing.length).length}`,
      `- 核銷需處理：${expense.filter((item) => item.severity !== "ok").length}`,
      `- 優先處理：${riskItems.length}`,
      "",
      "## 優先處理",
      "",
      ...riskItems.flatMap((item) => [
        `### ${item.source} ${item.title}`,
        "",
        `- 狀態：${item.tags.map((tag) => tag.label).join("、")}`,
        `- 下一步：${item.nextSteps.join("；")}`,
        "",
        "```text",
        item.draft,
        "```",
        ""
      ])
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `peixin-daily-workbench-${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("已下載 Markdown 日報");
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 2200);
  }

  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => showView(tab.dataset.view));
  });

  document.querySelectorAll("[data-course-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.courseFilter = button.dataset.courseFilter;
      document.querySelectorAll("[data-course-filter]").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      render();
    });
  });

  document.querySelectorAll("[data-expense-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.expenseFilter = button.dataset.expenseFilter;
      document.querySelectorAll("[data-expense-filter]").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      render();
    });
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy]");
    if (button) copyText(decodeURIComponent(button.dataset.copy));
  });

  document.getElementById("course-file").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) readFile(file, "course");
  });

  document.getElementById("expense-file").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) readFile(file, "expense");
  });

  document.getElementById("reset-demo").addEventListener("click", () => {
    state.source = "demo";
    state.courseRows = addRowNumbers(demoCourseRows);
    state.expenseRows = addRowNumbers(demoExpenseRows);
    elements.search.value = "";
    state.search = "";
    render();
    showToast("已回到示範資料");
  });

  document.getElementById("export-report").addEventListener("click", exportReport);

  elements.search.addEventListener("input", (event) => {
    state.search = event.target.value;
    render();
  });

  elements.showOkDrafts.addEventListener("change", (event) => {
    state.showOkDrafts = event.target.checked;
    render();
  });

  render();
})();
