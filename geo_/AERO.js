
// 這裡之後手動貼上 121 筆完整 JSON 資料
// Inline SVG icon system — no external CDN required
const ICONS = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  settings: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  arrowright: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  arrowleft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  checkcircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  fire: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  flask: '<path d="M9 3h6m-6 0v3l-3 9h12l-3-9V3"/><path d="M6 15a6 6 0 0 0 12 0"/>',
  microscope: '<circle cx="9" cy="13" r="5"/><path d="M14.5 9.5 19 5"/><path d="m15 5 4 4"/><path d="M9 18v3"/><path d="M6 21h6"/><circle cx="9" cy="13" r="2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/>',
  sun: '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/><line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/>',
  grad: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  robot: '<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="9" cy="16" r="1.5"/><circle cx="15" cy="16" r="1.5"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><line x1="12" y1="5" x2="12" y2="11"/>',
};

// Helper: returns SVG string
function ico(name, cls='', size=16){
  const d = ICONS[name] || ICONS.checkcircle;
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
}

const USER_COUNTER_KEY = 'aero_hidden_user_counter';

function nextHiddenUserId(){
  try{
    const raw = localStorage.getItem(USER_COUNTER_KEY);
    const prev = Number.parseInt(raw || '0', 10);
    const next = Number.isFinite(prev) && prev > 0 ? prev + 1 : 1;
    localStorage.setItem(USER_COUNTER_KEY, String(next));
    return next;
  }catch(_err){
    return 1;
  }
}

/* ── ELM 2x2 conditions (only source of assignment) ── */
const userId = nextHiddenUserId();
const TOTAL_ROUNDS = 4;
const DEFAULT_REMAINDER_GROUP = ((userId % 4) + 4) % 4;
const BACKEND_RECORD_KEY = 'aero_backend_record';
const BACKEND_RECORDS_KEY = 'aero_backend_records';
const API_BASE_URL = String(window.AERO_CONFIG?.apiBaseUrl || '').replace(/\/$/, '');
const apiUrl = (path) => `${API_BASE_URL}${path}`;

const SCENARIO_CONDITIONS = Object.freeze({
  a: Object.freeze({
    conditionId: 1,
    scenarioKey: 'a',
    narrativeStyle: 'rational',
    narrativeStyleLabel: '理性數據文案',
    structureStyle: 'high',
    structureStyleLabel: '高結構條列式排版',
    summaryLabel: '理性數據文案 + 高結構條列式排版',
  }),
  b: Object.freeze({
    conditionId: 2,
    scenarioKey: 'b',
    narrativeStyle: 'rational',
    narrativeStyleLabel: '理性數據文案',
    structureStyle: 'low',
    structureStyleLabel: '低結構段落式排版',
    summaryLabel: '理性數據文案 + 低結構段落式排版',
  }),
  c: Object.freeze({
    conditionId: 3,
    scenarioKey: 'c',
    narrativeStyle: 'emotional',
    narrativeStyleLabel: '感性職涯文案',
    structureStyle: 'high',
    structureStyleLabel: '高結構條列式排版',
    summaryLabel: '感性職涯文案 + 高結構條列式排版',
  }),
  d: Object.freeze({
    conditionId: 4,
    scenarioKey: 'd',
    narrativeStyle: 'emotional',
    narrativeStyleLabel: '感性職涯文案',
    structureStyle: 'low',
    structureStyleLabel: '低結構段落式排版',
    summaryLabel: '感性職涯文案 + 低結構段落式排版',
  }),
});

const COUNTERBALANCE_SEQUENCES = Object.freeze({
  0: Object.freeze(['a', 'b', 'c', 'd']),
  1: Object.freeze(['b', 'c', 'd', 'a']),
  2: Object.freeze(['c', 'd', 'a', 'b']),
  3: Object.freeze(['d', 'a', 'b', 'c']),
});

function normalizeRemainder(value){
  const n=Number(value);
  if(!Number.isFinite(n)) return DEFAULT_REMAINDER_GROUP;
  const rem=Math.floor(n) % 4;
  return (rem + 4) % 4;
}

function getConditionByScenarioKey(key){
  return SCENARIO_CONDITIONS[key] || SCENARIO_CONDITIONS.a;
}

function getSequenceByRemainder(value){
  const rem=normalizeRemainder(value);
  return COUNTERBALANCE_SEQUENCES[rem] || COUNTERBALANCE_SEQUENCES[DEFAULT_REMAINDER_GROUP];
}

function normalizeStepIndex(value){
  const n=Number(value);
  if(!Number.isFinite(n)) return 0;
  return Math.min(TOTAL_ROUNDS - 1, Math.max(0, Math.floor(n)));
}

function getScenarioForStep(remainderGroup, stepIndex){
  const sequence=getSequenceByRemainder(remainderGroup);
  const idx=normalizeStepIndex(stepIndex);
  return sequence[idx] || sequence[0] || 'a';
}

function getExperimentPlanByUserId(id){
  const rid=Number.isFinite(Number(id)) ? Number(id) : userId;
  const remainderGroup=normalizeRemainder(rid);
  const sequence=[...getSequenceByRemainder(remainderGroup)];
  const scenarioKey=sequence[0];
  const condition=getConditionByScenarioKey(scenarioKey);
  return {
    remainderGroup,
    sequence,
    currentStepIndex: 0,
    ...condition,
  };
}

function createAdvisorDemoAssignment(){
  const source=String(currentSessionLog?.participant_id || 'advisor-demo');
  let hash=2166136261;
  for(const ch of source){
    hash^=ch.charCodeAt(0);
    hash=Math.imul(hash,16777619);
  }
  const assignmentNumber=hash>>>0;
  return {
    assignment_number: assignmentNumber,
    remainder_group: normalizeRemainder(assignmentNumber),
    demo_local_fallback: true,
  };
}

function getApiBaseDescription(){
  const base=String(window.AERO_CONFIG?.apiBaseUrl || '').trim();
  if(base) return base.replace(/\/$/, '');
  const origin=window.location.origin && window.location.origin!=='null'
    ? window.location.origin
    : '直接開啟的本機檔案';
  return `${origin}（未設定 AERO_API_BASE_URL，將使用同網域 /api）`;
}

const SC_DATA = {
  a:{ color:'#E89A57', label:'版本 1', nav:'版本 1 — 中央 × 高結構', path:'中央路徑（理性）', struct:'高結構化', ptag:'中央路徑', stag:'高結構化學科',
    title:'Python 商務數據分析<em>認證班</em>',
    desc:'以嚴謹的數據科學方法論為核心，覆蓋 Python 資料處理、商業視覺化與預測模型建構。課程符合 IBM 數據分析師認證框架，適合以量化能力驅動商業決策的專業人士。',
    stats:[{n:'92<sup>%</sup>',l:'完課率'},{n:'88<sup>%</sup>',l:'認證通過率'},{n:'4.8',l:'學員評分'}],
    instRole:'課程主任', instName:'李明哲 博士', instSub:'前台積電數據分析部主管', instInit:'李',
    instQ:'「每個模組均附有真實企業案例，讓學員立即驗證所學。」',
    bTtl:'技能涵蓋分佈', bars:[{l:'Python / Pandas',p:95},{l:'資料視覺化',p:85},{l:'統計推論',p:78},{l:'機器學習',p:62}],
    certs:['IBM 認證對標','企業訓練採認','政府數位轉型'],
    bodyTag:'', bodyTitle:'', bodyCt:'',
    price:'NT$ 12,800', psub:'含 6 個月課程存取 · 1 次認證報名費 · 終身更新',
    urg:'', feats:['14 天不滿意退費保證','完課核發電子結業證書','學員社群終身免費加入'], testis:'',
    tyCourse:'Python 商務數據分析認證班' },

  b:{ color:'#2A8A78', label:'版本 2', nav:'版本 2 — 中央 × 低結構', path:'中央路徑（理性）', struct:'低結構化', ptag:'中央路徑', stag:'低結構化學科',
    title:'商務談判與<em>高階策略溝通</em>',
    desc:'以哈佛談判模型（BATNA / ZOPA）與金字塔原理為核心，結合 50 個真實商業案例，系統化提升跨部門溝通效能。已在 32 家企業導入，實測降低 20% 溝通隱形成本。',
    stats:[{n:'20<sup>%</sup>',l:'降低溝通成本'},{n:'32',l:'企業導入驗證'},{n:'4.9',l:'學員評分'}],
    instRole:'首席講師', instName:'王思穎 顧問', instSub:'麥肯錫前資深合夥人 · 哈佛 PON 培訓師', instInit:'王',
    instQ:'「談判是設計對話架構的藝術，本課程讓你掌握其中的理性邏輯。」',
    bTtl:'核心能力覆蓋', bars:[{l:'哈佛 BATNA/ZOPA',p:90},{l:'金字塔原理架構',p:88},{l:'跨文化談判',p:75},{l:'高壓場景應對',p:82}],
    certs:['哈佛 PON 方法對標','麥肯錫框架採用','EMBA 選修認可'],
    bodyTag:'', bodyTitle:'', bodyCt:'',
    price:'NT$ 15,800', psub:'含 8 場模擬談判 · 個人診斷報告 · 企業版另洽',
    urg:'', feats:['14 天不滿意退費保證','完課核發電子結業證書','企業團體報名享優惠'], testis:'',
    tyCourse:'商務談判與高階策略溝通' },

  c:{ color:'#B86A30', label:'版本 3', nav:'版本 3 — 邊緣 × 高結構', path:'邊緣路徑（感性）', struct:'高結構化', ptag:'邊緣路徑', stag:'高結構化學科',
    title:'30天轉職黑馬：<em>零基礎 Python 速成營</em>',
    desc:'',
    stats:[{n:'',l:'人數'},{n:'',l:'評價'}],
    instRole:'百萬網紅認證推薦', instName:'科技網紅「阿傑」', instSub:'YouTube 120 萬訂閱 · 連續 3 年最佳 Python 課', instInit:'阿',
    instQ:'「我的粉絲問我哪堂最值，我只推這一堂，沒有之一。」',
    bTtl:'30 天後你能做到', bars:[{l:'寫出爬蟲腳本',p:100},{l:'自動化 Excel 報表',p:100},{l:'製作互動圖表',p:90},{l:'通過技術面試',p:85}],
    certs:[],
    bodyTag:'', bodyTitle:'', bodyCt:'',
    price:'NT$ 3,980', psub:'',
    urg:'',
    feats:[],
    testis:'',
    tyCourse:'30天轉職黑馬：零基礎 Python 速成營' },

  d:{ color:'#7054A6', label:'版本 4', nav:'版本 4 — 邊緣 × 低結構', path:'邊緣路徑（感性）', struct:'低結構化', ptag:'邊緣路徑', stag:'低結構化學科',
    title:'主管最愛紅人術：<em>職場溝通魅力必修課</em>',
    desc:'開會還在發抖、訊息被已讀不回？你缺的不是努力，是讓對的人看見你的能力。1,200 位學長姐親身驗證：上完這堂課，職場完全不一樣。',
    stats:[{n:'1.2K<sup>+</sup>',l:'感性推薦學員'},{n:'97<sup>%</sup>',l:'感覺職場改變了'},{n:'4.98',l:'淚推評分'}],
    instRole:'課程教練', instName:'溝通教練 Emma Lin', instSub:'幫助 1,200+ 職場人重拾自信 · TEDx 講者', instInit:'E',
    instQ:'「每次看到學員說「我開會不再發抖了」，我都眼眶紅。你值得被看見。」',
    bTtl:'上課後學員的改變', bars:[{l:'開會敢發言了',p:94},{l:'主管主動找我談',p:78},{l:'同事關係變好了',p:96},{l:'升職或調薪了',p:62}],
    certs:['1200+ 真實淚推','TEDx 講者認證','職場自信重建計畫'],
    bodyTag:'', bodyTitle:'', bodyCt:'',
    price:'NT$ 4,980', psub:'含終身回看 · 私密社群 · 1對1 職場諮詢（20分鐘）',
    urg:`<div class="urg" style="background:#7054A6"><i class="ic-feat" data-icon="heart"></i> 本期僅剩 8 個溫暖名額</div>`,
    feats:['14 天不滿意退費保證','完課送 1對1 職場諮詢'],
    testis:`<div class="c-div"></div>
      <div class="testi">「工作 7 年都是隱形人，上完第三週，主管問我要不要帶小組。我哭了。」<div class="tn">Annie H. ❤️❤️❤️❤️❤️</div></div>
      <div class="testi">「是這堂課讓我重新愛上職場。」<div class="tn">Marcus L. ❤️❤️❤️❤️❤️</div></div>`,
    tyCourse:'主管最愛紅人術：職場溝通魅力必修課' }
};

function parseOriginalPrice(value){
  const price=Number(value);
  return Number.isFinite(price) ? price : null;
}

function shouldIncludeSourceCourse(price){
  return Number.isFinite(price) && price>0;
}

function shouldWarnOriginalPrice(price){
  return price===null || price<0;
}

let HAHOW_BIZ_COURSES = [];
let courseDataSummary = {
  source_file:'geo_/hahow_courses.xlsx',
  columns:[],
  valid_count:0,
  invalid_count:0,
  min_price:null,
  max_price:null,
  warnings:[],
};
let courseDataLoadError = null;
let HAHOW_AVG_PRICE = 0;

const PRICE_TOLERANCE = 1500;
const CANDIDATES_PER_ROUND = 4;
const MINIMUM_ELIGIBLE_COURSES = TOTAL_ROUNDS * CANDIDATES_PER_ROUND;
const conditionContent = Object.freeze({
  A:'本區域將依本回合實驗條件，顯示對應的 AI 生成課程資訊內容。正式研究內容尚未匯入。',
  B:'本區域將依本回合實驗條件，顯示對應的 AI 生成課程資訊內容。正式研究內容尚未匯入。',
  C:'本區域將依本回合實驗條件，顯示對應的 AI 生成課程資訊內容。正式研究內容尚未匯入。',
  D:'本區域將依本回合實驗條件，顯示對應的 AI 生成課程資訊內容。正式研究內容尚未匯入。',
});

function getScenarioKeys(){
  return Object.keys(SC_DATA);
}

function getBudgetBounds(){
  const all=HAHOW_BIZ_COURSES
    .map((course)=>Number(course.price))
    .filter((price)=>Number.isFinite(price) && price>0);
  if(!all.length){
    return { min:1000, max:10000, step:100 };
  }

  const min=Math.min(...all);
  const max=Math.max(...all);
  return { min, max, step:100 };
}

async function initializeCourseCatalog(){
  try{
    if(!window.AEROCourseDataLoader?.loadCourseData){
      throw new Error('course-data-loader.js 未載入，無法讀取課程資料。');
    }
    const loaded=await window.AEROCourseDataLoader.loadCourseData({url:'data/hahow_courses.json'});
    HAHOW_BIZ_COURSES=loaded.aeroCourses;
    courseDataSummary=loaded.summary;
    courseDataLoadError=null;
    HAHOW_AVG_PRICE=Math.round(getHahowAvgPrice() / 100) * 100;
    return true;
  }catch(error){
    HAHOW_BIZ_COURSES=[];
    courseDataLoadError=error;
    console.error('[AERO courses] Failed to load Hahow course data', error);
    return false;
  }
}

function renderCourseDataErrorState(target=document.getElementById('participant-intro')){
  if(!target) return;
  const message=sanitizeCourseText(courseDataLoadError?.message || '課程資料載入失敗。');
  target.innerHTML=`
    <section class="aero-error-state" role="alert">
      <p class="sec-tag">Course Data Error</p>
      <h1 class="serif">無法載入課程資料</h1>
      <p>${message}</p>
      <p>請重新載入頁面；若仍失敗，請確認 <code>geo_/data/hahow_courses.json</code> 是否已由 <code>geo_/hahow_courses.xlsx</code> 產生並成功部署。</p>
      <div class="error-actions">
        <button class="btn-proceed" type="button" onclick="location.reload()">重新載入</button>
        <button class="btn-line" type="button" onclick="resetExperiment()">重新開始研究</button>
      </div>
    </section>`;
}

function getEligibleCoursesForBudget(value){
  const budget=Number(value);
  if(!Number.isFinite(budget)) return [];
  return HAHOW_BIZ_COURSES.filter((course)=>Number.isFinite(Number(course.price)) && Number(course.price)<=budget);
}

/* ── State ── */
let selSC=null, curSC=null;
let assignedCondition=null;
let currentConditionRemainder=null;
let curDualPath=null;
let ctrlOpen=false, swCnt=0, ctaCnt=0;
let budgetValue = 1000;
// Legacy session/business log. It remains separate from AEROTrackingService
// research events and must never receive the new tracking event stream.
const eventLog=[];

const SESSION_LOG_STORAGE_KEY = 'aero_current_session_log';

function generateParticipantId(){
  if(globalThis.crypto?.randomUUID){
    return `AERO-${crypto.randomUUID()}`;
  }
  const randomPart=globalThis.crypto?.getRandomValues
    ? crypto.getRandomValues(new Uint32Array(2)).join('-')
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `AERO-${randomPart}`;
}

function createEmptySessionLog(){
  return {
    participant_id: generateParticipantId(),
    confirmed_budget: null,
    round_candidates: {},
    used_course_ids: [],
    course_data_summary: null,
    demographics: {
      education_level: '',
      major_group: '',
      disposable_income_level: '',
      household_income_level: '',
    },
    pretest: {
      prior_knowledge: null,
      ai_use_frequency: null,
    },
    experiment_assignment: {
      remainder_group: null,
      sequence: [],
      current_step_index: 0,
      condition_id: null,
      condition_label: '',
      scenario_key: '',
      narrative_style: '',
      structure_style: '',
      assigned_at: null,
    },
    behavior_metrics: {
      budget_slider_history: [],
      clicked_courses: [],
      dwell_times: {
        aero_ai_summary_block: 0,
      },
      round_results: [],
      adopted_course_ids: [],
      round_decisions: {},
    },
    market_features: {
      budget_level: '',
    },
  };
}

function cloneSessionLog(){
  return JSON.parse(JSON.stringify(currentSessionLog));
}

function loadCurrentSessionLog(){
  try{
    const raw=sessionStorage.getItem(SESSION_LOG_STORAGE_KEY);
    if(!raw) return createEmptySessionLog();
    const parsed=JSON.parse(raw);
    const fallback=createEmptySessionLog();
    return {
      ...fallback,
      ...parsed,
      participant_id: (typeof parsed?.participant_id==='string' && parsed.participant_id.trim())
        ? parsed.participant_id.trim()
        : fallback.participant_id,
      demographics: {
        ...fallback.demographics,
        ...(parsed?.demographics || {}),
      },
      pretest: {
        ...fallback.pretest,
        ...(parsed?.pretest || {}),
      },
      experiment_assignment: {
        ...fallback.experiment_assignment,
        ...(parsed?.experiment_assignment || {}),
      },
      behavior_metrics: {
        ...fallback.behavior_metrics,
        ...(parsed?.behavior_metrics || {}),
        budget_slider_history: Array.isArray(parsed?.behavior_metrics?.budget_slider_history)
          ? parsed.behavior_metrics.budget_slider_history
          : [],
        clicked_courses: Array.isArray(parsed?.behavior_metrics?.clicked_courses)
          ? parsed.behavior_metrics.clicked_courses
          : [],
        dwell_times: {
          ...fallback.behavior_metrics.dwell_times,
          ...(parsed?.behavior_metrics?.dwell_times || {}),
        },
        round_results: Array.isArray(parsed?.behavior_metrics?.round_results)
          ? parsed.behavior_metrics.round_results
          : [],
        adopted_course_ids: Array.isArray(parsed?.behavior_metrics?.adopted_course_ids)
          ? parsed.behavior_metrics.adopted_course_ids
          : [],
        round_decisions: (parsed?.behavior_metrics?.round_decisions && typeof parsed.behavior_metrics.round_decisions==='object')
          ? parsed.behavior_metrics.round_decisions
          : {},
      },
      confirmed_budget: Number.isFinite(Number(parsed?.confirmed_budget))
        ? Number(parsed.confirmed_budget)
        : null,
      round_candidates: (parsed?.round_candidates && typeof parsed.round_candidates==='object')
        ? parsed.round_candidates
        : {},
      used_course_ids: Array.isArray(parsed?.used_course_ids)
        ? parsed.used_course_ids.map(String)
        : [],
      course_data_summary: parsed?.course_data_summary || null,
      market_features: {
        ...fallback.market_features,
        ...(parsed?.market_features || {}),
      },
    };
  }catch(_err){
    return createEmptySessionLog();
  }
}

let currentSessionLog = loadCurrentSessionLog();

/* ── Research tracking service integration (Phase 3A lifecycle only) ── */
const researchTrackingIntegration=window.AEROTrackingIntegration?.create?.({
  debug:()=>window.AERO_TRACKING_DEBUG===true,
  warn:(message, error)=>console.warn(message, error),
}) || null;
let completedTrackingRoundContext=null;

function safeTrackCall(methodName, ...args){
  try{
    if(!researchTrackingIntegration || typeof researchTrackingIntegration[methodName]!=='function') return null;
    return researchTrackingIntegration[methodName](...args);
  }catch(error){
    console.warn(`[AERO tracking] integration ${methodName} failed`, error);
    return null;
  }
}

function getResearchTrackingContext(pageName=null){
  if((pageName==='round_transition' || pageName==='questionnaire') && completedTrackingRoundContext){
    return {...completedTrackingRoundContext, ...(pageName ? {page_name:pageName} : {})};
  }
  return {
    participant_id: currentSessionLog?.participant_id || null,
    condition_id: assignedCondition?.conditionId ?? currentSessionLog?.experiment_assignment?.condition_id ?? null,
    scenario_key: curSC || currentSessionLog?.experiment_assignment?.scenario_key || null,
    round_index: Number.isInteger(currentStepIndex) && assignedCondition ? currentStepIndex : null,
    course_id: selectedCourse?.id || selectedRecoCourseId || null,
    ...(pageName ? {page_name:pageName} : {}),
  };
}

function initializeResearchTracking(){
  return safeTrackCall('initialize', {participant_id:currentSessionLog?.participant_id || null});
}

function updateTrackingContext(pageName=null){
  return safeTrackCall('updateContext', getResearchTrackingContext(pageName));
}

function enterTrackingPage(pageName, reason='navigation'){
  if(!pageName) return safeTrackCall('transitionPage', null, reason);
  updateTrackingContext(pageName);
  return safeTrackCall('transitionPage', pageName, reason, {entry_method:reason});
}

function leaveTrackingPage(reason='navigation'){
  return safeTrackCall('transitionPage', null, reason);
}

function syncTrackingPageForUi(uiPageName){
  if(!ROLE?.participant) return false;
  updateTrackingContext();
  return safeTrackCall('syncUiPage', uiPageName, 'go_page');
}

function startTrackingRound(){
  completedTrackingRoundContext=null;
  updateTrackingContext();
  return safeTrackCall('startRound', getResearchTrackingContext('course_list'));
}

function finishTrackingRound(reason, roundIndex){
  completedTrackingRoundContext={
    ...getResearchTrackingContext(),
    round_index:roundIndex,
  };
  return safeTrackCall('finishRound', reason, roundIndex);
}

function restoreResearchTrackingSession(){
  if(!ROLE?.participant || !isParticipantProfileComplete()) return false;
  const assignment=currentSessionLog?.experiment_assignment;
  if(!assignment || assignment.remainder_group===null) return false;
  initializeResearchTracking();
  const snapshot=safeTrackCall('safeTrackCall', 'getSnapshot');
  const participantId=currentSessionLog.participant_id;
  if(!safeTrackCall('validStoredSession', snapshot, participantId)){
    if(snapshot?.experiment_session_id) console.warn('[AERO tracking] stored session could not be safely resumed');
    return false;
  }
  safeTrackCall('setConsent', true);
  updateTrackingContext();
  safeTrackCall('startOrResume', {
    participant_id:participantId,
    profile_complete:true,
    context:getResearchTrackingContext(),
    resume_reason:'refresh_or_restore',
    completed_round_indices:(currentSessionLog.behavior_metrics?.round_results || []).map((round)=>round.round_index),
    current_round_started:currentSessionLog.experiment_assignment?.current_step_index != null,
  });
  return true;
}

function syncCurrentSessionLogStorage(){
  try{
    sessionStorage.setItem(SESSION_LOG_STORAGE_KEY, JSON.stringify(currentSessionLog));
  }catch(_err){
    // Ignore storage failures in private browsing or restricted contexts.
  }
}

function syncCurrentSessionLogDwellTimes(){
  currentSessionLog.behavior_metrics.dwell_times.aero_ai_summary_block = getStaySec('s');
  syncCurrentSessionLogStorage();
}

function unixTs(){
  return Math.floor(Date.now()/1000);
}

function recordBudgetHistory(){
  const timestamp=unixTs();
  const history=currentSessionLog.behavior_metrics.budget_slider_history;
  const nextBudget=Number(budgetValue);
  if(!Number.isFinite(nextBudget)) return;
  const last=history[history.length-1];
  if(last && last.budget===nextBudget){
    return;
  }
  history.push({ budget:nextBudget, timestamp });
  syncCurrentSessionLogStorage();
}

function getSelectedCourseIdForLog(){
  return selectedCourse?.id || selectedRecoCourseId || null;
}

function recordClickedCourse(){
  const courseId=getSelectedCourseIdForLog();
  if(!courseId) return;
  currentSessionLog.behavior_metrics.clicked_courses.push({
    course_id: courseId,
    timestamp: unixTs(),
  });
  syncCurrentSessionLogStorage();
}

function isParticipantProfileComplete(){
  return Boolean(
    currentSessionLog.demographics.education_level &&
    currentSessionLog.demographics.major_group &&
    currentSessionLog.demographics.disposable_income_level &&
    currentSessionLog.demographics.household_income_level
  );
}

function setParticipantProfile({ educationLevel, majorGroup, disposableIncomeLevel, householdIncomeLevel, priorKnowledge, aiUseFrequency }){
  currentSessionLog.demographics.education_level = educationLevel || '';
  currentSessionLog.demographics.major_group = majorGroup || '';
  currentSessionLog.demographics.disposable_income_level = disposableIncomeLevel || '';
  currentSessionLog.demographics.household_income_level = householdIncomeLevel || '';
  currentSessionLog.pretest.prior_knowledge = Number(priorKnowledge) || null;
  currentSessionLog.pretest.ai_use_frequency = Number(aiUseFrequency) || null;
  syncCurrentSessionLogStorage();
}

const behaviorStats = {
  s_stayMs:0,
};

const stayState = {
  s_visible:false,
  s_since:0,
};

let stayObserver = null;
let dwellSyncTimer = null;
let hasClickedJoin = false;
let latestResultPayload = null;
let latestResultJson = '';
let selectedRecoCourseId = null;
let selectedCourse = null;
let currentCourseView = 'list';
let activeDetailCourseId = null;
let detailEntryMethod = null;
let detailOpenedAt = null;
let currentRoundCandidateIds = [];
let currentStepIndex = 0;
let roundDwellCheckpoint = { s:0 };
let experimentModuloUserId = null;

const roleParams = new URLSearchParams(window.location.search);
const ROLE = {
  researcher: false,
};
ROLE.participant = !ROLE.researcher;
const ADVISOR_DEMO_MODE = roleParams.get('demo') === '1';
let scenarioBriefingAcknowledged = false;

function participantMapStep(pageName){
  const map={landing:0,course:1,thankyou:2};
  return map[pageName] ?? 0;
}

function getConditionCombinationSummary(plan){
  const order=(plan.sequence || []).map((key)=>key.toUpperCase()).join('➔');
  return `餘數 ${plan.remainderGroup} ｜ 順序 ${order || '-'} ｜ 回合 ${Number(plan.currentStepIndex || 0) + 1}`;
}

function getCurrentExperimentPlan(){
  const remainderGroup = normalizeRemainder(currentConditionRemainder ?? experimentModuloUserId ?? userId);
  const sequence = [...getSequenceByRemainder(remainderGroup)];
  const safeStep = normalizeStepIndex(currentStepIndex);
  const scenarioKey = curSC || getScenarioForStep(remainderGroup, safeStep);
  const condition = getConditionByScenarioKey(scenarioKey);
  return {
    remainderGroup,
    sequence,
    currentStepIndex: safeStep,
    ...condition,
  };
}

function resetSurveyInputs(){
  document.querySelectorAll('input[name^="q"], input[name="adoption_choice"]').forEach((el)=>{
    el.checked=false;
  });
}

function appendRoundResult(q1=null, q2=null, q3=null){
  syncCurrentSessionLogDwellTimes();
  const now={
    s:getStaySec('s'),
  };
  const step=normalizeStepIndex(currentStepIndex);
  const decision=currentSessionLog.behavior_metrics.round_decisions?.[String(step)] || {};
  const roundResult={
    round_index: step,
    scenario_key: curSC || getScenarioForStep(currentConditionRemainder ?? experimentModuloUserId ?? userId, step),
    selected_course_id: getSelectedCourseIdForLog(),
    condition_id: assignedCondition?.conditionId ?? null,
    eligible_course_ids: [...(decision.eligible_course_ids || [])],
    candidate_course_ids: [...(decision.candidate_course_ids || [])],
    viewed_course_ids: [...(decision.viewed_course_ids || [])],
    rejected_course_ids: [...(decision.rejected_course_ids || [])],
    actual_adoption_action: decision.actual_adoption_action || null,
    adoption_timestamp: decision.adoption_timestamp || null,
    candidate_seed: decision.candidate_seed || null,
    candidate_generation_version: decision.candidate_generation_version || null,
    q1_depthLogic: Number.isFinite(Number(q1)) ? Number(q1) : null,
    q2_visualAttraction: Number.isFinite(Number(q2)) ? Number(q2) : null,
    q3_purchaseIntent: Number.isFinite(Number(q3)) ? Number(q3) : null,
    dwell_times: {
      aero_ai_summary_block: Number(Math.max(0, now.s - roundDwellCheckpoint.s).toFixed(2)),
    },
    submitted_at: new Date().toISOString(),
  };

  currentSessionLog.behavior_metrics.round_results.push(roundResult);
  roundDwellCheckpoint=now;
  syncCurrentSessionLogStorage();
  return roundResult;
}

function getCurrentProgressStage(){
  if(latestResultPayload) return '已完成問卷';
  if(hasClickedJoin) return '已點擊報名';
  if(curSC) return '已進入課程頁';
  if(selectedCourse || selSC || selectedRecoCourseId) return '已選擇課程';
  if(assignedCondition || currentSessionLog?.experiment_assignment?.remainder_group !== null) return '已分配條件';
  return '尚未開始';
}

function getCourseScenarioKey(course, index){
  if(course?.scenarioKey && SC_DATA[course.scenarioKey]) return course.scenarioKey;
  const keys=getScenarioKeys();
  return keys[index % keys.length] || 'a';
}

function getBackendRecords(){
  try{
    const text=localStorage.getItem(BACKEND_RECORDS_KEY);
    const arr=JSON.parse(text || '[]');
    return Array.isArray(arr) ? arr : [];
  }catch(_err){
    return [];
  }
}

function setBackendRecords(records){
  try{
    localStorage.setItem(BACKEND_RECORDS_KEY, JSON.stringify(records));
  }catch(_err){
    // Ignore storage failures in restricted browser mode.
  }
}

function typewriteInto(el, text, speed=16){
  if(!el) return;
  if(el._typeTimer){
    clearTimeout(el._typeTimer);
    el._typeTimer=null;
  }
  const src=String(text || '');
  let idx=0;
  el.textContent='';

  const tick=()=>{
    idx+=1;
    el.textContent=src.slice(0, idx);
    if(idx<src.length){
      el._typeTimer=setTimeout(tick, speed);
    }
  };

  tick();
}

function nowMs(){
  return (typeof performance!=='undefined' && performance.now) ? performance.now() : Date.now();
}

function setStayVisible(prefix, isVisible){
  const visKey = `${prefix}_visible`;
  const sinceKey = `${prefix}_since`;
  const msKey = `${prefix}_stayMs`;
  const current = nowMs();

  if(isVisible){
    if(!stayState[visKey]){
      stayState[visKey]=true;
      stayState[sinceKey]=current;
    }
    syncCurrentSessionLogDwellTimes();
    return;
  }

  if(stayState[visKey]){
    behaviorStats[msKey]+=Math.max(0, current-stayState[sinceKey]);
    stayState[visKey]=false;
    stayState[sinceKey]=0;
    syncCurrentSessionLogDwellTimes();
  }
}

function pauseAllStayTimers(){
  setStayVisible('s', false);
  syncCurrentSessionLogDwellTimes();
}

function stopBackgroundTrackers(){
  pauseAllStayTimers();
  if(stayObserver){
    stayObserver.disconnect();
    stayObserver = null;
  }
  if(dwellSyncTimer){
    clearInterval(dwellSyncTimer);
    dwellSyncTimer = null;
  }
}

function getStaySec(prefix){
  const visKey = `${prefix}_visible`;
  const sinceKey = `${prefix}_since`;
  const msKey = `${prefix}_stayMs`;
  const liveMs = stayState[visKey] ? Math.max(0, nowMs()-stayState[sinceKey]) : 0;
  return Number(((behaviorStats[msKey]+liveMs)/1000).toFixed(2));
}

function initBehaviorTracking(){
  // High-precision dwell timer for the single AI block is pointer-driven.
  const bindDwellPointer=(id, key)=>{
    const el=document.getElementById(id);
    if(!el || el.dataset.dwellBound==='1') return;
    el.addEventListener('mouseenter', ()=>setStayVisible(key, true));
    el.addEventListener('mouseleave', ()=>setStayVisible(key, false));
    el.dataset.dwellBound='1';
  };
  bindDwellPointer('block-aero-ai-summary', 's');

  if(!dwellSyncTimer){
    dwellSyncTimer=setInterval(()=>{
      syncCurrentSessionLogDwellTimes();
    }, 1000);
  }

  syncCurrentSessionLogDwellTimes();
}

function updateRoundProgress(completedRounds){
  document.querySelectorAll('#round-progress span').forEach((segment, index)=>{
    segment.classList.toggle('done', index < completedRounds);
  });
}

function showRoundTransition(roundResult=null, isFinal=false){
  const completedRounds=roundResult ? roundResult.round_index + 1 : TOTAL_ROUNDS;
  const page=document.getElementById('page-round-transition');
  const survey=document.getElementById('join-modal');
  const form=document.getElementById('join-modal-form');
  const done=document.getElementById('join-modal-done');
  const kicker=document.getElementById('round-transition-kicker');
  const title=document.getElementById('round-transition-title');
  const desc=document.getElementById('round-transition-desc');
  const action=document.getElementById('round-transition-action');
  const next=document.getElementById('round-transition-next');
  const note=document.getElementById('round-transition-note');
  if(!page || !survey || !form || !done) return;

  page.classList.toggle('final-stage', isFinal);
  page.classList.remove('questionnaire-intro-stage');
  survey.setAttribute('aria-hidden', isFinal ? 'false' : 'true');
  form.style.display='block';
  done.style.display='none';
  updateRoundProgress(completedRounds);
  ensureJourneyHeader();
  const memory=renderDecisionMemory();

  if(isFinal){
    page.classList.add('questionnaire-intro-stage');
    survey.setAttribute('aria-hidden', 'true');
    if(kicker) kicker.textContent='研究流程 · 最後問卷前';
    if(title) title.textContent='你已完成所有課程選擇';
    if(desc) desc.innerHTML=`接下來，我們想了解你剛才閱讀課程資訊與做出決策時的真實感受。<div class="transition-memory">${memory}</div>`;
    if(action) action.style.display='flex';
    if(next){
      next.textContent='開始填寫問卷';
      next.onclick=()=>showQuestionnaireForm();
    }
    if(note) note.textContent='問卷題目本身維持原研究版本。';
  }else{
    if(kicker) kicker.textContent=`研究流程 · 第 ${completedRounds} / ${TOTAL_ROUNDS} 回合`;
    if(title) title.textContent=`你完成了第 ${completedRounds} 回合`;
    const selectedTitle=roundResult?.selected_course_id ? (getCourseById(roundResult.selected_course_id)?.title || roundResult.selected_course_id) : '未記錄';
    const selectedPrice=roundResult?.selected_course_id ? getCourseById(roundResult.selected_course_id)?.price : null;
    if(desc) desc.innerHTML=`本回合選擇課程：<strong>${sanitizeCourseText(selectedTitle)}</strong><br>課程價格：<strong>${selectedPrice ? formatNTD(selectedPrice) : '價格未記錄'}</strong><br>整體進度 ${completedRounds} / ${TOTAL_ROUNDS}<div class="transition-memory">${memory}</div>`;
    if(action) action.style.display='flex';
    if(next){
      next.textContent=`開始第 ${completedRounds + 1} 回合`;
      next.onclick=()=>continueParticipantRound();
    }
    if(note) note.textContent='您可依自己的節奏繼續。';
  }
  goPage('round-transition');
  ensureJourneyHeader();
  updateAdvisorDemoPanel();
}

function showQuestionnaireForm(){
  const page=document.getElementById('page-round-transition');
  const survey=document.getElementById('join-modal');
  const action=document.getElementById('round-transition-action');
  if(page) page.classList.remove('questionnaire-intro-stage');
  if(survey) survey.setAttribute('aria-hidden','false');
  if(action) action.style.display='none';
  safeTrackCall('startQuestionnaire', {questionnaire_version:'aero-q1-q12-v1'});
  survey?.scrollIntoView({behavior:'smooth', block:'start'});
  updateAdvisorDemoPanel();
}

function continueParticipantRound(){
  showRoundIntro(currentStepIndex);
}

// Kept as a compatible entry point for researcher-mode controls.
function openJoinModal(){
  showRoundTransition(null, true);
}

function closeJoinModal(){
  const survey=document.getElementById('join-modal');
  if(survey) survey.setAttribute('aria-hidden','true');
}

function buildResultPayload(scores, adoptionChoice){
  const plan=getCurrentExperimentPlan();
  const budgetLevel=getBudgetLevelLabel(budgetValue);
  return {
    exportedAt: new Date().toISOString(),
    participant: {
      userId,
      hasClickedJoin,
      remainderGroup: plan.remainderGroup,
      conditionId: plan.conditionId,
      conditionLabel: plan.summaryLabel,
      narrativeStyle: plan.narrativeStyle,
      narrativeStyleLabel: plan.narrativeStyleLabel,
      structureStyle: plan.structureStyle,
      structureStyleLabel: plan.structureStyleLabel,
      scenario: curSC,
      scenarioLabel: curSC ? SC_DATA[curSC].label : null,
      budgetValue,
      budget_level: budgetLevel,
      modulo_user_id: experimentModuloUserId,
      sequence: plan.sequence,
      currentStepIndex: plan.currentStepIndex,
    },
    behavior: {
      ai_summary_staySec: getStaySec('s'),
      switchCount: swCnt,
      ctaClicks: ctaCnt,
    },
    survey: {
      q1_depthLogic: scores[0],
      q2_visualAttraction: scores[1],
      q3_purchaseIntent: scores[2],
      q4_contentAdoptionIntent: scores[3],
      q5_relianceIntent: scores[4],
      q6_continuedUseIntent: scores[5],
      q7_structureClarity: scores[6],
      q8_keyPointFindability: scores[7],
      q9_cognitiveThought: scores[8],
      q10_reasonEvaluation: scores[9],
      q11_sourceCueInfluence: scores[10],
      q12_visualCueInfluence: scores[11],
      actualAdoptionChoice: adoptionChoice,
    },
    roundResults: [...(currentSessionLog.behavior_metrics.round_results || [])],
    events: [...eventLog],
  };
}

function escapeCsv(value){
  const text=String(value ?? '');
  return `"${text.replace(/"/g,'""')}"`;
}

function payloadToCsv(payload){
  const row={
    exportedAt: payload.exportedAt,
    userId: payload.participant.userId,
    hasClickedJoin: payload.participant.hasClickedJoin,
    remainderGroup: payload.participant.remainderGroup,
    conditionId: payload.participant.conditionId,
    conditionLabel: payload.participant.conditionLabel,
    narrativeStyle: payload.participant.narrativeStyle,
    narrativeStyleLabel: payload.participant.narrativeStyleLabel,
    structureStyle: payload.participant.structureStyle,
    structureStyleLabel: payload.participant.structureStyleLabel,
    scenario: payload.participant.scenario,
    scenarioLabel: payload.participant.scenarioLabel,
    budgetValue: payload.participant.budgetValue,
    budget_level: payload.participant.budget_level,
    modulo_user_id: payload.participant.modulo_user_id,
    ai_summary_staySec: payload.behavior.ai_summary_staySec,
    switchCount: payload.behavior.switchCount,
    ctaClicks: payload.behavior.ctaClicks,
    q1_depthLogic: payload.survey.q1_depthLogic,
    q2_visualAttraction: payload.survey.q2_visualAttraction,
    q3_purchaseIntent: payload.survey.q3_purchaseIntent,
    q4_contentAdoptionIntent: payload.survey.q4_contentAdoptionIntent,
    q5_relianceIntent: payload.survey.q5_relianceIntent,
    q6_continuedUseIntent: payload.survey.q6_continuedUseIntent,
    q7_structureClarity: payload.survey.q7_structureClarity,
    q8_keyPointFindability: payload.survey.q8_keyPointFindability,
    q9_cognitiveThought: payload.survey.q9_cognitiveThought,
    q10_reasonEvaluation: payload.survey.q10_reasonEvaluation,
    q11_sourceCueInfluence: payload.survey.q11_sourceCueInfluence,
    q12_visualCueInfluence: payload.survey.q12_visualCueInfluence,
    pretestPriorKnowledge: currentSessionLog.pretest?.prior_knowledge ?? '',
    pretestAiUseFrequency: currentSessionLog.pretest?.ai_use_frequency ?? '',
    actualAdoptionChoice: payload.survey.actualAdoptionChoice,
  };
  const keys=Object.keys(row);
  const header=keys.join(',');
  const dataLine=keys.map((k)=>escapeCsv(row[k])).join(',');
  return `${header}\n${dataLine}`;
}

function downloadFile(content, fileName, mimeType){
  const blob=new Blob([content], { type:mimeType });
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function showJoinComplete(){
  const form=document.getElementById('join-modal-form');
  const done=document.getElementById('join-modal-done');
  if(form) form.style.display='none';
  if(done) done.style.display='block';
}

function submitJoinSurvey(){
  const answers=Array.from({length:12}, (_, index)=>document.querySelector(`input[name="q${index + 1}"]:checked`));
  const adoptionChoice=document.querySelector('input[name="adoption_choice"]:checked');
  if(answers.some((answer)=>!answer) || !adoptionChoice){
    toast('請先完成所有評分與實際選擇再提交');
    return;
  }

  const rounds=Array.isArray(currentSessionLog?.behavior_metrics?.round_results)
    ? currentSessionLog.behavior_metrics.round_results
    : [];
  if(rounds.length < TOTAL_ROUNDS){
    toast('請先完成 4 回合內容瀏覽後再提交問卷');
    return;
  }

  pauseAllStayTimers();
  const scores=answers.map((answer)=>Number(answer.value));
  latestResultPayload=buildResultPayload(scores, adoptionChoice.value);
  latestResultJson=JSON.stringify(latestResultPayload, null, 2);
  saveBackendRecord();
  safeTrackCall('submitQuestionnaireSuccess', {
    questionnaire_version:'aero-q1-q12-v1',
    answered_item_count:answers.length + 1,
  });
  stopBackgroundTrackers();
  goPage('thankyou');
  toast('四回合已完成，感謝填答');
}

function exportResultCsv(){
  if(!latestResultPayload){
    toast('請先提交問卷');
    return;
  }
  const csv=payloadToCsv(latestResultPayload);
  downloadFile(csv, `aero-result-${userId}.csv`, 'text/csv;charset=utf-8');
}

function copyResultJson(){
  if(!latestResultJson){
    toast('請先提交問卷');
    return;
  }
  navigator.clipboard.writeText(latestResultJson)
    .then(()=>toast('已複製 JSON'))
    .catch(()=>prompt('請手動複製：', latestResultJson));
}

async function assignConditionByUserId(){
  let assignment=null;
  try{
    const response=await fetch(apiUrl('/api/assign'), {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ participant_id:currentSessionLog.participant_id }),
    });
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    assignment=await response.json();
  }catch(_err){
    if(ADVISOR_DEMO_MODE){
      assignment=createAdvisorDemoAssignment();
      console.warn('AERO assignment API failed; Advisor Demo Mode is using local deterministic assignment', _err);
      toast(`Advisor Demo Mode：研究資料庫未連線，已使用本機示範分派（API：${getApiBaseDescription()}）`, 6500);
    }else{
    toast(`研究資料庫連線失敗（API：${getApiBaseDescription()}）`, 8000);
    console.error('AERO assignment API failed', _err);
    return false;
    }
  }
  experimentModuloUserId=Number(assignment.assignment_number);
  const plan=getExperimentPlanByUserId(Number(assignment.remainder_group));
  currentConditionRemainder=plan.remainderGroup;
  currentStepIndex=0;
  curSC=getScenarioForStep(currentConditionRemainder, currentStepIndex);
  selSC=curSC;
  assignedCondition=getConditionByScenarioKey(curSC);
  curDualPath = (SC_DATA[curSC].path.includes('中央'))
    ? { key:'central', label:'中央路徑（理性）', tag:'中央路徑' }
    : { key:'peripheral', label:'邊緣路徑（感性）', tag:'邊緣路徑' };

  roundDwellCheckpoint={
    s:getStaySec('s'),
  };
  currentSessionLog.behavior_metrics.round_results = [];
  latestResultPayload = null;
  latestResultJson = '';

  currentSessionLog.experiment_assignment = {
    remainder_group: plan.remainderGroup,
    sequence: [...plan.sequence],
    modulo_user_id: experimentModuloUserId,
    assignment_seed: assignment.assignment_number,
    current_step_index: currentStepIndex,
    condition_id: assignedCondition.conditionId,
    condition_label: assignedCondition.summaryLabel,
    scenario_key: assignedCondition.scenarioKey,
    narrative_style: assignedCondition.narrativeStyle,
    structure_style: assignedCondition.structureStyle,
    assigned_at: new Date().toISOString(),
  };
  syncCurrentSessionLogStorage();
  logEvent('AUTO_ASSIGN', `REM-${plan.remainderGroup} ${plan.sequence.map((key)=>key.toUpperCase()).join('>')}`);
  return true;
}

function configureRoleUI(){
  const stepNav=document.getElementById('step-nav');
  const navTrail=document.getElementById('nav-trail');
  if(!ROLE.participant){
    if(stepNav) stepNav.style.display='none';
    if(navTrail) navTrail.style.display='none';
    return;
  }

  const ctrlBtn=document.getElementById('ctrl-btn');
  const ctrlPanel=document.getElementById('ctrl-panel');
  if(ctrlBtn) ctrlBtn.classList.add('hidden-role');
  if(ctrlPanel) ctrlPanel.classList.add('hidden-role');

  const navBtns=document.querySelectorAll('.nav-r .nav-icon-btn');
  navBtns.forEach(btn=>btn.classList.add('hidden-role'));

  const title=document.getElementById('land-title-main');
  if(title){
    title.innerHTML='<span class="land-line">AI 敘事式商管課程體驗</span><span class="land-line">歡迎參與本次<em>研究</em></span>';
  }

  const intro=document.getElementById('participant-intro');
  const s1=document.getElementById('step1-area');
  const s2=document.getElementById('step2-area');
  if(intro) intro.style.display='block';
  if(s1) s1.style.display='none';
  if(s2) s2.style.display='none';

  const nt0=document.querySelector('#nt0 .nt-lbl');
  const nt1=document.querySelector('#nt1 .nt-lbl');
  const nt2=document.querySelector('#nt2 .nt-lbl');
  if(nt0) nt0.textContent='閱讀說明';
  if(nt1) nt1.textContent='瀏覽課程';
  if(nt2) nt2.textContent='填寫問卷';

  const nt3=document.getElementById('nt3');
  const ntSeps=document.querySelectorAll('#nav-trail .nt-sep');
  if(nt3) nt3.classList.add('hidden-role');
  if(ntSeps[2]) ntSeps[2].classList.add('hidden-role');

  const si0=document.querySelector('#si0 .si-lbl');
  const si1=document.querySelector('#si1 .si-lbl');
  const si2=document.querySelector('#si2 .si-lbl');
  const si3=document.getElementById('si3');
  if(si0) si0.textContent='閱讀說明';
  if(si1) si1.textContent='瀏覽課程';
  if(si2) si2.textContent='填寫問卷';
  if(si3) si3.classList.add('hidden-role');

  const sub0=document.getElementById('si0-sub');
  const sub1=document.getElementById('si1-sub');
  const sub2=document.querySelector('#si2 .si-sub');
  if(sub0) sub0.textContent='閱讀研究說明';
  if(sub1) sub1.textContent='調整預算後選擇課程';
  if(sub2) sub2.textContent='完成流程';

  const axisRow=document.querySelector('.sc-axis-row');
  if(axisRow) axisRow.style.display='none';

  const scGrid=document.getElementById('sc-grid');
  if(scGrid) scGrid.style.display='none';

  const step2Area=document.getElementById('step2-area');
  if(step2Area){
    const title=step2Area.querySelector('.step-title');
    const desc=step2Area.querySelector('.step-desc');
    if(title) title.textContent='請選擇預算內課程';
    if(desc) desc.textContent='調整預算後，直接從課程清單選擇一門課程進入課程頁面。';
  }

  const proceedRow=step2Area?.querySelector('.proceed-row');
  if(proceedRow) proceedRow.style.display='none';

  const recoTitle=document.querySelector('#hahow-reco .hahow-reco-head h3');
  if(recoTitle) recoTitle.textContent='可選課程';
}

function initResearcherEntry(){
  const heroCard=document.getElementById('researcher-hero-card');
  if(!heroCard) return;

  const urlRole=String(new URLSearchParams(window.location.search).get('role') || '').trim().toLowerCase();
  const isResearcher=urlRole==='researcher';

  if(!isResearcher){
    if(heroCard) heroCard.style.display='none';
    return;
  }

  if(heroCard) heroCard.style.display='block';
}

function updateConsentState(){
  const consent=document.getElementById('participant-consent');
  const startBtn=document.getElementById('participant-start-btn');
  if(startBtn) startBtn.disabled=!consent?.checked;
  if(consent?.checked){
    initializeResearchTracking();
    safeTrackCall('setConsent', true);
  }
}

// Keep the experiment layout at a stable browser scale on touchpads and mobile devices.
document.addEventListener('wheel', (event)=>{
  if(event.ctrlKey || event.metaKey) event.preventDefault();
}, { passive:false });
document.addEventListener('gesturestart', (event)=>event.preventDefault(), { passive:false });
document.addEventListener('gesturechange', (event)=>event.preventDefault(), { passive:false });

function startParticipantCourse(){
  if(!ROLE.participant) return;
  const consent=document.getElementById('participant-consent');
  if(!consent?.checked){
    toast('請先閱讀測驗說明並勾選知情同意');
    updateConsentState();
    return;
  }
  initializeResearchTracking();
  safeTrackCall('setConsent', true);
  ensureParticipantProfileModal();
  openParticipantProfileModal();
}

function enterParticipantCourseFlow(){
  const intro=document.getElementById('participant-intro');
  const step2=document.getElementById('step2-area');
  if(intro) intro.style.display='none';
  if(step2) step2.style.display='block';

  if(!assignedCondition) assignConditionByUserId();
  initBudgetUI();
  showScenarioBriefing();
}

const PARTICIPANT_PROFILE_STEPS = [
  { fieldName:'participant-profile-education', label:'教育程度' },
  { fieldName:'participant-profile-major', label:'主修科系背景' },
  { fieldName:'participant-profile-disposable', label:'每月可支配所得' },
  { fieldName:'participant-profile-household', label:'家庭年總所得區間' },
  { fieldName:'participant-pretest-knowledge', label:'課程先備知識' },
  { fieldName:'participant-pretest-ai-use', label:'AI 使用經驗' },
];
let participantProfileStepIndex = 0;
let participantProfileSubmitting = false;

function isParticipantProfileStepComplete(modal, stepIndex){
  const step=PARTICIPANT_PROFILE_STEPS[stepIndex];
  if(!step) return false;
  return Boolean(modal.querySelector(`input[name="${step.fieldName}"]:checked`));
}

function syncParticipantProfileOptionState(modal){
  modal.querySelectorAll('.profile-option-card').forEach((label)=>{
    const input=label.querySelector('input');
    if(!input) return;
    label.classList.toggle('sel', input.checked);
  });
}

function setParticipantProfileStep(stepIndex){
  const modal=document.getElementById('participant-profile-modal');
  if(!modal) return;

  participantProfileStepIndex=Math.min(PARTICIPANT_PROFILE_STEPS.length - 1, Math.max(0, Number(stepIndex) || 0));

  modal.querySelectorAll('.profile-intake-question').forEach((section)=>{
    const idx=Number(section.dataset.step);
    section.classList.toggle('active', idx===participantProfileStepIndex);
  });

  modal.querySelectorAll('.profile-intake-steps li').forEach((item)=>{
    const idx=Number(item.dataset.step);
    item.classList.toggle('active', idx===participantProfileStepIndex);
    item.classList.toggle('done', idx<participantProfileStepIndex);
  });

  const backBtn=modal.querySelector('#participant-profile-back-btn');
  const nextBtn=modal.querySelector('#participant-profile-next-btn');
  if(backBtn){
    backBtn.textContent='← Back';
    backBtn.style.visibility=participantProfileStepIndex===0 ? 'hidden' : 'visible';
  }
  if(nextBtn){
    nextBtn.textContent=participantProfileStepIndex===PARTICIPANT_PROFILE_STEPS.length - 1 ? 'Finish' : 'Next →';
    nextBtn.disabled=!isParticipantProfileStepComplete(modal, participantProfileStepIndex);
  }
}

function prevParticipantProfileStep(){
  setParticipantProfileStep(participantProfileStepIndex - 1);
}

function nextParticipantProfileStep(){
  const modal=document.getElementById('participant-profile-modal');
  if(!modal) return;

  if(!isParticipantProfileStepComplete(modal, participantProfileStepIndex)){
    const label=PARTICIPANT_PROFILE_STEPS[participantProfileStepIndex]?.label || '此題';
    toast(`請先完成${label}`);
    return;
  }

  if(participantProfileStepIndex===PARTICIPANT_PROFILE_STEPS.length - 1){
    submitParticipantProfile();
    return;
  }

  setParticipantProfileStep(participantProfileStepIndex + 1);
}

function ensureParticipantProfileModal(){
  if(document.getElementById('participant-profile-modal')) return;

  const modal=document.createElement('div');
  modal.id='participant-profile-modal';
  modal.className='join-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`
    <div class="join-modal-backdrop"></div>
    <div class="join-modal-dialog profile-intake-dialog" role="dialog" aria-modal="true" aria-labelledby="participant-profile-title">
      <div class="profile-intake-layout" id="participant-profile-form">
        <aside class="profile-intake-side">
          <p class="profile-intake-brand">AERO 商管課程體驗平台</p>
          <h2 class="profile-intake-title" id="participant-profile-title">步驟 1：基本資料與使用經驗</h2>
          <p class="profile-intake-desc">這些資料只用於研究分析，協助我們理解不同背景受試者的課程資訊判斷。</p>
          <ol class="profile-intake-steps">
            <li data-step="0"><span>01</span>教育程度</li>
            <li data-step="1"><span>02</span>主修科系背景</li>
            <li data-step="2"><span>03</span>每月可支配所得</li>
            <li data-step="3"><span>04</span>家庭年總所得區間</li>
            <li data-step="4"><span>05</span>課程先備知識</li>
            <li data-step="5"><span>06</span>AI 使用經驗</li>
          </ol>
        </aside>

        <div class="profile-intake-main join-modal-body profile-template-body">
          <div class="profile-intake-list">
            <section class="profile-intake-question active" data-step="0">
              <p class="profile-intake-qid">Q1</p>
              <p class="profile-intake-qtitle">您教育程度目前就讀於？</p>
              <div class="profile-intake-options cols-3" id="participant-profile-education-row">
                <label class="profile-option-card"><input type="radio" name="participant-profile-education" value="大學 / 大專院校"><span class="profile-option-check">✓</span><span class="profile-option-text">大學 / 大專院校</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-education" value="碩士班"><span class="profile-option-check">✓</span><span class="profile-option-text">碩士班</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-education" value="博士班"><span class="profile-option-check">✓</span><span class="profile-option-text">博士班</span></label>
              </div>
            </section>

            <section class="profile-intake-question" data-step="1">
              <p class="profile-intake-qid">Q2</p>
              <p class="profile-intake-qtitle">您目前的主修科系背景大約屬於哪一類？</p>
              <div class="profile-intake-options cols-2" id="participant-profile-major-row">
                <label class="profile-option-card"><input type="radio" name="participant-profile-major" value="商管 / 資訊管理 / 傳播學群"><span class="profile-option-check">✓</span><span class="profile-option-text">商管 / 資訊管理 / 傳播學群（核心組內群）</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-major" value="理工 / 資訊工程 / 生醫學群"><span class="profile-option-check">✓</span><span class="profile-option-text">理工 / 資訊工程 / 生醫學群</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-major" value="人文 / 文史哲 / 外語 / 藝術學群"><span class="profile-option-check">✓</span><span class="profile-option-text">人文 / 文史哲 / 外語 / 藝術學群</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-major" value="其他"><span class="profile-option-check">✓</span><span class="profile-option-text">其他</span></label>
              </div>
            </section>

            <section class="profile-intake-question" data-step="2">
              <p class="profile-intake-qid">Q3</p>
              <p class="profile-intake-qtitle">扣除每月房租、學費與必要固定開銷後，你/妳平均每月可自由支配金額約為多少？</p>
              <div class="profile-intake-options cols-2" id="participant-profile-disposable-row">
                <label class="profile-option-card"><input type="radio" name="participant-profile-disposable" value="NT$ 5,000 元以下"><span class="profile-option-check">✓</span><span class="profile-option-text">NT$ 5,000 元以下</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-disposable" value="NT$ 5,001 ~ NT$ 10,000 元"><span class="profile-option-check">✓</span><span class="profile-option-text">NT$ 5,001 ~ NT$ 10,000 元</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-disposable" value="NT$ 10,001 ~ NT$ 20,000 元"><span class="profile-option-check">✓</span><span class="profile-option-text">NT$ 10,001 ~ NT$ 20,000 元</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-disposable" value="NT$ 20,001 元以上"><span class="profile-option-check">✓</span><span class="profile-option-text">NT$ 20,001 元以上</span></label>
              </div>
            </section>

            <section class="profile-intake-question" data-step="3">
              <p class="profile-intake-qid">Q4</p>
              <p class="profile-intake-qtitle">若以整個家庭為單位，你/妳家全家年總收入大約落在下列哪個區間？</p>
              <div class="profile-intake-options cols-2" id="participant-profile-household-row">
                <label class="profile-option-card"><input type="radio" name="participant-profile-household" value="日常受薪家庭"><span class="profile-option-check">✓</span><span class="profile-option-text">年所得 NT$ 38 萬元以下</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-household" value="標準小康家庭"><span class="profile-option-check">✓</span><span class="profile-option-text">年所得 NT$ 38 萬 ~ NT$ 100 萬元</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-household" value="穩健中產家庭"><span class="profile-option-check">✓</span><span class="profile-option-text">年所得 NT$ 100 萬 ~ NT$ 235萬元</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-profile-household" value="富裕家庭"><span class="profile-option-check">✓</span><span class="profile-option-text">年所得 NT$ 235 萬元以上</span></label>
              </div>
            </section>

            <section class="profile-intake-question" data-step="4">
              <p class="profile-intake-qid">前測 1</p>
              <p class="profile-intake-qtitle">在進入本次體驗前，您認為自己對線上商管課程內容的了解程度如何？</p>
              <div class="profile-intake-options cols-3">
                ${[1,2,3,4,5,6,7].map((value)=>`<label class="profile-option-card"><input type="radio" name="participant-pretest-knowledge" value="${value}"><span class="profile-option-check">✓</span><span class="profile-option-text">${value} 分</span></label>`).join('')}
              </div>
            </section>

            <section class="profile-intake-question" data-step="5">
              <p class="profile-intake-qid">前測 2</p>
              <p class="profile-intake-qtitle">您平常使用 ChatGPT、Gemini 等生成式 AI 工具的頻率為何？</p>
              <div class="profile-intake-options cols-2">
                <label class="profile-option-card"><input type="radio" name="participant-pretest-ai-use" value="1"><span class="profile-option-check">✓</span><span class="profile-option-text">從未使用</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-pretest-ai-use" value="2"><span class="profile-option-check">✓</span><span class="profile-option-text">每月少於一次</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-pretest-ai-use" value="3"><span class="profile-option-check">✓</span><span class="profile-option-text">每月數次</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-pretest-ai-use" value="4"><span class="profile-option-check">✓</span><span class="profile-option-text">每週數次</span></label>
                <label class="profile-option-card"><input type="radio" name="participant-pretest-ai-use" value="5"><span class="profile-option-check">✓</span><span class="profile-option-text">幾乎每天</span></label>
              </div>
            </section>
          </div>

          <div class="join-actions profile-template-actions profile-intake-actions">
            <button class="btn-line profile-nav-btn" id="participant-profile-back-btn" type="button" onclick="prevParticipantProfileStep()">Back</button>
            <button class="btn-ec btn-ec-final profile-nav-btn" id="participant-profile-next-btn" type="button" onclick="nextParticipantProfileStep()">Next</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelectorAll('.profile-intake-options input').forEach((input)=>{
    input.addEventListener('change', ()=>{
      syncParticipantProfileOptionState(modal);
      setParticipantProfileStep(participantProfileStepIndex);
    });
  });
}

function openParticipantProfileModal(){
  const modal=document.getElementById('participant-profile-modal');
  if(!modal) return;

  const educationLevel=currentSessionLog.demographics.education_level;
  const major=currentSessionLog.demographics.major_group;
  const disposableIncomeLevel=currentSessionLog.demographics.disposable_income_level;
  const householdIncomeLevel=currentSessionLog.demographics.household_income_level;
  const priorKnowledge=String(currentSessionLog.pretest?.prior_knowledge || '');
  const aiUseFrequency=String(currentSessionLog.pretest?.ai_use_frequency || '');
  const educationInput=modal.querySelector(`input[name="participant-profile-education"][value="${educationLevel}"]`);
  const majorInput=modal.querySelector(`input[name="participant-profile-major"][value="${major}"]`);
  const disposableInput=modal.querySelector(`input[name="participant-profile-disposable"][value="${disposableIncomeLevel}"]`);
  const householdInput=modal.querySelector(`input[name="participant-profile-household"][value="${householdIncomeLevel}"]`);
  const knowledgeInput=modal.querySelector(`input[name="participant-pretest-knowledge"][value="${priorKnowledge}"]`);
  const aiUseInput=modal.querySelector(`input[name="participant-pretest-ai-use"][value="${aiUseFrequency}"]`);
  if(educationInput) educationInput.checked=true;
  if(majorInput) majorInput.checked=true;
  if(disposableInput) disposableInput.checked=true;
  if(householdInput) householdInput.checked=true;
  if(knowledgeInput) knowledgeInput.checked=true;
  if(aiUseInput) aiUseInput.checked=true;

  syncParticipantProfileOptionState(modal);
  setParticipantProfileStep(0);

  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}

function closeParticipantProfileModal(){
  const modal=document.getElementById('participant-profile-modal');
  if(!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}

function advisorBudgetLabel(){
  return '本回合補助';
}

function getUiStateName(){
  const visible=document.querySelector('.page.show')?.id?.replace(/^page-/,'') || 'landing';
  if(visible==='landing'){
    if(document.getElementById('advisor-consent-screen')?.hidden===false) return 'consent';
    if(document.getElementById('scenario-briefing')?.hidden===false) return 'scenario_briefing';
    if(document.getElementById('budget-setup')?.hidden===false) return 'budget_setup';
    if(document.getElementById('round-intro')?.hidden===false) return 'round_intro';
    if(document.getElementById('participant-profile-modal')?.classList.contains('open')) return 'participant_profile';
    return 'welcome';
  }
  if(visible==='course') return currentCourseView==='detail' ? 'course_detail' : 'course_list';
  if(visible==='round-transition'){
    const page=document.getElementById('page-round-transition');
    if(page?.classList.contains('questionnaire-intro-stage')) return 'questionnaire_intro';
    return 'round_transition';
  }
  return visible;
}

function getCourseById(courseId){
  return HAHOW_BIZ_COURSES.find((course)=>String(course.id)===String(courseId)) || null;
}

function renderDecisionMemory(){
  const rounds=Array.isArray(currentSessionLog?.behavior_metrics?.round_results)
    ? currentSessionLog.behavior_metrics.round_results
    : [];
  if(!rounds.length) return '<p class="decision-memory-empty">尚未完成課程選擇</p>';
  return `<ol class="decision-memory-list">${rounds.map((round)=>{
    const course=getCourseById(round.selected_course_id);
    const title=sanitizeCourseText(course?.title || round.selected_course_id || '未記錄課程');
    const price=Number.isFinite(Number(course?.price)) ? formatNTD(Number(course.price)) : '價格未記錄';
    return `<li><span>第 ${Number(round.round_index)+1} 回合</span><strong>${title}</strong><em>${price}</em></li>`;
  }).join('')}</ol>`;
}

function updateJourneyHeader(){
  const host=document.getElementById('journey-header');
  if(!host) return;
  const completed=currentSessionLog?.behavior_metrics?.round_results?.length || 0;
  const roundNumber=Math.min(TOTAL_ROUNDS, Math.max(1, currentStepIndex + 1));
  host.innerHTML=`
    <div class="journey-title">AERO Decision Journey</div>
    <div class="journey-meta">
      <span>Round ${roundNumber} / ${TOTAL_ROUNDS}</span>
      <span>${advisorBudgetLabel()} ${formatNTD(budgetValue)}</span>
      <span>已完成 ${completed} / ${TOTAL_ROUNDS} 回合</span>
    </div>
    <div class="journey-bar" aria-label="Decision journey progress"><span style="width:${Math.round((completed / TOTAL_ROUNDS) * 100)}%"></span></div>`;
}

function ensureJourneyHeader(){
  let header=document.getElementById('journey-header');
  if(!header){
    header=document.createElement('section');
    header.id='journey-header';
    header.className='journey-header';
    header.setAttribute('aria-label','AERO Decision Journey');
  }
  const coursePage=document.getElementById('page-course');
  const transitionShell=document.querySelector('#page-round-transition .round-transition-shell');
  const visibleTransition=document.getElementById('page-round-transition')?.classList.contains('show');
  const target=visibleTransition ? transitionShell : coursePage;
  if(target && header.parentElement!==target) target.prepend(header);
  updateJourneyHeader();
}

function renderAdvisorCourseListSupport(){
  const head=document.querySelector('#course-list-state .course-list-state-head');
  if(head){
    head.innerHTML=`
      <p class="sec-tag">課程比較</p>
      <h1 class="sec-title serif">請從以下課程中，挑選你最想深入了解的一門。</h1>
      <p>查看完整資訊後，你可以選擇、繼續比較或暫不考慮。</p>`;
  }
  let memory=document.getElementById('decision-memory');
  if(!memory){
    memory=document.createElement('aside');
    memory.id='decision-memory';
    memory.className='decision-memory';
    const list=document.getElementById('round-course-list');
    list?.parentElement?.insertBefore(memory, list);
  }
  memory.innerHTML=`<h2>Decision Memory</h2>${renderDecisionMemory()}`;
}

function ensureCourseDetailDecisionStructure(){
  const detail=document.getElementById('course-detail-state');
  if(!detail || !selectedCourse) return;
  let nav=document.getElementById('course-detail-nav');
  if(!nav){
    nav=document.createElement('section');
    nav.id='course-detail-nav';
    nav.className='course-detail-nav';
    detail.prepend(nav);
  }
  nav.innerHTML=`
    <button class="btn-line" type="button" onclick="returnToCourseListByUi()">返回比較</button>
    <span>Round ${currentStepIndex + 1} / ${TOTAL_ROUNDS}</span>
    <strong>${advisorBudgetLabel()} ${formatNTD(budgetValue)}</strong>`;

  let info=document.getElementById('advisor-course-info');
  if(!info){
    info=document.createElement('section');
    info.id='advisor-course-info';
    info.className='advisor-course-info';
    detail.insertBefore(info, document.querySelector('.course-sec-hero'));
  }
  const rating=formatOptionalNumber(selectedCourse.average_rating, (n)=>Number.isInteger(n) ? n.toFixed(1) : n.toFixed(2)) || '未提供';
  const purchased=formatOptionalNumber(selectedCourse.num_purchased, (n)=>Math.round(n).toLocaleString('zh-TW')) || '未提供';
  info.innerHTML=`
    <h2>Course Information</h2>
    <div class="advisor-info-grid">
      <div><span>課程名稱</span><strong>${sanitizeCourseText(selectedCourse.title || '')}</strong></div>
      <div><span>價格</span><strong>${formatNTD(selectedCourse.price || 0)}</strong></div>
      <div><span>時數</span><strong>${Math.round(Number(selectedCourse.total_hours) || 0)} 小時</strong></div>
      <div><span>評價</span><strong>${rating}</strong></div>
      <div><span>學習人數</span><strong>${purchased}</strong></div>
    </div>`;

  const researchTitle=document.querySelector('.course-insights-head .sec-title');
  if(researchTitle) researchTitle.textContent='課程介紹';
  document.querySelectorAll('#course-detail-state .btn-enroll, #course-detail-state .btn-ec-final').forEach((button)=>{
    if(button.id!=='participant-profile-next-btn') button.textContent='選擇這堂課';
  });

  let decision=document.getElementById('course-decision-area');
  if(!decision){
    decision=document.createElement('section');
    decision.id='course-decision-area';
    decision.className='course-decision-area';
    detail.appendChild(decision);
  }
  decision.innerHTML=`
    <div>
      <h2>做出你的決策</h2>
      <p>這堂課值得你投入本回合的學習補助嗎？</p>
    </div>
    <div class="course-decision-buttons">
      <button class="btn-ec btn-ec-final" type="button" onclick="adoptActiveCourse()">選擇這堂課</button>
      <button class="btn-line" type="button" onclick="continueComparingCourses()">繼續比較其他課程</button>
      <button class="btn-line course-reject-btn" type="button" onclick="rejectActiveCourse()">暫不考慮</button>
    </div>`;
}

function showAdvisorConsent(){
  const welcome=document.getElementById('participant-intro');
  const consent=document.getElementById('advisor-consent-screen');
  if(welcome){
    welcome.hidden=true;
    welcome.style.display='none';
  }
  if(consent) consent.hidden=false;
  setStepState(0);
  updateAdvisorDemoPanel();
}

function backToAdvisorWelcome(){
  const welcome=document.getElementById('participant-intro');
  const consent=document.getElementById('advisor-consent-screen');
  if(welcome){
    welcome.hidden=false;
    welcome.style.display='block';
  }
  if(consent) consent.hidden=true;
  updateAdvisorDemoPanel();
}

function acceptAdvisorConsent(){
  const required=[...document.querySelectorAll('.advisor-consent-check')];
  if(required.length && required.some((input)=>!input.checked)){
    toast('請先逐項勾選研究說明');
    syncAdvisorConsentChecklist();
    return;
  }
  const consent=document.getElementById('participant-consent');
  if(consent) consent.checked=true;
  updateConsentState();
  startParticipantCourse();
}

function syncAdvisorConsentChecklist(){
  const required=[...document.querySelectorAll('.advisor-consent-check')];
  const complete=required.length>0 && required.every((input)=>input.checked);
  const continueBtn=document.getElementById('advisor-consent-continue');
  if(continueBtn) continueBtn.disabled=!complete;
  required.forEach((input)=>{
    const item=input.closest('.consent-list-item');
    if(item) item.classList.toggle('checked', input.checked);
  });
  updateAdvisorDemoPanel();
}

function showScenarioBriefing(){
  const intro=document.getElementById('participant-intro');
  const step2=document.getElementById('step2-area');
  const consent=document.getElementById('advisor-consent-screen');
  const briefing=document.getElementById('scenario-briefing');
  if(intro){
    intro.hidden=true;
    intro.style.display='none';
  }
  if(step2) step2.style.display='none';
  if(consent) consent.hidden=true;
  if(briefing){
    briefing.hidden=false;
  }
  goPage('landing');
  setStepState(1);
  updateAdvisorDemoPanel();
}

function startFirstRoundFromBriefing(){
  const briefing=document.getElementById('scenario-briefing');
  if(briefing) briefing.hidden=true;
  showBudgetSetup();
}

function resetBudgetDependentState(){
  currentStepIndex=0;
  curSC=getCurrentExperimentPlan().scenarioKey;
  selectedCourse=null;
  selectedRecoCourseId=null;
  currentRoundCandidateIds=[];
  currentSessionLog.round_candidates={};
  currentSessionLog.used_course_ids=[];
  currentSessionLog.behavior_metrics.round_results=[];
  currentSessionLog.behavior_metrics.round_decisions={};
  currentSessionLog.behavior_metrics.adopted_course_ids=[];
  syncCourseDecisionView(null);
}

function getBudgetSetupValue(){
  const input=document.getElementById('budget-number-input');
  const slider=document.getElementById('budget-setup-slider');
  return Number(input?.value || slider?.value || budgetValue);
}

function renderBudgetEligibilityNotice(count){
  const notice=document.getElementById('budget-setup-notice');
  if(!notice) return;
  if(count>=MINIMUM_ELIGIBLE_COURSES){
    notice.innerHTML=`<strong>可以開始</strong><span>此預算內有 ${count} 門課程，可完成 4 個不重複回合。</span>`;
    notice.className='budget-setup-notice ok';
    return;
  }
  notice.innerHTML=`<strong>無法開始第 1 回合</strong><span>此預算目前只有 ${count} 門符合條件的課程，完成四個不重複回合至少需要 ${MINIMUM_ELIGIBLE_COURSES} 門，請提高預算。</span>`;
  notice.className='budget-setup-notice warn';
}

function updateBudgetSetup(value=getBudgetSetupValue()){
  const bounds=getBudgetBounds();
  const next=Number.isFinite(Number(value))
    ? Math.max(bounds.min, Math.min(bounds.max, Number(value)))
    : bounds.min;
  budgetValue=next;
  const slider=document.getElementById('budget-setup-slider');
  const input=document.getElementById('budget-number-input');
  const current=document.getElementById('budget-setup-current');
  const eligibleCount=document.getElementById('budget-eligible-count');
  const minPrice=document.getElementById('budget-min-price');
  const maxPrice=document.getElementById('budget-max-price');
  const confirmBtn=document.getElementById('budget-confirm-btn');
  if(slider && String(slider.value)!==String(next)) slider.value=String(next);
  if(input && String(input.value)!==String(next)) input.value=String(next);
  if(current) current.textContent=formatNTD(next);
  const eligible=getEligibleCoursesForBudget(next);
  if(eligibleCount) eligibleCount.textContent=`${eligible.length} 門`;
  if(minPrice) minPrice.textContent=courseDataSummary.min_price ? formatNTD(courseDataSummary.min_price) : '未提供';
  if(maxPrice) maxPrice.textContent=courseDataSummary.max_price ? formatNTD(courseDataSummary.max_price) : '未提供';
  renderBudgetEligibilityNotice(eligible.length);
  if(confirmBtn) confirmBtn.disabled=eligible.length<MINIMUM_ELIGIBLE_COURSES;
  updateAdvisorDemoPanel();
}

function showBudgetSetup(){
  const briefing=document.getElementById('scenario-briefing');
  const roundIntro=document.getElementById('round-intro');
  const setup=document.getElementById('budget-setup');
  if(briefing) briefing.hidden=true;
  if(roundIntro) roundIntro.hidden=true;
  if(!setup) return;
  setup.hidden=false;
  const bounds=getBudgetBounds();
  if(!currentSessionLog.confirmed_budget){
    budgetValue=Number.isFinite(Number(budgetValue)) && budgetValue>=bounds.min ? budgetValue : bounds.min;
  }else{
    budgetValue=currentSessionLog.confirmed_budget;
  }
  const slider=document.getElementById('budget-setup-slider');
  const input=document.getElementById('budget-number-input');
  if(slider){
    slider.min=String(bounds.min);
    slider.max=String(bounds.max);
    slider.step=String(bounds.step);
  }
  if(input){
    input.min=String(bounds.min);
    input.max=String(bounds.max);
    input.step=String(bounds.step);
  }
  updateBudgetSetup(budgetValue);
  goPage('landing');
  setStepState(1);
  updateAdvisorDemoPanel();
}

function confirmBudgetAndStartCourses(){
  const next=getBudgetSetupValue();
  const eligible=getEligibleCoursesForBudget(next);
  updateBudgetSetup(next);
  if(eligible.length<MINIMUM_ELIGIBLE_COURSES) return false;
  if(currentSessionLog.confirmed_budget!==null && Number(currentSessionLog.confirmed_budget)!==Number(next)){
    const ok=confirm('修改預算會重新開始四回合，並清除已建立的候選課程與選擇紀錄。是否繼續？');
    if(!ok){
      updateBudgetSetup(currentSessionLog.confirmed_budget);
      return false;
    }
  }
  resetBudgetDependentState();
  budgetValue=next;
  currentSessionLog.confirmed_budget=next;
  currentSessionLog.course_data_summary=courseDataSummary;
  currentSessionLog.market_features.budget_level=getBudgetLevelLabel(next);
  scenarioBriefingAcknowledged=true;
  syncCurrentSessionLogStorage();
  const setup=document.getElementById('budget-setup');
  if(setup) setup.hidden=true;
  showRoundIntro(0);
  return true;
}

function showRoundIntro(roundIndex=currentStepIndex){
  const setup=document.getElementById('budget-setup');
  const intro=document.getElementById('round-intro');
  const briefing=document.getElementById('scenario-briefing');
  if(setup) setup.hidden=true;
  if(briefing) briefing.hidden=true;
  if(!intro) return enterParticipantCourseList();
  const roundNumber=Number(roundIndex)+1;
  intro.hidden=false;
  intro.innerHTML=`
    <div class="step-hd">
      <div class="step-num">Round ${roundNumber} / ${TOTAL_ROUNDS}</div>
      <h2 class="step-title">第 ${roundNumber} 回合課程比較</h2>
      <p class="step-desc">本回合會顯示 4 門不重複且價格不超過 ${formatNTD(currentSessionLog.confirmed_budget || budgetValue)} 的課程。</p>
    </div>
    <div class="scenario-grid">
      <div><span>本回合補助</span><strong>${formatNTD(currentSessionLog.confirmed_budget || budgetValue)}</strong></div>
      <div><span>候選數量</span><strong>4 門課程</strong></div>
      <div><span>你的任務</span><strong>先查看完整資訊，再做採用、比較或暫不考慮決策</strong></div>
      <div><span>整體流程</span><strong>已完成 ${currentSessionLog.behavior_metrics.round_results.length} / ${TOTAL_ROUNDS} 回合</strong></div>
    </div>
    <div class="proceed-row landing-start-row">
      <button class="btn-proceed" type="button" onclick="enterParticipantCourseList()">查看第 ${roundNumber} 回合課程</button>
      <button class="btn-line" type="button" onclick="showBudgetSetup()">返回調整預算</button>
    </div>`;
  goPage('landing');
  setStepState(1);
  updateAdvisorDemoPanel();
}

function ensureAdvisorDemoPanel(){
  if(!ADVISOR_DEMO_MODE || document.getElementById('advisor-demo-panel')) return;
  const panel=document.createElement('aside');
  panel.id='advisor-demo-panel';
  panel.className='advisor-demo-panel';
  panel.setAttribute('aria-label','Advisor Demo Only');
  document.body.appendChild(panel);
}

function updateAdvisorDemoPanel(){
  if(!ADVISOR_DEMO_MODE) return;
  ensureAdvisorDemoPanel();
  const panel=document.getElementById('advisor-demo-panel');
  if(!panel) return;
  const decision=getCurrentRoundDecision();
  const tracking=safeTrackCall('getState') || {};
  panel.innerHTML=`
    <strong>Advisor Demo Only</strong>
    <dl>
      <dt>participant anonymous id</dt><dd>${sanitizeCourseText(currentSessionLog?.participant_id || '')}</dd>
      <dt>current round</dt><dd>${currentStepIndex + 1} / ${TOTAL_ROUNDS}</dd>
      <dt>condition label</dt><dd>${sanitizeCourseText(assignedCondition?.summaryLabel || currentSessionLog?.experiment_assignment?.condition_label || '')}</dd>
      <dt>current sequence</dt><dd>${sanitizeCourseText((currentSessionLog?.experiment_assignment?.sequence || []).map((key)=>String(key).toUpperCase()).join(' '))}</dd>
      <dt>scenario key</dt><dd>${sanitizeCourseText(curSC || currentSessionLog?.experiment_assignment?.scenario_key || '')}</dd>
      <dt>current UI state</dt><dd>${sanitizeCourseText(getUiStateName())}</dd>
      <dt>confirmed budget</dt><dd>${Number.isFinite(Number(currentSessionLog?.confirmed_budget)) ? formatNTD(currentSessionLog.confirmed_budget) : 'not confirmed'}</dd>
      <dt>course data</dt><dd>${courseDataSummary.valid_count || 0} valid / ${courseDataSummary.invalid_count || 0} invalid</dd>
      <dt>selected course</dt><dd>${sanitizeCourseText(selectedCourse?.id || selectedRecoCourseId || decision?.selected_course_id || '')}</dd>
      <dt>adopted course IDs</dt><dd>${sanitizeCourseText((currentSessionLog?.behavior_metrics?.adopted_course_ids || []).join(', '))}</dd>
      <dt>tracking session status</dt><dd>${tracking.sessionStarted ? 'started' : 'not started'}</dd>
    </dl>`;
}

function applyAdvisorDemoUxCopy(){
  document.title='AERO 課程投資決策模擬';
  const hero=document.querySelector('#page-landing .land-hero-in');
  if(hero){
    hero.innerHTML=`
      <h1 class="land-title" id="land-title-main"><span class="land-line">AERO 課程投資決策模擬</span></h1>
      <p class="land-desc">想像你是一位即將畢業的大學生。為了提升未來的就業競爭力，你將利用有限的學習補助，比較不同線上課程，並做出你認為最值得投資的選擇。</p>
      <ul class="welcome-facts" aria-label="研究流程重點">
        <li>4 個課程選擇回合</li>
        <li>沒有標準答案</li>
        <li>請依真實想法操作</li>
      </ul>`;
  }
  const intro=document.getElementById('participant-intro');
  if(intro){
    intro.hidden=false;
    intro.innerHTML=`
      <div class="step-hd">
        <div class="step-num">研究開始前</div>
        <h2 class="step-title">你將扮演即將畢業、準備進入職場的大學生。</h2>
        <p class="step-desc">本研究關心你如何在有限補助下瀏覽、比較線上課程，並做出實際採用決策。</p>
      </div>
      <div class="p-intro-card">
        <p>請依照自己的真實想法操作。查看完整資訊只是了解課程，仍可選擇、繼續比較或暫不考慮。</p>
      </div>
      <label class="consent-check hidden-consent" for="participant-consent">
        <input type="checkbox" id="participant-consent" onchange="updateConsentState()">
        <span>我已閱讀並同意參與研究</span>
      </label>
      <div class="proceed-row landing-start-row">
        <button class="btn-proceed" id="participant-start-btn" type="button" onclick="showAdvisorConsent()">閱讀研究說明</button>
      </div>`;
  }
  let consent=document.getElementById('advisor-consent-screen');
  if(!consent){
    consent=document.createElement('section');
    consent.id='advisor-consent-screen';
    consent.className='step-area advisor-consent-screen';
    consent.hidden=true;
    document.getElementById('page-landing')?.insertBefore(consent, document.getElementById('step1-area'));
  }
  consent.innerHTML=`
    <div class="step-hd">
      <div class="step-num">研究同意</div>
      <h2 class="step-title">參與前請先閱讀以下說明</h2>
    </div>
    <div class="consent-checklist" aria-label="研究同意項目">
      <label class="consent-list-item"><input class="advisor-consent-check" type="checkbox" onchange="syncAdvisorConsentChecklist()"><span class="consent-checkmark"></span><span><strong>研究目的</strong><em>了解大學生在不同課程資訊呈現下，如何比較並做出課程投資決策。</em></span></label>
      <label class="consent-list-item"><input class="advisor-consent-check" type="checkbox" onchange="syncAdvisorConsentChecklist()"><span class="consent-checkmark"></span><span><strong>匿名資料</strong><em>資料以匿名 participant ID 記錄，不收集姓名、電話或 email。</em></span></label>
      <label class="consent-list-item"><input class="advisor-consent-check" type="checkbox" onchange="syncAdvisorConsentChecklist()"><span class="consent-checkmark"></span><span><strong>行為紀錄內容</strong><em>記錄頁面狀態、查看完整資訊、返回比較、選擇、繼續比較與暫不考慮等研究事件。</em></span></label>
      <label class="consent-list-item"><input class="advisor-consent-check" type="checkbox" onchange="syncAdvisorConsentChecklist()"><span class="consent-checkmark"></span><span><strong>可隨時退出</strong><em>你可以在任何時間停止參與，不需要提供理由。</em></span></label>
      <label class="consent-list-item"><input class="advisor-consent-check" type="checkbox" onchange="syncAdvisorConsentChecklist()"><span class="consent-checkmark"></span><span><strong>不記錄內容</strong><em>不記錄鍵盤文字與精確滑鼠軌跡。</em></span></label>
    </div>
    <div class="join-actions">
      <button class="btn-line" type="button" onclick="backToAdvisorWelcome()">返回</button>
      <button class="btn-ec btn-ec-final" id="advisor-consent-continue" type="button" onclick="acceptAdvisorConsent()" disabled>同意並繼續</button>
    </div>`;
  syncAdvisorConsentChecklist();

  let briefing=document.getElementById('scenario-briefing');
  if(!briefing){
    briefing=document.createElement('section');
    briefing.id='scenario-briefing';
    briefing.className='step-area scenario-briefing';
    briefing.hidden=true;
    document.getElementById('page-landing')?.insertBefore(briefing, document.getElementById('step1-area'));
  }
  briefing.innerHTML=`
    <div class="step-hd">
      <div class="step-num">研究情境</div>
      <h2 class="step-title">步驟 2：課程投資決策情境</h2>
      <p class="step-desc">請把接下來的選擇想成你自己的學習投資判斷。</p>
    </div>
    <div class="scenario-grid">
      <div><span>你的角色</span><strong>即將畢業的大學生</strong></div>
      <div><span>你的目標</span><strong>提升未來就業競爭力</strong></div>
      <div><span>你的資源</span><strong>下一步由你設定本回合學習補助</strong></div>
      <div><span>你的任務</span><strong>比較課程資訊，選出最值得投資的一門</strong></div>
      <div><span>研究流程</span><strong>總共 4 回合</strong></div>
    </div>
    <div class="proceed-row landing-start-row">
      <button class="btn-proceed" type="button" onclick="startFirstRoundFromBriefing()">我了解了，設定學習補助</button>
    </div>`;

  let budgetSetup=document.getElementById('budget-setup');
  if(!budgetSetup){
    budgetSetup=document.createElement('section');
    budgetSetup.id='budget-setup';
    budgetSetup.className='step-area budget-setup';
    budgetSetup.hidden=true;
    document.getElementById('page-landing')?.insertBefore(budgetSetup, document.getElementById('step1-area'));
  }
  budgetSetup.innerHTML=`
    <div class="step-hd">
      <div class="step-num">預算設定</div>
      <h2 class="step-title">請設定你的學習補助預算</h2>
      <p class="step-desc">四個回合都會使用同一筆預算。系統只會顯示價格不超過此預算的課程。</p>
    </div>
    <div class="budget-setup-panel">
      <div class="budget-setup-control">
        <label for="budget-setup-slider">預算</label>
        <strong id="budget-setup-current">NT$ 0</strong>
        <input type="range" id="budget-setup-slider" oninput="updateBudgetSetup(this.value)">
      </div>
      <div class="budget-number-row">
        <label for="budget-number-input">輸入數值</label>
        <input type="number" id="budget-number-input" inputmode="numeric" oninput="updateBudgetSetup(this.value)">
      </div>
      <div class="budget-facts">
        <div><span>此預算可使用的課程數</span><strong id="budget-eligible-count">0 門</strong></div>
        <div><span>最低有效課程價格</span><strong id="budget-min-price">未提供</strong></div>
        <div><span>最高有效課程價格</span><strong id="budget-max-price">未提供</strong></div>
      </div>
      <div class="budget-setup-notice" id="budget-setup-notice" role="status"></div>
      <div class="join-actions">
        <button class="btn-line" type="button" onclick="showScenarioBriefing()">返回情境說明</button>
        <button class="btn-ec btn-ec-final" id="budget-confirm-btn" type="button" onclick="confirmBudgetAndStartCourses()">確認預算並查看課程</button>
      </div>
    </div>`;

  let roundIntro=document.getElementById('round-intro');
  if(!roundIntro){
    roundIntro=document.createElement('section');
    roundIntro.id='round-intro';
    roundIntro.className='step-area round-intro';
    roundIntro.hidden=true;
    document.getElementById('page-landing')?.insertBefore(roundIntro, document.getElementById('step1-area'));
  }
  const stepNav=document.getElementById('step-nav');
  if(stepNav){
    const labels=['研究說明','基本資料','課程決策','最後問卷'];
    stepNav.querySelectorAll('.si-lbl').forEach((el,index)=>{ el.textContent=labels[index] || el.textContent; });
  }
  const thankyou=document.getElementById('page-thankyou');
  if(thankyou){
    const title=thankyou.querySelector('.ty-h');
    const desc=thankyou.querySelector('.ty-p');
    if(title) title.textContent='感謝參與';
    if(desc) desc.textContent='你的作答與操作資料已匿名處理。本次 AERO 課程投資決策模擬流程已完成。';
  }
  ensureAdvisorDemoPanel();
  updateAdvisorDemoPanel();
}

async function submitParticipantProfile(){
  const modal=document.getElementById('participant-profile-modal');
  if(!modal || participantProfileSubmitting) return;

  const educationLevel=modal.querySelector('input[name="participant-profile-education"]:checked')?.value || '';
  const major=modal.querySelector('input[name="participant-profile-major"]:checked')?.value || '';
  const disposableIncomeLevel=modal.querySelector('input[name="participant-profile-disposable"]:checked')?.value || '';
  const householdIncomeLevel=modal.querySelector('input[name="participant-profile-household"]:checked')?.value || '';
  const priorKnowledge=modal.querySelector('input[name="participant-pretest-knowledge"]:checked')?.value || '';
  const aiUseFrequency=modal.querySelector('input[name="participant-pretest-ai-use"]:checked')?.value || '';
  if(!educationLevel || !major || !disposableIncomeLevel || !householdIncomeLevel || !priorKnowledge || !aiUseFrequency){
    toast('請先完成基本資料與前測');
    return;
  }

  const nextBtn=modal.querySelector('#participant-profile-next-btn');
  const backBtn=modal.querySelector('#participant-profile-back-btn');
  participantProfileSubmitting=true;
  if(nextBtn){
    nextBtn.disabled=true;
    nextBtn.textContent='處理中…';
    nextBtn.setAttribute('aria-busy','true');
  }
  if(backBtn) backBtn.disabled=true;
  toast('正在建立體驗流程，請稍候…', 6000);

  setParticipantProfile({
    educationLevel,
    majorGroup: major,
    disposableIncomeLevel,
    householdIncomeLevel,
    priorKnowledge,
    aiUseFrequency,
  });
  try{
    const assigned=await assignConditionByUserId();
    if(!assigned) return;
    updateTrackingContext('participant_profile');
    safeTrackCall('startOrResume', {
      participant_id:currentSessionLog.participant_id,
      profile_complete:isParticipantProfileComplete(),
      context:getResearchTrackingContext('participant_profile'),
      resume_reason:'page_restore',
    });
    enterTrackingPage('participant_profile', 'profile_completed');
    closeParticipantProfileModal();
    enterParticipantCourseFlow();
  }finally{
    participantProfileSubmitting=false;
    if(nextBtn){
      nextBtn.removeAttribute('aria-busy');
      nextBtn.textContent='Finish';
    }
    if(backBtn) backBtn.disabled=false;
    setParticipantProfileStep(participantProfileStepIndex);
  }
}

/* ── Toast ── */
function toast(msg, dur=2200){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), dur);
}

/* ── Page router ── */
function goPage(name){
  if(name!=='course'){
    pauseAllStayTimers();
  }
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('show'));
  document.getElementById('page-'+name).classList.add('show');

  if(name==='landing'){
    const pageLanding=document.getElementById('page-landing');
    const pageCourse=document.getElementById('page-course');
    const step2Area=document.getElementById('step2-area');
    if(pageLanding) pageLanding.classList.add('show');
    if(pageCourse) pageCourse.classList.remove('show');
    if(pageLanding) pageLanding.style.display='block';
    if(pageCourse) pageCourse.style.display='none';
    if(step2Area) step2Area.style.display='none';
  }else if(name==='course'){
    const pageLanding=document.getElementById('page-landing');
    const pageCourse=document.getElementById('page-course');
    if(pageLanding) pageLanding.classList.remove('show');
    if(pageCourse) pageCourse.classList.add('show');
    if(pageLanding) pageLanding.style.display='none';
    if(pageCourse) pageCourse.style.display='grid';
  }else{
    const pageLanding=document.getElementById('page-landing');
    const pageCourse=document.getElementById('page-course');
    if(pageLanding) pageLanding.style.display='';
    if(pageCourse) pageCourse.style.display='';
  }

  // Landing page returns to intro state; step1 AI selection remains hidden.
  if(name==='landing'){
    const step1 = document.getElementById('step1-area');
    const step2 = document.getElementById('step2-area');
    const pIntro = document.getElementById('participant-intro');
    const advisorConsent = document.getElementById('advisor-consent-screen');
    const scenarioBriefing = document.getElementById('scenario-briefing');
    const advisorStateVisible = advisorConsent?.hidden===false || scenarioBriefing?.hidden===false;
    if(ROLE.participant){
      if(step1) step1.style.display='none';
      if(step2) step2.style.display='none';
      if(pIntro) pIntro.style.display=advisorStateVisible ? 'none' : 'block';
    }else{
      if(step1) step1.style.display='none';
      if(step2) step2.style.display='none';
      if(pIntro) pIntro.style.display='none';
    }
    setStepState(0);
  }

  if(name==='backend' && !ROLE.participant){
    renderBackendDashboard();
  }

  window.scrollTo({top:0,behavior:'instant'});
  // breadcrumb
  const map = ROLE.participant ? {landing:0,course:1,'round-transition':2,thankyou:2} : {landing:0,course:2,'round-transition':3,thankyou:3,backend:0};
  const cur=map[name]??0;
  [0,1,2,3].forEach(i=>{
    const el=document.getElementById('nt'+i);
    if(!el) return;
    el.classList.toggle('done', i<cur);
    el.classList.toggle('active', i===cur);
  });
  syncTrackingPageForUi(name);
  if(name==='course' || name==='round-transition') ensureJourneyHeader();
  updateAdvisorDemoPanel();
}

/* ── Step indicators ── */
function setStepState(active){
  [0,1,2,3].forEach(i=>{
    const el=document.getElementById('si'+i);
    if(!el) return;
    el.classList.toggle('done', i<active);
    el.classList.toggle('active', i===active);
  });
}

/* ── Theory condition step ── */
function pickAI(){
  showStep2();
}

/* ── Step 2 ── */
function showStep2(){
  document.getElementById('step1-area').style.display='none';
  document.getElementById('step2-area').style.display='block';
  setStepState(1);
  [0,1,2,3].forEach(i=>{ const el=document.getElementById('nt'+i); if(el){ el.classList.toggle('done',i<1); el.classList.toggle('active',i===1); } });
  const plan=getCurrentExperimentPlan();
  const color=SC_DATA[plan.scenarioKey]?.color || '#E89A57';
  document.getElementById('ar-dot').style.background=color;
  document.getElementById('ar-txt').textContent=ROLE.participant
    ? `第 ${plan.currentStepIndex + 1} 回合已套用，請選擇預算內課程`
    : `第 ${plan.currentStepIndex + 1} 回合：${plan.summaryLabel}`;
  initBudgetUI();
  if(!ROLE.participant){
    buildScCards();
  }
  renderHahowRecommendations();
  window.scrollTo({top:0,behavior:'smooth'});
}

function backToStep1(){
  if(ROLE.participant){
    document.getElementById('step2-area').style.display='none';
    document.getElementById('participant-intro').style.display='block';
    setStepState(0);
    [0,1,2,3].forEach(i=>{ const el=document.getElementById('nt'+i); if(el){ el.classList.toggle('done',false); el.classList.toggle('active',i===0); } });
    window.scrollTo({top:0,behavior:'smooth'});
    return;
  }
  document.getElementById('step2-area').style.display='none';
  document.getElementById('step1-area').style.display='none';
  selSC=null;
  selectedCourse=null;
  setStepState(0);
  [0,1,2,3].forEach(i=>{ const el=document.getElementById('nt'+i); if(el){ el.classList.toggle('done',false); el.classList.toggle('active',i===0); } });
  goPage('landing');
}

/* ── Build scenario cards ── */
function buildScCards(){
  document.getElementById('sc-grid').innerHTML=getScenarioKeys().map(s=>{
    const d=SC_DATA[s];
    const previewTitle = ROLE.participant ? '課程重點' : '理論摘要預覽';
    const participantPath = ROLE.participant ? '請選擇此課程版本' : d.path;
    const participantTag = ROLE.participant ? '課程版本' : `${d.ptag} · ${d.struct}`;
    return `<div class="lm-card" id="lc-${s}" onclick="pickSC('${s}')" style="--lm-c:${d.color}">
      <div class="lm-head">
        <div class="lm-tag">${s.toUpperCase()}</div>
        <span class="lm-path" style="color:${d.color}">${participantTag}</span>
      </div>
      <p class="lm-name">${d.tyCourse}</p>
      <p class="lm-sub">${participantPath}</p>
      <p class="lm-price">${d.price}</p>
      <p class="lm-budget"></p>
      <div class="lm-geo-preview">
        <strong>${previewTitle}</strong>
        ${d.desc.slice(0,72)}…
      </div>
    </div>`;
  }).join('');
  applyBudgetFilter();
}

/* ── SC pick ── */
function pickSC(s){
  selSC=s;
  selectedRecoCourseId=null;
  const d=SC_DATA[s];
  getScenarioKeys().forEach(x=>{ const el=document.getElementById('lc-'+x); if(el){ el.classList.toggle('sel',x===s); el.style.setProperty('--lm-c',SC_DATA[x].color); } });
  document.getElementById('sc-spill').style.display='flex';
  document.getElementById('sc-sd').style.background=d.color;
  document.getElementById('sc-spill-txt').textContent=ROLE.participant ? '已選擇課程版本' : (d.label+' 已選擇');
  document.getElementById('s2-hint').style.display='none';
  document.getElementById('btn-course').disabled=false;
  document.getElementById('si1-sub').textContent=ROLE.participant ? '已完成版本選擇' : d.label;
  setStepState(1);
  logEvent('SC_SELECT', d.label);
}

function recommendedScenarioByCourse(course){
  if(!course) return null;
  if(course.scenarioKey && SC_DATA[course.scenarioKey]) return course.scenarioKey;
  const entries=getScenarioKeys().map(key=>({
    key,
    diff:Math.abs(getScenarioPriceValue(key)-course.price),
  })).sort((x,y)=>x.diff-y.diff);
  return entries[0]?.key || null;
}

function selectHahowCourse(courseId){
  const course=HAHOW_BIZ_COURSES.find(c=>c.id===courseId);
  if(!course) return;
  selectedRecoCourseId=courseId;
  selectedCourse={ ...course };

  if(ROLE.participant){
    selSC=getCurrentExperimentPlan().scenarioKey;
  }else{
    const scKey=recommendedScenarioByCourse(course);
    if(scKey){
      selSC=scKey;
      pickSC(scKey);
    }
  }

  if(ROLE.participant){
    openParticipantCourseDetail(courseId);
    return;
  }

  toast('已套用推薦課程與預算');
  logEvent('RECO_SELECT', `${course.title} (${formatNTD(course.price)})`);
}

function onBudgetChange(value){
  const bounds=getBudgetBounds();
  const next=Number(value);
  budgetValue=Number.isFinite(next)
    ? Math.max(bounds.min, Math.min(bounds.max, next))
    : bounds.max;

  const s1=document.getElementById('budget-slider');
  if(s1 && String(s1.value)!==String(budgetValue)) s1.value=String(budgetValue);
  // Budget only filters visible courses; narrative style stays locked by remainder bucket.
  applyBudgetFilter();
  renderHahowRecommendations();
}

function bindBudgetSliderListeners(){
  ['budget-slider'].forEach((id)=>{
    const slider=document.getElementById(id);
    if(!slider || slider.dataset.boundInput==='1') return;

    slider.addEventListener('input', (event)=>{
      onBudgetChange(event?.target?.value);
    });
    slider.addEventListener('change', ()=>recordBudgetHistory(`${id}:change`));
    slider.addEventListener('pointerup', ()=>recordBudgetHistory(`${id}:pointerup`));
    slider.addEventListener('keyup', (event)=>{
      const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'];
      if(keys.includes(event.key)) recordBudgetHistory(`${id}:keyboard`);
    });
    slider.dataset.boundInput='1';
  });
}

function initBudgetUI(){
  const slider=document.getElementById('budget-slider');
  if(!slider) return;
  const bounds=getBudgetBounds();
  budgetValue=Number.isFinite(Number(currentSessionLog.confirmed_budget))
    ? Number(currentSessionLog.confirmed_budget)
    : bounds.min;

  [slider].forEach((s)=>{
    if(!s) return;
    s.min=String(bounds.min);
    s.max=String(bounds.max);
    s.step=String(bounds.step);
    s.value=String(budgetValue);
  });

  const avgTxt=document.getElementById('hahow-avg-txt');
  if(avgTxt) avgTxt.textContent='真實商管課程資料庫均價約 '+formatNTD(HAHOW_AVG_PRICE);

  const matchTxt=document.getElementById('budget-match-count');
  if(matchTxt) matchTxt.textContent='0 堂課程符合';

  applyBudgetFilter();
}

function getScenarioPriceValue(key){
  return parsePriceText(SC_DATA[key]?.price || 0);
}

function applyBudgetFilter(){
  const keys=getScenarioKeys();
  let matchCount=0;

  keys.forEach(key=>{
    const card=document.getElementById('lc-'+key);
    if(!card) return;
    const diff=Math.abs(getScenarioPriceValue(key)-budgetValue);
    const fit=diff<=PRICE_TOLERANCE;

    card.classList.toggle('budget-fit',fit);
    card.classList.toggle('budget-out',!fit);

    const badge=card.querySelector('.lm-budget');
    if(badge){
      badge.textContent=(fit?'價差 ':'超出 ')+formatNTD(diff);
      badge.classList.toggle('out',!fit);
    }

    if(fit) matchCount++;
  });

  const budgetVal=document.getElementById('budget-value');
  const rangeTxt=document.getElementById('budget-range-txt');
  const matchTxt=document.getElementById('budget-match-count');
  if(budgetVal) budgetVal.textContent=formatNTD(budgetValue);
  if(rangeTxt) rangeTxt.textContent='允許價差 ±'+formatNTD(PRICE_TOLERANCE);
  if(matchTxt) matchTxt.textContent=matchCount+' 個版本符合';
}

function setParticipantCourseView(view){
  currentCourseView=view==='detail' ? 'detail' : 'list';
  const listState=document.getElementById('course-list-state');
  const detailState=document.getElementById('course-detail-state');
  if(listState) listState.hidden=currentCourseView!=='list';
  if(detailState) detailState.hidden=currentCourseView!=='detail';
}

function renderCourseFlowError({title, message, detail=''}){
  const container=document.getElementById('round-course-list');
  const head=document.querySelector('#course-list-state .course-list-state-head');
  if(head){
    head.innerHTML=`
      <p class="sec-tag">流程提示</p>
      <h1 class="sec-title serif">${sanitizeCourseText(title || '無法建立課程候選')}</h1>
      <p>${sanitizeCourseText(message || '')}</p>`;
  }
  if(container){
    container.innerHTML=`
      <section class="aero-error-state course-flow-error" role="alert">
        <p>${sanitizeCourseText(detail || message || '')}</p>
        <div class="error-actions">
          <button class="btn-proceed" type="button" onclick="location.reload()">重新載入</button>
          <button class="btn-line" type="button" onclick="showBudgetSetup()">返回調整預算</button>
          <button class="btn-line" type="button" onclick="resetExperiment()">重新開始研究</button>
        </div>
      </section>`;
  }
  setParticipantCourseView('list');
  goPage('course');
  ensureJourneyHeader();
  updateAdvisorDemoPanel();
}

function enterParticipantCourseList({restore=false}={}){
  if(!ROLE.participant) return;
  if(courseDataLoadError){
    renderCourseFlowError({
      title:'無法載入課程資料',
      message:'課程 JSON 載入失敗，因此不能建立正式候選課程。',
      detail:courseDataLoadError.message,
    });
    return;
  }
  if(!Number.isFinite(Number(currentSessionLog.confirmed_budget))){
    showBudgetSetup();
    return;
  }
  budgetValue=Number(currentSessionLog.confirmed_budget);
  const eligible=getEligibleCoursesForBudget(budgetValue);
  if(eligible.length<MINIMUM_ELIGIBLE_COURSES){
    renderCourseFlowError({
      title:'預算內課程不足',
      message:`此預算目前只有 ${eligible.length} 門符合條件的課程，完成四個不重複回合至少需要 ${MINIMUM_ELIGIBLE_COURSES} 門，請提高預算。`,
    });
    return;
  }
  if(!restore && currentStepIndex===0 && !scenarioBriefingAcknowledged){
    showScenarioBriefing();
    return;
  }
  const decision=ensureCurrentRoundDecision({freeze:true});
  if(!decision?.candidate_course_ids?.length || decision.candidate_course_ids.length<CANDIDATES_PER_ROUND){
    console.warn('[AERO courses] No eligible candidate is available for this round');
    renderCourseFlowError({
      title:'無法建立本回合候選課程',
      message:'candidate state 遺失或剩餘課程不足，請返回調整預算或重新開始研究。',
      detail:`本回合需要 ${CANDIDATES_PER_ROUND} 門課程，目前建立 ${decision?.candidate_course_ids?.length || 0} 門。`,
    });
    return;
  }
  const restoreDetail=restore && decision.current_view==='detail' && decision.active_detail_course_id;
  decision.current_view='list';
  decision.active_detail_course_id=null;
  saveCurrentRoundDecision(decision);
  selectedCourse=null;
  selectedRecoCourseId=null;
  curSC=getCurrentExperimentPlan().scenarioKey;
  selSC=curSC;
  renderCourseCards(coursesForDecision(decision), document.getElementById('round-course-list'));
  setParticipantCourseView('list');
  leaveTrackingPage(restore ? 'session_restore' : 'budget_completed');
  startTrackingRound();
  goPage('course');
  ensureJourneyHeader();
  renderAdvisorCourseListSupport();
  updateAdvisorDemoPanel();
  if(restoreDetail) openParticipantCourseDetail(restoreDetail,{entryMethod:'session_restore',restore:true});
}

function openParticipantCourseDetail(courseId,{entryMethod='course_list',restore=false}={}){
  if(!ROLE.participant) return false;
  const decision=ensureCurrentRoundDecision({freeze:true});
  const course=HAHOW_BIZ_COURSES.find(item=>String(item.id)===String(courseId));
  if(!course || !decision?.candidate_course_ids?.includes(String(courseId))) return false;
  const result=window.AEROCourseDecisionFlow?.openDetail(decision,String(courseId),{entryMethod,restore});
  if(!result?.ok) return false;
  saveCurrentRoundDecision(result.state);
  selectedRecoCourseId=String(courseId);
  selectedCourse={...course};
  curSC=getCurrentExperimentPlan().scenarioKey;
  selSC=curSC;
  assignedCondition=getConditionByScenarioKey(curSC);
  applyCourse();
  initBehaviorTracking();
  setParticipantCourseView('detail');
  ensureJourneyHeader();
  ensureCourseDetailDecisionStructure();
  updateAdvisorDemoPanel();
  safeTrackCall('startCourseDetail',{course_id:String(courseId),entry_method:restore?'session_restore':entryMethod});
  if(!restore && history?.pushState){
    history.pushState({aeroCourseDetail:true,round_index:currentStepIndex,course_id:String(courseId)},'',location.href);
  }
  return true;
}

function closeActiveCourseDetail(reason,{action=null,backMethod=null}={}){
  const decision=getCurrentRoundDecision();
  const courseId=activeDetailCourseId || decision?.active_detail_course_id;
  if(!decision || !courseId || currentCourseView!=='detail') return false;
  if(backMethod) safeTrackCall('recordBack',backMethod,{from_page:'course_detail',to_page:'course_list',course_id:courseId});
  if(action) safeTrackCall('recordAdoption',action,{course_id:courseId,action_context:'course_detail'});
  safeTrackCall('endCourseDetail',reason,{returnToList:true});
  const next=window.AEROCourseDecisionFlow.returnToList(decision,action,courseId);
  saveCurrentRoundDecision(next);
  selectedCourse=null;
  selectedRecoCourseId=null;
  renderCourseCards(coursesForDecision(next),document.getElementById('round-course-list'));
  setParticipantCourseView('list');
  updateJourneyHeader();
  renderAdvisorCourseListSupport();
  updateAdvisorDemoPanel();
  if(history?.replaceState) history.replaceState({aeroCourseDetail:false,round_index:currentStepIndex},'',location.href);
  return true;
}

function returnToCourseListByUi(){ return closeActiveCourseDetail('ui_back',{backMethod:'ui_button'}); }
function continueComparingCourses(){ return closeActiveCourseDetail('continue_compare',{action:'continue_compare'}); }
function rejectActiveCourse(){ return closeActiveCourseDetail('reject',{action:'reject'}); }

function adoptActiveCourse(){
  const decision=getCurrentRoundDecision();
  const courseId=activeDetailCourseId || decision?.active_detail_course_id;
  if(!decision || !courseId) return false;
  const adopted=currentSessionLog.behavior_metrics.adopted_course_ids;
  const result=window.AEROCourseDecisionFlow?.adopt(decision,courseId,adopted);
  if(!result?.ok){toast(decision.rejected_course_ids?.includes(courseId)?'此課程已標記為暫不考慮':'此課程無法重複選擇');return false;}
  selectedRecoCourseId=courseId;
  selectedCourse={...(HAHOW_BIZ_COURSES.find(item=>String(item.id)===String(courseId)) || {})};
  if(!adopted.includes(courseId)) adopted.push(courseId);
  saveCurrentRoundDecision(result.state);
  safeTrackCall('recordAdoption','adopt',{course_id:courseId,action_context:'course_detail'});
  safeTrackCall('endCourseDetail','adopt',{returnToList:false});
  advanceParticipantRound();
  return true;
}

function getCurrentRoundDecision(){
  return currentSessionLog.behavior_metrics.round_decisions?.[String(currentStepIndex)] || null;
}

function syncCourseDecisionView(decision){
  currentCourseView=decision?.current_view==='detail' ? 'detail' : 'list';
  activeDetailCourseId=decision?.active_detail_course_id || null;
  detailEntryMethod=decision?.detail_entry_method || null;
  detailOpenedAt=decision?.detail_opened_at || null;
  currentRoundCandidateIds=[...(decision?.candidate_course_ids || [])];
}

function ensureCurrentRoundDecision({freeze=false}={}){
  const flow=window.AEROCourseDecisionFlow;
  if(!flow || (!assignedCondition && currentSessionLog?.experiment_assignment?.remainder_group===null)) return null;
  const key=String(currentStepIndex);
  const confirmedBudget=Number(currentSessionLog.confirmed_budget);
  if(!Number.isFinite(confirmedBudget)) return null;
  budgetValue=confirmedBudget;
  const existing=getCurrentRoundDecision();
  if(existing?.candidate_course_ids?.length===CANDIDATES_PER_ROUND && (existing.started || Number(existing.budget)===confirmedBudget)){
    if(freeze && !existing.started) existing.started=true;
    syncCourseDecisionView(existing);
    syncCurrentSessionLogStorage();
    return existing;
  }
  const storedCandidates=Array.isArray(currentSessionLog.round_candidates?.[key])
    ? currentSessionLog.round_candidates[key].map(String)
    : [];
  if(storedCandidates.length===CANDIDATES_PER_ROUND){
    const eligible=getEligibleCoursesForBudget(confirmedBudget).map(course=>String(course.id));
    const restored=flow.createRoundState({
      round_index:currentStepIndex,
      scenario_key:curSC || getCurrentExperimentPlan().scenarioKey,
      condition_id:assignedCondition?.conditionId ?? null,
      eligible_course_ids:eligible,
      candidate_course_ids:storedCandidates,
      candidate_seed:`${currentSessionLog.participant_id}|${currentStepIndex}`,
      candidate_generation_version:flow.VERSION,
    });
    restored.budget=confirmedBudget;
    restored.started=freeze;
    restored.display_positions=storedCandidates.reduce((acc,id,index)=>{ acc[id]=index+1; return acc; },{});
    currentSessionLog.behavior_metrics.round_decisions[key]=restored;
    syncCourseDecisionView(restored);
    syncCurrentSessionLogStorage();
    return restored;
  }
  const sampled=flow.sampleCandidates({participantId:currentSessionLog.participant_id,roundIndex:currentStepIndex,
    scenarioKey:curSC || getCurrentExperimentPlan().scenarioKey,budget:confirmedBudget,courses:HAHOW_BIZ_COURSES,
    adoptedCourseIds:currentSessionLog.behavior_metrics.adopted_course_ids,
    usedCourseIds:currentSessionLog.used_course_ids,
    count:CANDIDATES_PER_ROUND});
  if(!sampled?.candidate_course_ids || sampled.candidate_course_ids.length<CANDIDATES_PER_ROUND) return null;
  const decision=flow.createRoundState({round_index:currentStepIndex,scenario_key:curSC || getCurrentExperimentPlan().scenarioKey,
    condition_id:assignedCondition?.conditionId ?? null,...sampled});
  decision.budget=confirmedBudget;
  decision.started=freeze;
  decision.display_positions=sampled.candidate_course_ids.reduce((acc,id,index)=>{ acc[id]=index+1; return acc; },{});
  currentSessionLog.round_candidates[key]=[...sampled.candidate_course_ids];
  const used=new Set([...(currentSessionLog.used_course_ids || []).map(String)]);
  sampled.candidate_course_ids.forEach((id)=>used.add(String(id)));
  currentSessionLog.used_course_ids=[...used];
  currentSessionLog.behavior_metrics.round_decisions[key]=decision;
  syncCourseDecisionView(decision);
  syncCurrentSessionLogStorage();
  return decision;
}

function saveCurrentRoundDecision(decision){
  currentSessionLog.behavior_metrics.round_decisions[String(currentStepIndex)]=decision;
  syncCourseDecisionView(decision);
  syncCurrentSessionLogStorage();
}

function coursesForDecision(decision){
  const byId=new Map(HAHOW_BIZ_COURSES.map(course=>[String(course.id),course]));
  return (decision?.candidate_course_ids || []).map(id=>byId.get(String(id))).filter(Boolean);
}

function renderHahowRecommendations(){
  const list=document.getElementById('hahow-reco-list');
  const count=document.getElementById('hahow-in-budget-count');
  const blindList=document.getElementById('course-blind-list');
  const blindCount=document.getElementById('course-blind-count');
  if(!list) return;

  const decision=ensureCurrentRoundDecision();
  const topPicks=coursesForDecision(decision);
  const eligibleCount=decision?.eligible_course_ids?.length || 0;

  if(count){
    count.textContent=`${eligibleCount} 堂符合（本回合顯示 ${topPicks.length} 堂）`;
  }
  if(blindCount){
    blindCount.textContent=`本回合 ${topPicks.length} 堂`;
  }

  const matchTxt=document.getElementById('budget-match-count');
  if(matchTxt) matchTxt.textContent=eligibleCount+' 堂課程符合';

  if(!topPicks.length){
    list.innerHTML='<p class="hr-empty">目前沒有預算內課程，請提高預算後再選擇。</p>';
    if(blindList) blindList.innerHTML='<p class="hr-empty">目前沒有預算內課程，請提高預算後再選擇。</p>';
    return;
  }
  renderCourseCards(topPicks, list);
  if(blindList) renderCourseCards(topPicks, blindList);
  const roundList=document.getElementById('round-course-list');
  if(roundList) renderCourseCards(topPicks, roundList);
}

function getMajorProfileForTTF(majorGroup){
  if(majorGroup.includes('商管') || majorGroup.includes('人文')) return 'biz-humanities';
  if(majorGroup.includes('理工')) return 'stem';
  return 'general';
}

function courseMatchesTTFKeywords(title, majorProfile){
  const text=String(title || '');
  const bizHumanitiesKeywords=[
    '商業', '分析', '策略', '英文', '簡報', '談判', '溝通', '行銷', '電商', '職場',
  ];
  const stemRegexes=[
    /\bpython\b/i,
    /\bsql\b/i,
    /\br\b/i,
    /\bnlp\b/i,
    /機器學習/i,
    /人工智慧/i,
    /資料/i,
    /數據/i,
    /寫程式/i,
  ];

  if(majorProfile==='biz-humanities'){
    return bizHumanitiesKeywords.some(keyword=>text.includes(keyword));
  }
  if(majorProfile==='stem'){
    return stemRegexes.some(pattern=>pattern.test(text));
  }
  return false;
}

function parsePriceText(value){
  if(typeof value==='number') return value;
  const num=String(value).replace(/[^\d]/g,'');
  return num?Number(num):0;
}

function formatNTD(value){
  return 'NT$ '+Math.round(value).toLocaleString('zh-TW');
}

function getHahowAvgPrice(){
  if(!HAHOW_BIZ_COURSES.length) return 0;
  const sum=HAHOW_BIZ_COURSES.reduce((acc,item)=>acc+item.price,0);
  return sum/HAHOW_BIZ_COURSES.length;
}

function sanitizeCourseText(value){
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatOptionalText(value){
  const text=String(value ?? '').trim();
  return text ? sanitizeCourseText(text) : '';
}

function formatOptionalNumber(value, formatter){
  const n=Number(value);
  return Number.isFinite(n) && n>0 ? formatter(n) : '';
}

function renderCourseCards(filteredCourses, container){
  if(!container) return;
  const isRoundList=container.id==='round-course-list';
  const decision=getCurrentRoundDecision();

  if(!Array.isArray(filteredCourses) || filteredCourses.length===0){
    container.innerHTML='<p class="hr-empty">目前沒有預算內課程，請提高預算後再選擇。</p>';
    return;
  }

  container.innerHTML=filteredCourses.map((course,index)=>{
    const title=formatOptionalText(course.title);
    const price=formatOptionalNumber(course.price, (n)=>formatNTD(n));
    const rating=formatOptionalNumber(course.average_rating, (n)=>Number.isInteger(n) ? n.toFixed(1) : n.toFixed(2));
    const purchased=formatOptionalNumber(course.num_purchased, (n)=>Math.round(n).toLocaleString('zh-TW'));
    const isSelected=selectedRecoCourseId===course.id ? ' sel' : '';
    const isRejected=decision?.rejected_course_ids?.includes(String(course.id));
    const displayPosition=decision?.display_positions?.[String(course.id)] || index + 1;

    return `<article class="hr-item card${isSelected}${isRejected?' rejected':''}" data-display-position="${displayPosition}" aria-label="${title || '課程'}">
      <div class="hr-head">
        <p class="hr-title">${title}</p>
        ${rating ? `<div class="hr-score"><span class="hr-score-label">評價</span><span class="hr-score-value">${rating}</span></div>` : ''}
      </div>
      <div class="hr-stats">
        ${price ? `<div class="hr-stat hr-stat-price"><span class="hr-stat-label">價格</span><strong>${price}</strong></div>` : ''}
        <div class="hr-stat"><span class="hr-stat-label">學習人數</span><strong>${purchased || '未提供'}</strong></div>
      </div>
      ${isRejected ? '<p class="hr-rejected">暫不考慮</p>' : ''}
      ${isRoundList ? `<div class="hr-foot"><button type="button" class="hr-btn" onclick="openParticipantCourseDetail('${course.id}')">查看完整資訊</button></div>` : ''}
    </article>`;
  }).join('');
}

function getCourseContextForNarrative(courseId){
  const byId=HAHOW_BIZ_COURSES.find((course)=>course.id===courseId);
  const course=byId || selectedCourse || HAHOW_BIZ_COURSES[0] || null;
  if(!course){
    return {
      id:null,
      title:'',
      price:null,
      total_hours:null,
      num_purchased:null,
      average_rating:null,
    };
  }
  return {
    id:course.id,
    title:String(course.title || ''),
    price:Number.isFinite(Number(course.price)) ? Number(course.price) : null,
    total_hours:Number.isFinite(Number(course.total_hours)) ? Number(course.total_hours) : null,
    num_purchased:Number.isFinite(Number(course.num_purchased)) ? Number(course.num_purchased) : null,
    average_rating:Number.isFinite(Number(course.average_rating)) ? Number(course.average_rating) : null,
  };
}

function buildTheoryNarrativeHtml(condition, courseCtx){
  const pathLabel=condition?.narrativeStyle==='rational' ? 'Central' : 'Peripheral';
  const structureLabel=condition?.structureStyle==='high' ? 'High Structure' : 'Low Structure';
  const key=String(condition?.scenarioKey || 'a').toUpperCase();
  const placeholder=conditionContent[key] || conditionContent.A;
  const demoMeta=ADVISOR_DEMO_MODE
    ? `<div class="content-condition-demo"><strong>Advisor Demo Only</strong><span>${pathLabel} / ${structureLabel}</span></div>`
    : '';
  return `<div class="aero-ai-copy course-content-placeholder">
    ${demoMeta}
    <p>${sanitizeCourseText(placeholder)}</p>
  </div>`;
}

function applyTheoryNarrative(scenarioKey, courseId, stepIndex=currentStepIndex, remainderGroup=currentConditionRemainder){
  const condition=getConditionByScenarioKey(scenarioKey);
  const courseCtx=getCourseContextForNarrative(courseId);
  const html=buildTheoryNarrativeHtml(condition, courseCtx);

  const summaryContent=document.getElementById('aero-ai-summary-content');
  if(summaryContent){
    summaryContent.classList.remove('fade');
    void summaryContent.offsetWidth;
    summaryContent.innerHTML=html;
    summaryContent.classList.add('fade');
  }

  const summaryBadge=document.getElementById('aero-ai-summary-badge');
  if(summaryBadge){
    if(ROLE.participant){
      summaryBadge.textContent='';
      summaryBadge.style.display='none';
    }else{
      summaryBadge.style.display='';
      summaryBadge.textContent=`R${Number(stepIndex) + 1} · 版本 ${String(condition.scenarioKey || 'a').toUpperCase()}`;
    }
  }

  const geoTag=document.getElementById('geo-tag');
  if(geoTag){
    if(ROLE.participant){
      geoTag.textContent='';
      geoTag.style.display='none';
    }else{
      geoTag.style.display='inline-flex';
      geoTag.textContent=`R${Number(stepIndex) + 1} · 餘數 ${normalizeRemainder(remainderGroup ?? experimentModuloUserId ?? userId)} · ${condition.summaryLabel}`;
    }
  }
}

function getBudgetLevelLabel(value){
  const n=Number(value);
  return Number.isFinite(n) && n>3000 ? '高預算' : '低預算';
}

function getRoundAiSummaryDwell(round){
  const dwell=round?.dwell_times || {};
  const single=Number(dwell.aero_ai_summary_block);
  if(Number.isFinite(single)) return single;
  const p=Number(dwell.perplexity_block);
  const c=Number(dwell.chatgpt_block);
  const g=Number(dwell.google_aio_block);
  const sum=[p,c,g].filter(Number.isFinite).reduce((acc,n)=>acc+n,0);
  return sum>0 ? sum : 0;
}

function buildBackendRecord(){
  const plan=getCurrentExperimentPlan();
  const combinationSummary=getConditionCombinationSummary(plan);
  syncCurrentSessionLogDwellTimes();
  const budgetLevel=getBudgetLevelLabel(budgetValue);
  currentSessionLog.market_features = {
    ...(currentSessionLog.market_features || {}),
    budget_level: budgetLevel,
  };
  syncCurrentSessionLogStorage();
  const latestRound=(currentSessionLog.behavior_metrics.round_results || []).slice(-1)[0] || null;
  const survey=latestResultPayload
    ? latestResultPayload.survey
    : (latestRound
      ? {
          q1_depthLogic: latestRound.q1_depthLogic ?? null,
          q2_visualAttraction: latestRound.q2_visualAttraction ?? null,
          q3_purchaseIntent: latestRound.q3_purchaseIntent ?? null,
        }
      : null);
  const behavior={
    ai_summary_staySec: getStaySec('s'),
  };
  const resultJsonPayload={
    remainderGroup: plan.remainderGroup,
    sequence: plan.sequence,
    currentStepIndex: plan.currentStepIndex,
    conditionId: plan.conditionId,
    q1: survey?.q1_depthLogic ?? null,
    q2: survey?.q2_visualAttraction ?? null,
    q3: survey?.q3_purchaseIntent ?? null,
    q4: survey?.q4_contentAdoptionIntent ?? null,
    q5: survey?.q5_relianceIntent ?? null,
    q6: survey?.q6_continuedUseIntent ?? null,
    q7: survey?.q7_structureClarity ?? null,
    q8: survey?.q8_keyPointFindability ?? null,
    q9: survey?.q9_cognitiveThought ?? null,
    q10: survey?.q10_reasonEvaluation ?? null,
    q11: survey?.q11_sourceCueInfluence ?? null,
    q12: survey?.q12_visualCueInfluence ?? null,
    actualAdoptionChoice: survey?.actualAdoptionChoice ?? null,
    roundResults: [...(currentSessionLog.behavior_metrics.round_results || [])],
    dwell_times: {
      aero_ai_summary_block: behavior.ai_summary_staySec,
    },
  };
  return {
    exportedAt: new Date().toISOString(),
    userId,
    moduloUserId: experimentModuloUserId,
    remainderGroup: plan.remainderGroup,
    conditionId: plan.conditionId,
    conditionLabel: plan.summaryLabel,
    combinationSummary,
    narrativeStyle: plan.narrativeStyle,
    narrativeStyleLabel: plan.narrativeStyleLabel,
    structureStyle: plan.structureStyle,
    structureStyleLabel: plan.structureStyleLabel,
    scenario: curSC,
    scenarioLabel: curSC ? SC_DATA[curSC].label : null,
    selectedCourseId: selectedCourse?.id || selectedRecoCourseId || null,
    selectedCourseTitle: selectedCourse?.title || null,
    budgetValue,
    budgetLevel,
    currentSessionLog: cloneSessionLog(),
    hasClickedJoin,
    progressStage: getCurrentProgressStage(),
    sequence: plan.sequence,
    currentStepIndex: plan.currentStepIndex,
    switchCount: swCnt,
    ctaClicks: ctaCnt,
    survey,
    behavior,
    resultJsonPayload,
    events: eventLog.map(e => ({ ...e })),
  };
}

function saveBackendRecord(){
  const record=buildBackendRecord();
  try{
    localStorage.setItem(BACKEND_RECORD_KEY, JSON.stringify(record));
  }catch(_err){
    // Ignore storage failures in private browsing or restricted contexts.
  }

  const records=getBackendRecords();
  const next=records.filter(r=>Number(r.userId)!==Number(userId));
  next.push(record);
  next.sort((a,b)=>Number(a.userId)-Number(b.userId));
  setBackendRecords(next);

  // The server is the authoritative research store. localStorage above is only
  // a same-device recovery cache and is never used as the research dataset.
  fetch(apiUrl('/api/records'), {
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(record),
    keepalive:true,
  }).catch(()=>{});
}

/* ── Start course ── */
function startCourse(){
  if(!selSC) return;
  if(ROLE.participant){
    enterParticipantCourseList();
    return;
  }
  if(!assignedCondition) assignConditionByUserId();
  curSC=selSC;
  assignedCondition=getConditionByScenarioKey(curSC);
  curDualPath = (SC_DATA[curSC].path.includes('中央'))
    ? { key:'central', label:'中央路徑（理性）', tag:'中央路徑' }
    : { key:'peripheral', label:'邊緣路徑（感性）', tag:'邊緣路徑' };
  applyCourse();
  initBehaviorTracking();
  leaveTrackingPage('budget_completed');
  startTrackingRound();
  goPage('course');
  setStepState(2);
  [0,1,2,3].forEach(i=>{ const el=document.getElementById('nt'+i); if(el){ el.classList.toggle('done',i<2); el.classList.toggle('active',i===2); } });
  saveBackendRecord();
  logEvent('COURSE_ENTER', `COND-${assignedCondition?.conditionId || '-'} × ${SC_DATA[curSC].label} × ${curDualPath.label}`);
}

/* ── Quick switch (ctrl panel) ── */
function quickSc(s){
  curSC=s; swCnt++;
  if(!assignedCondition) assignConditionByUserId();
  assignedCondition=getConditionByScenarioKey(curSC);
  curDualPath = (SC_DATA[curSC].path.includes('中央'))
    ? { key:'central', label:'中央路徑（理性）', tag:'中央路徑' }
    : { key:'peripheral', label:'邊緣路徑（感性）', tag:'邊緣路徑' };
  applyCourse();
  initBehaviorTracking();
  goPage('course');
  toggleCtrl();
  toast('已切換至 '+SC_DATA[s].label);
  logEvent('QUICK_SWITCH', SC_DATA[s].label);
}

/* ── Apply course ── */
function applyCourse(){
  const d=SC_DATA[curSC];
  const plan=getCurrentExperimentPlan();
  const chosenCourse=selectedCourse;
  const courseCtx=getCourseContextForNarrative(chosenCourse?.id || selectedRecoCourseId || null);
  const purchasedText=formatOptionalNumber(courseCtx.num_purchased, (n)=>Math.round(n).toLocaleString('zh-TW'));
  const ratingText=formatOptionalNumber(courseCtx.average_rating, (n)=>n.toFixed(2));
  const priceText=formatOptionalNumber(courseCtx.price, (n)=>formatNTD(n));
  const activePath = (ROLE.participant && curDualPath) ? curDualPath : ((d.path.includes('中央'))
    ? { key:'central', label:'中央路徑（理性）', tag:'中央路徑' }
    : { key:'peripheral', label:'邊緣路徑（感性）', tag:'邊緣路徑' });

  ['a','b','c','d'].forEach(x=>{ const b=document.getElementById('sb-'+x); b.classList.toggle('active',x===curSC); b.style.setProperty('--sc',SC_DATA[x].color); });
  document.getElementById('st-ai').textContent=ROLE.participant ? '' : `條件 ${plan.conditionId}`;
  document.getElementById('st-cur').textContent=d.label;
  document.getElementById('st-path').textContent=activePath.label;
  document.getElementById('st-sw').textContent=swCnt;
  document.getElementById('st-cta').textContent=ctaCnt;
  document.getElementById('sc-stripe').style.background=d.color;
  document.getElementById('ft-sc').textContent=ROLE.participant ? '' : (`餘數 ${plan.remainderGroup} · 第 ${plan.currentStepIndex + 1} 回合 · ${d.nav}`);

  document.getElementById('c-ey').innerHTML='';

  document.getElementById('course-title').textContent=courseCtx.title || '';
  const courseDescEl=document.getElementById('course-desc');
  if(courseDescEl){
    courseDescEl.textContent='';
    courseDescEl.style.display='none';
  }
  const statsEl=document.getElementById('c-stats');
  const hoursText=formatOptionalNumber(courseCtx.total_hours, (n)=>`${Math.round(n)} 小時`);
  statsEl.innerHTML=`<div class="stat-box"><div class="stat-n">${priceText}</div><div class="stat-l">價格</div></div><div class="stat-box"><div class="stat-n">${hoursText}</div><div class="stat-l">課程時數</div></div><div class="stat-box"><div class="stat-n">${ratingText}</div><div class="stat-l">評價</div></div><div class="stat-box"><div class="stat-n">${purchasedText}</div><div class="stat-l">購買人數</div></div>`;
  statsEl.style.gridTemplateColumns='repeat(4,minmax(0,1fr))';

  const budgetSection=document.querySelector('.course-sec-budget');
  if(budgetSection) budgetSection.style.display='none';
  const insightsSection=document.querySelector('.course-sec-ai');
  if(insightsSection) insightsSection.style.display='none';
  const heroBtns=document.querySelector('.course-hero-btns');
  if(heroBtns) heroBtns.style.display='none';
  const legacyBlindActions=document.querySelector('.course-blind-actions');
  if(legacyBlindActions) legacyBlindActions.style.display='none';
  const detailAlternatives=document.getElementById('course-blind-reco');
  if(detailAlternatives) detailAlternatives.style.display='none';
  const detailInfoLayout=document.querySelector('.course-sec-list');
  if(detailInfoLayout) detailInfoLayout.classList.add('detail-mode');
  const aiSummaryLabel=document.querySelector('.ai-block-label-perp');
  if(aiSummaryLabel) aiSummaryLabel.style.display='none';

  // Theory narrative replacement only changes these three summary blocks.
  const geoBox=document.getElementById('geo-box');
  if(geoBox) geoBox.style.borderLeftColor=d.color;
  const gtag=document.getElementById('geo-tag');
  if(gtag){
    gtag.style.background=d.color;
    gtag.style.display='inline-flex';
    gtag.textContent=`第 ${plan.currentStepIndex + 1} 回合 · ${plan.summaryLabel}`;
  }
  applyTheoryNarrative(curSC, chosenCourse?.id || selectedRecoCourseId || null, plan.currentStepIndex, plan.remainderGroup);
  const certRow=document.getElementById('cert-row');
  if(certRow){
    certRow.innerHTML='';
    certRow.style.display='none';
  }

  const insightsHead=document.querySelector('.course-insights-head');
  if(insightsHead) insightsHead.style.display='block';

  document.getElementById('body-tag').textContent=d.bodyTag;
  document.getElementById('body-title').textContent=d.bodyTitle;
  document.getElementById('body-ct').innerHTML=d.bodyCt;
  const bodyBlock=document.getElementById('body-title')?.parentElement;
  if(bodyBlock) bodyBlock.style.display='none';
  const bodyTagEl=document.getElementById('body-tag');
  if(bodyTagEl) bodyTagEl.style.display='none';
  const bodyTitleEl=document.getElementById('body-title');
  if(bodyTitleEl) bodyTitleEl.style.display='none';
  const bodyCtEl=document.getElementById('body-ct');
  if(bodyCtEl) bodyCtEl.style.display='none';
  document.querySelectorAll('.ol-item').forEach(el=>el.style.borderLeftColor=d.color+'66');
  document.querySelectorAll('.feat-item i.fa-check-circle,.feat-item i.fa-chart-line').forEach(i=>i.style.color=d.color);

  const ctaLabel=document.querySelector('.cta-card .p-lbl');
  if(ctaLabel) ctaLabel.textContent='價格';
  document.getElementById('cta-price').textContent=priceText;
  const ctaPsub=document.getElementById('cta-psub');
  if(ctaPsub){
    ctaPsub.textContent='';
    ctaPsub.style.display='none';
  }
  const ctaUrg=document.getElementById('cta-urg');
  if(ctaUrg){
    ctaUrg.innerHTML='';
    ctaUrg.style.display='none';
  }
  const ctaFeats=document.getElementById('cta-feats');
  if(ctaFeats){
    ctaFeats.innerHTML='';
    ctaFeats.style.display='none';
  }
  const ctaTestis=document.getElementById('cta-testis');
  if(ctaTestis){
    ctaTestis.innerHTML='';
    ctaTestis.style.display='none';
  }

  const tyAiRow=document.getElementById('ty-row-ai');
  if(tyAiRow) tyAiRow.style.display=ROLE.participant?'none':'flex';
  const tyInfo=document.getElementById('ty-info');
  if(tyInfo) tyInfo.style.display=ROLE.participant?'none':'block';
  document.getElementById('ty-ai').textContent=plan.summaryLabel;
  document.getElementById('ty-path').textContent=activePath.label;
  document.getElementById('ty-struct').textContent=d.struct;

  const tyPathRow=document.getElementById('ty-row-path');
  const tyStructRow=document.getElementById('ty-row-struct');
  if(tyPathRow) tyPathRow.style.display=ROLE.participant?'none':'flex';
  if(tyStructRow) tyStructRow.style.display=ROLE.participant?'none':'flex';

  ['ch-l','ch-r','body-ct'].forEach(id=>{ const el=document.getElementById(id); if(!el) return; el.classList.remove('fade'); void el.offsetWidth; el.classList.add('fade'); });
  // Render data-icon elements to SVG
  setTimeout(()=>renderIcons(document.getElementById('page-course')), 10);
}

function advanceParticipantRound(){
  const roundResult=appendRoundResult(null, null, null);
  finishTrackingRound('round_submitted', roundResult.round_index);

  if(currentStepIndex < TOTAL_ROUNDS - 1){
    currentStepIndex += 1;
    const remainder=currentConditionRemainder ?? experimentModuloUserId ?? userId;
    const sequence=getSequenceByRemainder(remainder);
    const nextScenario=getScenarioForStep(remainder, currentStepIndex);
    curSC=nextScenario;
    selSC=nextScenario;
    assignedCondition=getConditionByScenarioKey(nextScenario);
    curDualPath = (SC_DATA[curSC].path.includes('中央'))
      ? { key:'central', label:'中央路徑（理性）', tag:'中央路徑' }
      : { key:'peripheral', label:'邊緣路徑（感性）', tag:'邊緣路徑' };

    currentSessionLog.experiment_assignment = {
      ...currentSessionLog.experiment_assignment,
      remainder_group: normalizeRemainder(remainder),
      sequence: [...sequence],
      current_step_index: currentStepIndex,
      condition_id: assignedCondition.conditionId,
      condition_label: assignedCondition.summaryLabel,
      scenario_key: assignedCondition.scenarioKey,
      narrative_style: assignedCondition.narrativeStyle,
      structure_style: assignedCondition.structureStyle,
    };
    syncCurrentSessionLogStorage();

    saveBackendRecord();
    showRoundTransition(roundResult, false);
    toast(`已完成第 ${roundResult.round_index + 1} 回合`);
    return;
  }

  saveBackendRecord();
  resetSurveyInputs();
  showRoundTransition(roundResult, true);
  toast('已完成 4 回合，請依序填寫最終問卷');
}

/* ── CTA click ── */
function ctaClick(){
  hasClickedJoin = true;
  ctaCnt++;
  document.getElementById('st-cta').textContent=ctaCnt;
  recordClickedCourse();
  if(ctrlOpen) toggleCtrl();
  logEvent('CTA_CLICK', `COND-${assignedCondition?.conditionId || '-'} × ${SC_DATA[curSC]?.label || '-'}`);

  if(ROLE.participant){
    adoptActiveCourse();
    return;
  }

  pauseAllStayTimers();
  openJoinModal();
}

/* ── Control panel ── */
function toggleCtrl(){
  if(ROLE.participant) return;
  ctrlOpen=!ctrlOpen;
  document.getElementById('ctrl-panel').classList.toggle('open',ctrlOpen);
  document.getElementById('ctrl-btn').classList.toggle('open',ctrlOpen);
}

/* ── Research tools ── */
function logEvent(type, detail){
  const plan=getCurrentExperimentPlan();
  eventLog.push({
    ts: new Date().toISOString(),
    type,
    detail,
    scenario: curSC,
    scenarioLabel: curSC ? SC_DATA[curSC].label : null,
    remainderGroup: plan.remainderGroup,
    conditionId: plan.conditionId,
    conditionLabel: plan.summaryLabel,
  });
  saveBackendRecord();
}

function copyLog(){
  syncCurrentSessionLogDwellTimes();
  const plan=getCurrentExperimentPlan();
  const now = new Date();
  const data = {
    exportedAt: now.toISOString(),
    exportedAtLocal: now.toLocaleString('zh-TW'),
    summary: {
      remainderGroup: plan.remainderGroup,
      conditionId: plan.conditionId,
      conditionLabel: plan.summaryLabel,
      scenario:    curSC  || '（尚未選擇）',
      scenarioLabel: curSC ? SC_DATA[curSC].label : '（尚未選擇）',
      path:        curSC  ? SC_DATA[curSC].path   : '—',
      structure:   curSC  ? SC_DATA[curSC].struct : '—',
      course:      curSC  ? SC_DATA[curSC].tyCourse : '—',
      switchCount: swCnt,
      ctaClicks:   ctaCnt,
      hasClickedJoin,
      narrativeStyleLabel: plan.narrativeStyleLabel,
      sequence: plan.sequence,
      currentStepIndex: plan.currentStepIndex,
      ai_summary_staySec: getStaySec('s'),
      currentSessionLog: cloneSessionLog(),
      totalEvents: eventLog.length,
    },
    events: eventLog.map(e => ({
      time: e.ts,
      type: e.type,
      detail: e.detail,
      conditionId: e.conditionId || plan.conditionId,
      scenario: e.scenario || curSC,
    })),
  };
  const txt = JSON.stringify(data, null, 2);
  navigator.clipboard.writeText(txt)
    .then(() => toast('✓ 完整研究紀錄已複製（' + eventLog.length + ' 筆事件）'))
    .catch(() => { prompt('請手動複製：', txt); });
}

function resetAll(){
  if(!confirm('確定要重置所有研究紀錄？\n這將清除：切換次數、報名點擊次數、全部事件紀錄。')) return;
  swCnt = 0;
  ctaCnt = 0;
  eventLog.length = 0;
  hasClickedJoin = false;
  latestResultPayload = null;
  latestResultJson = '';
  selectedRecoCourseId = null;
  selectedCourse = null;
  currentCourseView = 'list';
  activeDetailCourseId = null;
  detailEntryMethod = null;
  detailOpenedAt = null;
  currentRoundCandidateIds = [];
  scenarioBriefingAcknowledged = false;
  try{ localStorage.removeItem(BACKEND_RECORD_KEY); }catch(_err){}
  try{ sessionStorage.removeItem(SESSION_LOG_STORAGE_KEY); }catch(_err){}
  pauseAllStayTimers();
  if(dwellSyncTimer){
    clearInterval(dwellSyncTimer);
    dwellSyncTimer = null;
  }
  behaviorStats.s_stayMs = 0;
  currentSessionLog = createEmptySessionLog();
  assignedCondition = null;
  currentConditionRemainder = null;
  currentStepIndex = 0;
  roundDwellCheckpoint = { s:0 };
  curSC = null;
  curDualPath = null;
  closeParticipantProfileModal();
  // Reset status display
  const ids = ['st-sw','st-cta','st-ai','st-cur','st-path'];
  ids.forEach(id => { const el=document.getElementById(id); if(el) el.textContent='0'; });
  const stAi = document.getElementById('st-ai');
  const stCur = document.getElementById('st-cur');
  const stPath = document.getElementById('st-path');
  if(stAi) stAi.textContent = '—';
  if(stCur) stCur.textContent = '—';
  if(stPath) stPath.textContent = '—';

  // Reset landing page selections
  selSC = null;
  ['perp','chat','goog'].forEach(x => {
    const el=document.getElementById('ai-'+x); if(el) el.classList.remove('sel');
  });
  const aiSpill = document.getElementById('ai-spill');
  if(aiSpill) aiSpill.style.display='none';
  const s1hint = document.getElementById('s1-hint');
  if(s1hint) s1hint.style.display='';
  const btnS2 = document.getElementById('btn-s2');
  if(btnS2) btnS2.disabled = true;

  const scSpill = document.getElementById('sc-spill');
  if(scSpill) scSpill.style.display='none';
  const s2hint = document.getElementById('s2-hint');
  if(s2hint) s2hint.style.display='';
  const btnCourse = document.getElementById('btn-course');
  if(btnCourse) btnCourse.disabled = true;

  const si0sub = document.getElementById('si0-sub');
  const si1sub = document.getElementById('si1-sub');
  if(si0sub) si0sub.textContent = '尚未填寫';
  if(si1sub) si1sub.textContent = '完成步驟 1 後解鎖';

  document.getElementById('step2-area').style.display='none';
  document.getElementById('step1-area').style.display='none';
  const pIntro=document.getElementById('participant-intro');
  if(pIntro){
    pIntro.style.display=ROLE.participant?'block':'none';
    pIntro.hidden=!ROLE.participant;
  }
  const advisorConsent=document.getElementById('advisor-consent-screen');
  if(advisorConsent) advisorConsent.hidden=true;
  const scenarioBriefing=document.getElementById('scenario-briefing');
  if(scenarioBriefing) scenarioBriefing.hidden=true;
  const participantConsent=document.getElementById('participant-consent');
  if(participantConsent) participantConsent.checked=false;
  setStepState(0);

  [0,1,2,3].forEach(i=>{
    const el=document.getElementById('nt'+i);
    if(!el) return;
    el.classList.toggle('done', false);
    el.classList.toggle('active', i===0);
  });

  document.getElementById('ft-sc').textContent = '';
  document.getElementById('sc-stripe').style.background = 'var(--blue)';
  goPage('landing');

  if(ROLE.participant){
    // Assignment starts only after participant submits profile.
  }

  syncCurrentSessionLogStorage();
  updateAdvisorDemoPanel();

  if(ctrlOpen) toggleCtrl();
  toast('✓ 所有紀錄已重置，可重新開始實驗');
}

function openBackendPage(){
  if(ROLE.participant){
    toast('後台僅供研究者使用');
    goPage('landing');
    return;
  }
  renderBackendDashboard();
  goPage('backend');
}

function clearBackendRecords(){
  if(!confirm('確定要清除後台所有受測者資料？')) return;
  try{
    localStorage.removeItem(BACKEND_RECORDS_KEY);
    localStorage.removeItem(BACKEND_RECORD_KEY);
  }catch(_err){}
  renderBackendDashboard();
  toast('後台資料已清除');
}

function getCourseDataValidationIssues(){
  return (courseDataSummary.warnings || []).map((warning)=>({
    row: warning.source_row,
    course_id: String(warning.course_id || ''),
    course_name: String(warning.course_name || '未命名課程'),
    missingPrice: String(warning.reason || '').includes('price'),
    missingHours: false,
  }));
}

function renderCourseDataValidationDashboard(){
  const summaryEl=document.getElementById('backend-data-validation-summary');
  const listEl=document.getElementById('backend-data-validation-list');
  if(!summaryEl || !listEl) return;

  const issues=getCourseDataValidationIssues();
  const missingPriceCount=issues.filter((issue)=>issue.missingPrice).length;
  const missingHoursCount=issues.filter((issue)=>issue.missingHours).length;

  summaryEl.innerHTML=`
    <div class="backend-summary-item"><span>有效課程筆數</span><strong>${courseDataSummary.valid_count || HAHOW_BIZ_COURSES.length}</strong></div>
    <div class="backend-summary-item"><span>缺 original_price</span><strong>${missingPriceCount}</strong></div>
    <div class="backend-summary-item"><span>缺 total_hours</span><strong>${missingHoursCount}</strong></div>
  `;

  if(!issues.length){
    listEl.innerHTML='<div class="cond-row"><span>資料檢查</span><span>PASS</span><span>所有課程均含 original_price 與 total_hours</span></div>';
    return;
  }

  listEl.innerHTML=issues.map((issue)=>{
    const missingFields=[];
    if(issue.missingPrice) missingFields.push('original_price');
    if(issue.missingHours) missingFields.push('total_hours');

    return `<div class="cond-row cond-row-validation">
      <span>列 ${issue.row}</span>
      <span>${sanitizeCourseText(issue.course_id || '')}</span>
      <span>${sanitizeCourseText(issue.course_name)}</span>
      <span>${missingFields.join(', ')}</span>
    </div>`;
  }).join('');
}

function renderBackendDashboard(){
  if(ROLE.participant){
    goPage('landing');
    return;
  }

  const summaryEl=document.getElementById('backend-summary');
  const condEl=document.getElementById('backend-condition-map');
  const tableBody=document.getElementById('backend-table-body');
  const sessionLogList=document.getElementById('backend-session-log-list');
  if(!summaryEl || !condEl || !tableBody) return;

  const toCell=(value)=>{
    if(value===null || value===undefined || value==='') return '';
    return sanitizeCourseText(String(value));
  };
  const toNumberCell=(value)=>{
    const num=Number(value);
    return Number.isFinite(num) ? String(num) : '';
  };
  const toDateCell=(value)=>{
    if(value===null || value===undefined || value==='') return '';
    const asNumber=Number(value);
    const date=Number.isFinite(asNumber)
      ? new Date(asNumber > 1e12 ? asNumber : asNumber * 1000)
      : new Date(String(value));
    if(Number.isNaN(date.getTime())) return '';
    return date.toLocaleString('zh-TW');
  };

  renderCourseDataValidationDashboard();

  const records=getBackendRecords();
  const doneCount=records.filter(r=>r.survey && Number(r.survey.q1_depthLogic) && Number(r.survey.q2_visualAttraction)).length;
  const conditionCounter={};
  records.forEach(r=>{
    const key=String(r.remainderGroup ?? '-');
    conditionCounter[key]=(conditionCounter[key] || 0)+1;
  });

  summaryEl.innerHTML=`
    <div class="backend-summary-item"><span>總受測者</span><strong>${records.length}</strong></div>
    <div class="backend-summary-item"><span>已完成問卷</span><strong>${doneCount}</strong></div>
    <div class="backend-summary-item"><span>實驗架構</span><strong>四序列平衡輪替（A/B/C/D）</strong></div>
  `;

  const conditionRows=[];
  [0,1,2,3].forEach((rem)=>{
    const sequence=getSequenceByRemainder(rem).map((key)=>key.toUpperCase()).join(' → ');
    conditionRows.push(`<div class="cond-row"><span>餘數 ${rem}</span><span>序列 ${sequence}</span><span>${conditionCounter[String(rem)] || 0} 人</span></div>`);
  });
  condEl.innerHTML=conditionRows.join('');

  if(!records.length){
    tableBody.innerHTML='<tr><td colspan="18">目前沒有受測者資料</td></tr>';
    if(sessionLogList) sessionLogList.innerHTML='<div class="cond-row"><span>Session Log</span><span></span><span>目前沒有可顯示的受測者資料</span></div>';
    return;
  }

  tableBody.innerHTML=records.map(r=>{
    const q1=toNumberCell(r.survey?.q1_depthLogic);
    const q2=toNumberCell(r.survey?.q2_visualAttraction);
    const q3=toNumberCell(r.survey?.q3_purchaseIntent);
    const sessionId=toCell(r.currentSessionLog?.participant_id);
    const userIdCell=(r.userId===null || r.userId===undefined || r.userId==='') ? '' : `#${sanitizeCourseText(String(r.userId))}`;
    const aiNarrativeDiscriminability=toCell(r.aiNarrativeDiscriminabilityLabel || r.aiNarrativeDiscriminability || '');
    const hasResultJson=r.resultJsonPayload && typeof r.resultJsonPayload==='object' && Object.keys(r.resultJsonPayload).length>0;
    const resultJsonText=sanitizeCourseText(JSON.stringify(r.resultJsonPayload || {}, null, 2));
    const combinationSummaryCell=toCell(r.combinationSummary);
    const combinationDetails=hasResultJson
      ? `<details style="margin-top:6px"><summary>JSON</summary><pre style="white-space:pre-wrap;word-break:break-word;max-width:320px">${resultJsonText}</pre></details>`
      : '';
    const roundResults=Array.isArray(r.currentSessionLog?.behavior_metrics?.round_results)
      ? r.currentSessionLog.behavior_metrics.round_results
      : (Array.isArray(r.resultJsonPayload?.roundResults) ? r.resultJsonPayload.roundResults : []);
    const budgetLevel=toCell(r.budgetLevel || r.currentSessionLog?.market_features?.budget_level || getBudgetLevelLabel(r.budgetValue));
    const scenarioSeq=roundResults.map((round)=>String(round?.scenario_key || '').trim().toUpperCase()).filter(Boolean).join('➔');
    const q1Seq=roundResults
      .map((round)=>Number(round?.q1_depthLogic))
      .filter((num)=>Number.isFinite(num))
      .map((num)=>String(num))
      .join(',');
    const aiDwellSeq=roundResults
      .map((round)=>{
        const dwell=getRoundAiSummaryDwell(round);
        return Number.isFinite(dwell) ? `${dwell.toFixed(1)}s` : '';
      })
      .filter(Boolean)
      .join(',');
    const courseSeq=roundResults.map((round)=>String(round?.selected_course_id || '').trim()).filter(Boolean).join(',');
    const budgetCell=Number.isFinite(Number(r.budgetValue)) ? formatNTD(Number(r.budgetValue)) : '';
    return `<tr>
      <td>${userIdCell}<br><span class="mono" style="font-size:.62rem;color:var(--ink3)">${sessionId}</span></td>
      <td>${toCell(r.remainderGroup)}</td>
      <td>${toCell(r.conditionId)}</td>
      <td>${combinationSummaryCell}${combinationDetails}</td>
      <td>${aiNarrativeDiscriminability}</td>
      <td>${toCell(r.progressStage)}</td>
      <td>${toCell(r.selectedCourseTitle)}</td>
      <td>${toCell(r.scenarioLabel)}</td>
      <td>${budgetCell}</td>
      <td>${budgetLevel}</td>
      <td>${toCell(scenarioSeq)}</td>
      <td>${toCell(q1Seq)}</td>
      <td>${toCell(aiDwellSeq)}</td>
      <td>${toCell(courseSeq)}</td>
      <td>${q1}</td>
      <td>${q2}</td>
      <td>${q3}</td>
      <td>${toDateCell(r.exportedAt)}</td>
    </tr>`;
  }).join('');

  if(sessionLogList){
    sessionLogList.innerHTML=records.map((r)=>renderSessionLogCard(r)).join('');
  }
}

function renderSessionLogCard(record){
  const log=record.currentSessionLog || {};
  const demographics=log.demographics || {};
  const behavior=log.behavior_metrics || {};
  const assignment=log.experiment_assignment || {};
  const budgetHistory=Array.isArray(behavior.budget_slider_history) ? behavior.budget_slider_history : [];
  const clickedCourses=Array.isArray(behavior.clicked_courses) ? behavior.clicked_courses : [];
  const dwellTimes=behavior.dwell_times || {};
  const formatStamp=(ts)=>{
    const num=Number(ts);
    if(!Number.isFinite(num)) return '';
    const ms = num > 1e12 ? num : num * 1000;
    return new Date(ms).toLocaleString('zh-TW');
  };
  const formatDwell=(value)=>{
    const num=Number(value);
    return Number.isFinite(num) ? num.toFixed(2) : '';
  };
  const budgetText=budgetHistory.length
    ? budgetHistory.map((entry)=>`${formatNTD(entry.budget)} @ ${formatStamp(entry.timestamp)}`).join(' · ')
    : '';
  const clickedText=clickedCourses.length
    ? clickedCourses.map((entry)=>`${sanitizeCourseText(entry.course_id)} @ ${formatStamp(entry.timestamp)}`).join(' · ')
    : '';
  const rounds=Array.isArray(behavior.round_results) ? behavior.round_results : [];
  const roundsText=rounds.length
    ? rounds.map((round)=>{
      const aiDwell=Number(getRoundAiSummaryDwell(round) || 0).toFixed(2);
      const q1=Number(round.q1_depthLogic || 0);
      const q2=Number(round.q2_visualAttraction || 0);
      const q3=Number(round.q3_purchaseIntent || 0);
      const courseId=sanitizeCourseText(round.selected_course_id || '');
      const scenario=String(round.scenario_key || '').toUpperCase();
      return `R${Number(round.round_index) + 1} (${scenario})｜Course:${courseId}｜Q1:${q1} Q2:${q2} Q3:${q3}｜AI:${aiDwell}s`;
    }).join('<br>')
    : '';
  const sequenceText=Array.isArray(assignment.sequence) && assignment.sequence.length
    ? assignment.sequence.map((key)=>String(key).toUpperCase()).join(' → ')
    : '';
  const dwellSummaryValue=getRoundAiSummaryDwell({ dwell_times:dwellTimes });
  const dwellSummary=Number.isFinite(dwellSummaryValue) ? `${formatDwell(dwellSummaryValue)}s` : '';
  const currentStepNum=Number(assignment.current_step_index);
  const progressLabel=Number.isFinite(currentStepNum) ? `R${currentStepNum + 1}` : '';
  const sequenceWithProgress=progressLabel && sequenceText
    ? `${progressLabel} · ${sequenceText}`
    : (progressLabel || sequenceText);
  const budgetLevel=record.budgetLevel || log.market_features?.budget_level || getBudgetLevelLabel(record.budgetValue);
  const badgeStyle='display:inline-flex;align-items:center;padding:3px 8px;border-radius:999px;font-size:.63rem;font-weight:700;letter-spacing:.04em;background:#F5D9C8;color:#CE8043;border:1px solid #F3D4C0';

  return `<div style="border:1px solid var(--line2);border-radius:14px;padding:12px;margin-bottom:10px;background:var(--card2)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
      <span style="${badgeStyle}">教育程度：${sanitizeCourseText(demographics.education_level || '')}</span>
      <span style="${badgeStyle}">科系背景：${sanitizeCourseText(demographics.major_group || '')}</span>
      <span style="${badgeStyle}">可支配所得：${sanitizeCourseText(demographics.disposable_income_level || '')}</span>
      <span style="${badgeStyle}">家庭年收：${sanitizeCourseText(demographics.household_income_level || '')}</span>
      <span style="${badgeStyle}">預算分群：${sanitizeCourseText(budgetLevel || '')}</span>
    </div>
    <div class="cond-row" style="align-items:start;gap:12px;grid-template-columns:1.2fr 1fr 1.2fr 1fr 1fr 1.6fr">
    <span>
      <strong>#${sanitizeCourseText(record.userId)}</strong><br>
      <span class="mono" style="font-size:.62rem;color:var(--ink3)">${sanitizeCourseText(log.participant_id || '')}</span>
    </span>
    <span>
      ${sanitizeCourseText(demographics.education_level || '')}<br>
      <span style="font-size:.68rem;color:var(--ink3)">${sanitizeCourseText(demographics.major_group || '')}</span>
    </span>
    <span>
      <strong style="display:block;margin-bottom:2px">滑軌歷程</strong>
      <span style="font-size:.68rem;line-height:1.55;color:var(--ink2)">${budgetText}</span>
    </span>
    <span>
      <strong style="display:block;margin-bottom:2px">課程點擊</strong>
      <span style="font-size:.68rem;line-height:1.55;color:var(--ink2)">${clickedText}</span>
    </span>
    <span>
      <strong style="display:block;margin-bottom:2px">停留秒數</strong>
      <span style="font-size:.68rem;line-height:1.55;color:var(--ink2)">${dwellSummary}</span>
    </span>
    <span>
      <strong style="display:block;margin-bottom:2px">序列 / 進度</strong>
      <span style="font-size:.68rem;line-height:1.55;color:var(--ink2)">${sanitizeCourseText(sequenceWithProgress)}</span>
      <span style="font-size:.68rem;line-height:1.55;color:var(--ink2);display:block;margin-top:4px">${rounds.length ? `共 ${rounds.length} 回合已紀錄` : ''}</span>
    </span>
    <span>
      <strong style="display:block;margin-bottom:2px">4 回合明細</strong>
      <span style="font-size:.68rem;line-height:1.55;color:var(--ink2)">${roundsText}</span>
    </span>
  </div>
  </div>`;
}

function exportBackendRecordsCsv(){
  if(ROLE.participant){
    toast('後台僅供研究者使用');
    return;
  }

  const records=getBackendRecords();
  if(!records.length){
    toast('目前沒有可匯出的後台資料');
    return;
  }

  const rows=records.map((r)=>({
    exportedAt: r.exportedAt || '',
    userId: r.userId || '',
    remainderGroup: r.remainderGroup ?? '',
    conditionId: r.conditionId ?? '',
    conditionLabel: r.conditionLabel || '',
    combinationSummary: r.combinationSummary || '',
    narrativeStyleLabel: r.narrativeStyleLabel || '',
    structureStyleLabel: r.structureStyleLabel || '',
    progressStage: r.progressStage || '',
    selectedCourseTitle: r.selectedCourseTitle || '',
    scenarioLabel: r.scenarioLabel || '',
    budgetValue: r.budgetValue ?? '',
    budgetLevel: r.budgetLevel || r.currentSessionLog?.market_features?.budget_level || getBudgetLevelLabel(r.budgetValue),
    educationLevel: r.currentSessionLog?.demographics?.education_level || '',
    majorGroup: r.currentSessionLog?.demographics?.major_group || '',
    disposableIncomeLevel: r.currentSessionLog?.demographics?.disposable_income_level || '',
    householdIncomeLevel: r.currentSessionLog?.demographics?.household_income_level || '',
    ai_summary_staySec: r.behavior?.ai_summary_staySec ?? '',
    switchCount: r.switchCount ?? '',
    ctaClicks: r.ctaClicks ?? '',
    q1_depthLogic: r.survey?.q1_depthLogic ?? '',
    q2_visualAttraction: r.survey?.q2_visualAttraction ?? '',
    q3_purchaseIntent: r.survey?.q3_purchaseIntent ?? '',
    versionSequence: (Array.isArray(r.currentSessionLog?.behavior_metrics?.round_results)
      ? r.currentSessionLog.behavior_metrics.round_results
      : []).map((round)=>String(round?.scenario_key || '').trim().toUpperCase()).filter(Boolean).join('➔'),
    q1Sequence: (Array.isArray(r.currentSessionLog?.behavior_metrics?.round_results)
      ? r.currentSessionLog.behavior_metrics.round_results
      : []).map((round)=>Number(round?.q1_depthLogic)).filter((num)=>Number.isFinite(num)).join(','),
    aiDwellSequence: (Array.isArray(r.currentSessionLog?.behavior_metrics?.round_results)
      ? r.currentSessionLog.behavior_metrics.round_results
      : []).map((round)=>`${getRoundAiSummaryDwell(round).toFixed(1)}s`).join(','),
    courseSequence: (Array.isArray(r.currentSessionLog?.behavior_metrics?.round_results)
      ? r.currentSessionLog.behavior_metrics.round_results
      : []).map((round)=>String(round?.selected_course_id || '').trim()).filter(Boolean).join(','),
  }));

  const keys=Object.keys(rows[0]);
  const lines=[
    keys.join(','),
    ...rows.map((row)=>keys.map((k)=>escapeCsv(row[k])).join(',')),
  ];

  downloadFile(lines.join('\n'), `aero-backend-records-${Date.now()}.csv`, 'text/csv;charset=utf-8');
  toast(`已匯出 ${records.length} 筆後台資料`);
}

function copyBackendRecordsJson(){
  if(ROLE.participant){
    toast('後台僅供研究者使用');
    return;
  }

  const records=getBackendRecords();
  if(!records.length){
    toast('目前沒有可複製的後台資料');
    return;
  }

  const payload={
    exportedAt: new Date().toISOString(),
    totalRecords: records.length,
    records,
  };
  const text=JSON.stringify(payload, null, 2);

  navigator.clipboard.writeText(text)
    .then(()=>toast(`已複製 ${records.length} 筆後台 JSON`))
    .catch(()=>prompt('請手動複製：', text));
}

function openSurvey(){
  // 研究者請將此處改為實際問卷 URL
  const url=''; // e.g. 'https://forms.gle/xxxx'
  if(url){ window.open(url,'_blank'); }
  else{ toast('請在程式碼中設定問卷 URL'); }
}

const IC_PATHS = {
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'trending':     '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  'fire':         '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  'heart':        '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  'clock':        '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'check':        '<polyline points="20 6 9 17 4 12"/>',
  'chart':        '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
};

function renderIcons(root) {
  (root || document).querySelectorAll('i[data-icon]').forEach(el => {
    const name = el.getAttribute('data-icon');
    const d = IC_PATHS[name] || IC_PATHS['check-circle'];
    const sw = el.style.color ? `stroke="${el.style.color}"` : 'stroke="currentColor"';
    const cls = el.className.replace('ic-feat','ic ic-sm').trim();
    const svg = `<svg class="${cls}" width="14" height="14" viewBox="0 0 24 24" fill="none" ${sw} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
    el.outerHTML = svg;
  });
}

function initAiCardIcons(){
  const defs = [
    { id:'perp', icon:'search', color:'var(--perp-c)' },
    { id:'chat', icon:'chat', color:'var(--chat-c)' },
    { id:'goog', icon:'sun', color:'var(--goog-c)' },
  ];

  defs.forEach(({id, icon, color})=>{
    const card = document.getElementById('ai-'+id);
    if(!card) return;
    const box = card.querySelector('.ai-icon-box');
    if(!box) return;
    box.innerHTML = `<svg class="ai-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[icon]}</svg>`;
  });
}

document.addEventListener('DOMContentLoaded', async ()=>{
  await initializeCourseCatalog();
  applyAdvisorDemoUxCopy();
  if(courseDataLoadError){
    renderCourseDataErrorState();
    configureRoleUI();
    ensureAdvisorDemoPanel();
    updateAdvisorDemoPanel();
    renderIcons(document);
    return;
  }
  currentSessionLog.course_data_summary=courseDataSummary;
  configureRoleUI();
  syncCurrentSessionLogStorage();
  initAiCardIcons();
  bindBudgetSliderListeners();
  initBudgetUI();
  renderHahowRecommendations();
  initBehaviorTracking();
  renderIcons(document);
  if(restoreResearchTrackingSession()){
    const restoredDecision=getCurrentRoundDecision();
    if(restoredDecision?.started && !restoredDecision.completed){
      budgetValue=Number(restoredDecision.budget) || budgetValue;
      if(!Number.isFinite(Number(currentSessionLog.confirmed_budget)) && Number.isFinite(Number(restoredDecision.budget))){
        currentSessionLog.confirmed_budget=Number(restoredDecision.budget);
      }
      enterParticipantCourseList({restore:true});
    }else{
      const visiblePage=document.querySelector('.page.show')?.id?.replace(/^page-/, '') || 'landing';
      syncTrackingPageForUi(visiblePage);
    }
  }

  if(!window.__aeroCourseHistoryBound){
    window.addEventListener('popstate', ()=>{
      if(ROLE.participant && currentCourseView==='detail'){
        closeActiveCourseDetail('browser_back',{backMethod:'browser_back'});
      }
    });
    window.__aeroCourseHistoryBound=true;
  }

  const joinForm=document.getElementById('join-modal-form');
  if(joinForm && !joinForm.dataset.submitBound){
    joinForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      submitJoinSurvey();
    });
    joinForm.dataset.submitBound='1';
  }

  const ghostBtn=document.querySelector('.hero-btns .btn-ghost');
  if(ROLE.participant && ghostBtn) ghostBtn.style.display='none';

  if(ROLE.participant){
    const step=document.getElementById('step-nav');
    if(step) step.style.display='flex';
    setStepState(0);
  }

  if(!ROLE.participant && new URLSearchParams(window.location.search).get('backend')==='1'){
    openBackendPage();
  }
});

