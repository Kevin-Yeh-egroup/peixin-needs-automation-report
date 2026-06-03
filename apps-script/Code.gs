const SHEET_SOURCES = [
  {
    kind: 'course',
    label: '課務',
    title: '馴錢師財商研究中心 - 課程邀約申請表單 (回覆)',
    spreadsheetId: '1OOZ9CuvDNgRLqHUIp1sdnEXD2XvcThlI2bLbT96c5RI',
    gid: '74835381',
    sheetName: '表單回應 1',
    defaultLimit: 300,
    url: 'https://docs.google.com/spreadsheets/d/1OOZ9CuvDNgRLqHUIp1sdnEXD2XvcThlI2bLbT96c5RI/edit?gid=74835381#gid=74835381'
  },
  {
    kind: 'expense',
    label: '核銷',
    title: '馴錢師報帳表單 (回應)',
    spreadsheetId: '1dm_IzX4kfnFWdi-gx-bcg2jPmYCrEyq_zELZgHlr39s',
    gid: '1469518282',
    sheetName: '表單回應 1',
    defaultLimit: 600,
    url: 'https://docs.google.com/spreadsheets/d/1dm_IzX4kfnFWdi-gx-bcg2jPmYCrEyq_zELZgHlr39s/edit?gid=1469518282#gid=1469518282'
  }
].map((source) => ({
  ...source,
  csvUrl: `https://docs.google.com/spreadsheets/d/${source.spreadsheetId}/export?format=csv&gid=${source.gid}`
}));

const COURSE_REQUIRED_FIELDS = [
  ['您的單位全名 (含部門、中心、組別)', '單位'],
  ['您的姓名/職稱', '聯絡人'],
  ['您的聯絡電話 (若有分機請備註)', '電話'],
  ['您的聯絡 Email', 'Email'],
  ['期待的課程主題?', '課程主題'],
  ['期待的服務項目?', '服務項目'],
  ['期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)', '授課時段'],
  ['預計舉辦課程的地點?(縣市+區域，或有詳細地址也可唷)', '地點'],
  ['課程總時數', '總時數'],
  ['預計參與人數', '參與人數'],
  ['貴單位是否同意支付講師鐘點費? ( 費用細節會另外致電詳談 )', '鐘點費同意'],
  ['課程後我們將開立「發票」供貴單位核銷使用，您是否同意?', '發票同意']
];

const EXPENSE_NON_AMOUNT_FIELDS = [
  '時間戳記',
  '專案類別',
  '訪視/課程/諮詢日期',
  '請款人',
  '經手人',
  '單據用途',
  '核銷類別',
  '單據數量',
  '行程起訖點說明',
  '延伸費單據數量',
  '單據費用總計',
  '單據日期',
  '辦公室單據用途',
  '工作內容說明',
  '工作時數'
];

const EXPENSE_TRAVEL_FIELDS = [
  '高鐵',
  '臺鐵',
  '捷運/公車（悠遊卡加值）',
  '客運',
  '計程車',
  '租車',
  '機票',
  '船票',
  '過路費',
  '停車費',
  '機車油資金額',
  '汽車油資金額',
  '交通費'
];

function doGet() {
  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('佩欣每日工作台')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

function getDashboardData(options) {
  const opts = options || {};
  const generatedAt = new Date();
  const courseSource = SHEET_SOURCES.find((source) => source.kind === 'course');
  const expenseSource = SHEET_SOURCES.find((source) => source.kind === 'expense');
  const coursePayload = readLatestRows_(courseSource, opts.courseLimit || courseSource.defaultLimit);
  const expensePayload = readLatestRows_(expenseSource, opts.expenseLimit || expenseSource.defaultLimit);

  return {
    generatedAt: Utilities.formatDate(generatedAt, Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm:ss'),
    sources: SHEET_SOURCES.map((source) => ({
      kind: source.kind,
      label: source.label,
      title: source.title,
      sheetName: source.sheetName,
      url: source.url,
      csvUrl: source.csvUrl,
      rows: source.kind === 'course' ? coursePayload.lastRow : expensePayload.lastRow,
      columns: source.kind === 'course' ? coursePayload.lastColumn : expensePayload.lastColumn,
      loadedRows: source.kind === 'course' ? coursePayload.rows.length : expensePayload.rows.length
    })),
    course: {
      headers: coursePayload.headers,
      rows: coursePayload.rows.map(analyzeCourse_)
    },
    expense: {
      headers: expensePayload.headers,
      rows: expensePayload.rows.map((row) => analyzeExpense_(row, expensePayload.headers))
    }
  };
}

function readLatestRows_(source, limit) {
  const spreadsheet = SpreadsheetApp.openById(source.spreadsheetId);
  const sheet = spreadsheet.getSheetByName(source.sheetName);
  if (!sheet) {
    throw new Error(`找不到工作表：${source.title} / ${source.sheetName}`);
  }

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 1 || lastColumn < 1) {
    return { headers: [], rows: [], lastRow, lastColumn };
  }

  const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0].map(cleanHeader_);
  if (lastRow < 2) {
    return { headers, rows: [], lastRow, lastColumn };
  }

  const rowLimit = Math.max(1, Math.min(Number(limit) || source.defaultLimit, 1200));
  const startRow = Math.max(2, lastRow - rowLimit + 1);
  const rowCount = lastRow - startRow + 1;
  const values = sheet.getRange(startRow, 1, rowCount, lastColumn).getDisplayValues();
  const rows = values
    .map((cells, index) => toObjectRow_(headers, cells, startRow + index))
    .filter((row) => row.__filled);

  return { headers, rows, lastRow, lastColumn };
}

function toObjectRow_(headers, cells, rowNumber) {
  const row = { __rowNumber: rowNumber, __filled: false };
  headers.forEach((header, index) => {
    const value = String(cells[index] || '').trim();
    if (value) row.__filled = true;
    row[header] = value;
  });
  return row;
}

function analyzeCourse_(row) {
  const missing = COURSE_REQUIRED_FIELDS
    .filter(([field]) => !cell_(row, field))
    .map(([, label]) => label);
  const speaker = cell_(row, '講師安排');
  const classTime = cell_(row, '授課日期時段');
  const planner = cell_(row, '指派規劃師');
  const notes = cell_(row, '佩欣建檔備註');
  const topic = cell_(row, '期待的課程主題?');
  const unit = cell_(row, '您的單位全名 (含部門、中心、組別)');
  const requestedTime = cell_(row, '期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)');

  const tags = [];
  if (missing.length) tags.push({ type: 'danger', label: `缺 ${missing.length} 欄` });
  if (!speaker) tags.push({ type: 'warning', label: '待派講師' });
  if (speaker && !classTime) tags.push({ type: 'warning', label: '待定授課時段' });
  if (classTime && !notes) tags.push({ type: 'info', label: '待確認 Calendar/建檔' });
  if (!planner) tags.push({ type: 'warning', label: '未指派規劃師' });
  if (!tags.length) tags.push({ type: 'ok', label: '可追後續資料' });

  const nextSteps = [];
  if (missing.length) nextSteps.push(`請補：${missing.join('、')}`);
  if (!speaker) nextSteps.push('轉給 Ivy / 素菁確認講師安排');
  if (speaker && !classTime) nextSteps.push('確認正式授課日期時段');
  if (classTime && !notes) nextSteps.push('確認是否已建立 Calendar 與內部備註');
  if (!planner) nextSteps.push('補上指派規劃師');
  if (!nextSteps.length) nextSteps.push('進入課綱、講師資料與簡報追蹤');

  return {
    type: 'course',
    source: `課務 R${row.__rowNumber}`,
    title: unit || '(未填單位)',
    subtitle: topic || '(未填主題)',
    severity: missing.length ? 'danger' : !speaker || !classTime || !planner ? 'warning' : 'ok',
    tags,
    missing,
    nextSteps,
    searchText: [unit, topic, speaker, planner, requestedTime].join(' '),
    draft: buildCourseDraft_(row, missing, nextSteps)
  };
}

function buildCourseDraft_(row, missing, nextSteps) {
  const unit = cell_(row, '您的單位全名 (含部門、中心、組別)') || '未填單位';
  const topic = cell_(row, '期待的課程主題?') || '未填主題';
  const date = pick_(row, [
    '授課日期時段',
    '期待的授課日期與時段 (請提供指定日期/時間或 2-3 個理想時段)'
  ]) || '待確認';
  const place = cell_(row, '預計舉辦課程的地點?(縣市+區域，或有詳細地址也可唷)') || '待確認';
  const hours = cell_(row, '課程總時數') || '待確認';
  const people = cell_(row, '預計參與人數') || '待確認';
  const fee = cell_(row, '鐘點費金額(每小時)，或出席費金額') ||
    cell_(row, '貴單位是否同意支付講師鐘點費? ( 費用細節會另外致電詳談 )') ||
    '待確認';

  return [
    '【課務邀約整理】',
    `單位：${unit}`,
    `主題：${topic}`,
    `日期：${date}`,
    `地點：${place}`,
    `時數 / 人數：${hours} / ${people}`,
    `費用：${fee}`,
    missing.length ? `缺資料：${missing.join('、')}` : '缺資料：目前未發現必要欄位缺漏',
    `建議下一步：${nextSteps[0] || '請確認後續追蹤'}`
  ].join('\n');
}

function analyzeExpense_(row, headers) {
  const missing = [];
  [
    ['專案類別', '專案'],
    ['訪視/課程/諮詢日期', '日期'],
    ['請款人', '請款人'],
    ['單據用途', '用途'],
    ['核銷類別', '類別'],
    ['單據費用總計', '總計']
  ].forEach(([field, label]) => {
    if (!cell_(row, field)) missing.push(label);
  });

  const amountColumns = headers.filter((header) => EXPENSE_NON_AMOUNT_FIELDS.indexOf(header) === -1);
  const detailSum = amountColumns.reduce((sum, column) => sum + moneyNumber_(cell_(row, column)), 0);
  const total = moneyNumber_(cell_(row, '單據費用總計'));
  const diff = detailSum - total;
  const hasTravel = EXPENSE_TRAVEL_FIELDS.some((column) => moneyNumber_(cell_(row, column)) > 0);
  const travelNeedsRoute = hasTravel && !cell_(row, '行程起訖點說明');
  const needsReceiptCount = detailSum > 0 && !cell_(row, '單據數量');
  const needsReceiptDate = detailSum > 0 && !cell_(row, '單據日期');

  const tags = [];
  if (missing.length) tags.push({ type: 'danger', label: `缺 ${missing.length} 欄` });
  if (Math.abs(diff) >= 1) tags.push({ type: 'danger', label: '金額不一致' });
  if (travelNeedsRoute) tags.push({ type: 'warning', label: '缺行程起訖' });
  if (needsReceiptCount) tags.push({ type: 'warning', label: '缺單據數量' });
  if (needsReceiptDate) tags.push({ type: 'warning', label: '缺單據日期' });
  if (!tags.length) tags.push({ type: 'ok', label: '金額可初步通過' });

  const nextSteps = [];
  if (missing.length) nextSteps.push(`請補：${missing.join('、')}`);
  if (Math.abs(diff) >= 1) nextSteps.push(`明細加總 ${formatMoney_(detailSum)}，與總計差 ${formatMoney_(diff)}`);
  if (travelNeedsRoute) nextSteps.push('交通費需補行程起訖點');
  if (needsReceiptCount) nextSteps.push('補單據數量，方便核對紙本或照片');
  if (needsReceiptDate) nextSteps.push('補單據日期');
  if (!nextSteps.length) nextSteps.push('可進入人工核對單據影像與專案規則');

  const claimant = cell_(row, '請款人') || '(未填請款人)';
  const project = cell_(row, '專案類別') || '(未填專案)';
  const purpose = cell_(row, '單據用途') || '(未填用途)';

  return {
    type: 'expense',
    source: `核銷 R${row.__rowNumber}`,
    title: claimant,
    subtitle: `${project} · ${purpose}`,
    severity: missing.length || Math.abs(diff) >= 1 ? 'danger' : travelNeedsRoute || needsReceiptCount || needsReceiptDate ? 'warning' : 'ok',
    tags,
    missing,
    detailSum,
    total,
    diff,
    nextSteps,
    searchText: [claimant, project, purpose, cell_(row, '核銷類別')].join(' '),
    draft: buildExpenseDraft_(row, detailSum, total, diff, nextSteps)
  };
}

function buildExpenseDraft_(row, detailSum, total, diff, nextSteps) {
  const claimant = cell_(row, '請款人') || '您好';
  const project = cell_(row, '專案類別') || '未填專案';
  const purpose = cell_(row, '單據用途') || '未填用途';
  const date = cell_(row, '訪視/課程/諮詢日期') || '未填日期';
  const issue = nextSteps[0] || '目前金額可初步通過，仍需人工核對單據。';

  return [
    `${claimant} 您好，`,
    `這筆核銷資料我先整理到工作台了：${project} / ${purpose} / ${date}`,
    `表單總計：${formatMoney_(total)}；明細加總：${formatMoney_(detailSum)}。`,
    Math.abs(diff) >= 1 ? `目前差額：${formatMoney_(diff)}，想請您協助確認金額或分類。` : '金額目前初步一致。',
    `待確認事項：${issue}`
  ].join('\n');
}

function cleanHeader_(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function cell_(row, field) {
  return String(row[cleanHeader_(field)] || '').trim();
}

function pick_(row, fields) {
  for (let index = 0; index < fields.length; index += 1) {
    const found = cell_(row, fields[index]);
    if (found) return found;
  }
  return '';
}

function moneyNumber_(input) {
  const text = String(input || '').replace(/[,，\s$元]/g, '');
  if (!text) return 0;
  const number = Number(text);
  return Number.isFinite(number) ? number : 0;
}

function formatMoney_(amount) {
  return `$${Math.round(amount).toLocaleString('zh-TW')}`;
}
