import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const flow=require('../../geo_/course-decision-flow.js');
const aero=fs.readFileSync(new URL('../../geo_/AERO.js', import.meta.url), 'utf8');
const html=fs.readFileSync(new URL('../../geo_/AERO.html', import.meta.url), 'utf8');
const css=fs.readFileSync(new URL('../../geo_/AERO.css', import.meta.url), 'utf8');
const admin=fs.readFileSync(new URL('../../geo_/research-admin.html', import.meta.url), 'utf8');

const courses=Array.from({length:24},(_,i)=>({
  id:`course-${i+1}`,
  title:`Course ${i+1}`,
  price:900+(i%6)*350,
  average_rating:4.9,
  num_purchased:100+i,
  total_hours:3+(i%3),
  category:['biz','data','career'][i%3],
}));

function state(scenario='a'){
  const sampled=flow.sampleCandidates({participantId:'advisor-demo-p',roundIndex:0,scenarioKey:scenario,budget:3000,courses,count:5});
  const round=flow.createRoundState({round_index:0,scenario_key:scenario,condition_id:1,...sampled});
  round.budget=3000;
  return round;
}

test('1 Welcome 顯示角色、目標與 4 回合',()=>{
  assert.match(aero,/即將畢業的大學生/);
  assert.match(aero,/提升未來就業競爭力/);
  assert.match(aero,/4 個課程選擇回合/);
});

test('2 Consent 前 tracking 不開始',()=>{
  assert.match(aero,/function updateConsentState\(\)/);
  const body=aero.match(/function updateConsentState\(\)\{[\s\S]*?\n\}/)?.[0] || '';
  assert.match(body,/if\(consent\?\.checked\)/);
  assert.match(body,/safeTrackCall\('setConsent', true\)/);
  assert.equal(body.includes("safeTrackCall('startOrResume'"), false);
});

test('2b Consent 說明需逐項勾選才可繼續',()=>{
  assert.match(aero,/class="consent-checklist"/);
  assert.match(aero,/class="advisor-consent-check"/);
  assert.match(aero,/function syncAdvisorConsentChecklist\(\)/);
  assert.match(aero,/advisor-consent-continue/);
  assert.match(css,/\.consent-checkmark/);
});

test('3 Profile 完成後進入 scenario briefing',()=>{
  assert.match(aero,/function submitParticipantProfile\(\)/);
  assert.match(aero,/enterParticipantCourseFlow\(\)/);
  assert.match(aero,/showScenarioBriefing\(\)/);
});

test('4 Scenario briefing 後才開始 round 1',()=>{
  assert.match(aero,/let scenarioBriefingAcknowledged = false/);
  assert.match(aero,/function startFirstRoundFromBriefing\(\)/);
  assert.match(aero,/scenarioBriefingAcknowledged=true/);
  assert.match(aero,/currentStepIndex===0 && !scenarioBriefingAcknowledged/);
});

test('5 Course list 顯示 Round N/4',()=>assert.match(aero,/Round \$\{roundNumber\} \/ \$\{TOTAL_ROUNDS\}/));
test('6 Course list 顯示正確預算文案',()=>assert.match(aero,/function advisorBudgetLabel\(\)[\s\S]*本回合補助/));

test('7 查看完整資訊不完成回合',()=>{
  const s=state();
  const opened=flow.openDetail(s,s.candidate_course_ids[0]).state;
  assert.equal(opened.completed,false);
});

test('8 Detail 顯示三個決策按鈕',()=>{
  assert.match(aero,/選擇這堂課/);
  assert.match(aero,/繼續比較其他課程/);
  assert.match(aero,/暫不考慮/);
});

test('9 continue_compare 返回相同候選',()=>{
  const s=state(),id=s.candidate_course_ids[0];
  const returned=flow.returnToList(flow.openDetail(s,id).state,'continue_compare',id);
  assert.deepEqual(returned.candidate_course_ids,s.candidate_course_ids);
});

test('10 reject 不完成回合',()=>{
  const s=state(),id=s.candidate_course_ids[0];
  const returned=flow.returnToList(flow.openDetail(s,id).state,'reject',id);
  assert.equal(returned.completed,false);
});

test('11 adopt 才進入 transition',()=>{
  const s=state(),id=s.candidate_course_ids[0];
  assert.equal(flow.returnToList(flow.openDetail(s,id).state,'continue_compare',id).completed,false);
  assert.equal(flow.returnToList(flow.openDetail(s,id).state,'reject',id).completed,false);
  assert.equal(flow.adopt(s,id).state.completed,true);
  assert.match(aero,/showRoundTransition\(roundResult, false\)/);
});

test('12 Transition 顯示 selected course',()=>{
  assert.match(aero,/本回合選擇課程/);
  assert.match(aero,/selected_course_id/);
});

test('13 Final round 後進入 questionnaire intro',()=>{
  assert.match(aero,/questionnaire-intro-stage/);
  assert.match(aero,/開始填寫問卷/);
});

test('14 Questionnaire 題目未被修改',()=>{
  assert.match(html,/name="q12"/);
  assert.match(html,/name="adoption_choice"/);
});

test('15 正式模式不顯示 demo panel',()=>{
  assert.match(aero,/const ADVISOR_DEMO_MODE = roleParams\.get\('demo'\) === '1'/);
  assert.match(aero,/if\(!ADVISOR_DEMO_MODE \|\| document\.getElementById\('advisor-demo-panel'\)\) return/);
});

test('16 ?demo=1 顯示只讀 demo panel',()=>{
  assert.match(aero,/Advisor Demo Only/);
  assert.match(css,/\.advisor-demo-panel/);
});

test('17 demo panel 不修改 session state',()=>{
  const body=aero.match(/function updateAdvisorDemoPanel\(\)[\s\S]*?function applyAdvisorDemoUxCopy\(\)/)?.[0] || '';
  assert.equal(/saveCurrentRoundDecision|advanceParticipantRound|assignConditionByUserId|startTrackingRound/.test(body), false);
});

test('17b ?demo=1 assignment API failure has local deterministic fallback only for demo',()=>{
  assert.match(aero,/function createAdvisorDemoAssignment\(\)/);
  assert.match(aero,/if\(ADVISOR_DEMO_MODE\)\{[\s\S]*createAdvisorDemoAssignment\(\)/);
  assert.match(aero,/研究資料庫連線失敗/);
});

test('18 四個 condition 共用同一 UI 結構',()=>{
  for(const scenario of ['a','b','c','d']){
    assert.equal(state(scenario).candidate_generation_version,flow.VERSION);
  }
  assert.equal((aero.match(/ensureCourseDetailDecisionStructure/g) || []).length >= 2, true);
});

test('19 Existing tracking tests remain in validation list',()=>{
  assert.match(aero,/safeTrackCall\('startQuestionnaire'/);
  assert.match(aero,/safeTrackCall\('recordAdoption','adopt'/);
});

test('20 Existing course decision tests remain compatible',()=>{
  assert.equal(flow.VERSION,'deterministic-v1');
  assert.match(admin,/Behavior details 尚未同步至後端/);
});
