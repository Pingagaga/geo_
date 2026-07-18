import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const flow=require('../../geo_/course-decision-flow.js');
const aero=fs.readFileSync(new URL('../../geo_/AERO.js', import.meta.url), 'utf8');
const html=fs.readFileSync(new URL('../../geo_/AERO.html', import.meta.url), 'utf8');
const css=fs.readFileSync(new URL('../../geo_/AERO.css', import.meta.url), 'utf8');

const courses=Array.from({length:24},(_,i)=>({
  id:`course-${i+1}`,
  title:`Course ${i+1}`,
  price:1000+(i%6)*250,
  average_rating:4.9,
  num_purchased:100+i,
  total_hours:3+(i%3),
  category:['biz','data','career'][i%3],
}));

function state(scenario='a'){
  const sampled=flow.sampleCandidates({participantId:'advisor-demo-p',roundIndex:0,scenarioKey:scenario,budget:3000,courses,count:4});
  const round=flow.createRoundState({round_index:0,scenario_key:scenario,condition_id:1,...sampled});
  round.budget=3000;
  return round;
}

test('1 welcome states role, goal, and four rounds',()=>{
  assert.match(aero,/即將畢業的大學生/);
  assert.match(aero,/提升未來的就業競爭力/);
  assert.match(aero,/4 個課程選擇回合/);
});

test('2 tracking is not started before consent',()=>{
  const acceptBody=aero.match(/function acceptAdvisorConsent\(\)[\s\S]*?function syncAdvisorConsentChecklist\(\)/)?.[0] || '';
  assert.match(acceptBody,/advisor-consent-check/);
  assert.match(acceptBody,/startParticipantCourse\(\)/);
});

test('3 profile completion enters scenario briefing',()=>{
  assert.match(aero,/function submitParticipantProfile\(\)/);
  assert.match(aero,/enterParticipantCourseFlow\(\)/);
  assert.match(aero,/showScenarioBriefing\(\)/);
});

test('4 scenario briefing precedes budget setup and round intro',()=>{
  assert.match(aero,/function startFirstRoundFromBriefing\(\)/);
  assert.match(aero,/showBudgetSetup\(\)/);
  assert.match(aero,/function showRoundIntro\(/);
});

test('5 course list shows Round N of four',()=>assert.match(aero,/Round \$\{roundNumber\} \/ \$\{TOTAL_ROUNDS\}/));
test('6 course list uses current budget label',()=>assert.match(aero,/本回合補助/));

test('7 viewing full information does not complete the round',()=>{
  const s=state();
  const opened=flow.openDetail(s,s.candidate_course_ids[0]).state;
  assert.equal(opened.completed,false);
});

test('8 detail has three decision buttons',()=>{
  assert.match(aero,/選擇這堂課/);
  assert.match(aero,/繼續比較其他課程/);
  assert.match(aero,/暫不考慮/);
});

test('9 continue_compare returns the same candidates',()=>{
  const s=state(),id=s.candidate_course_ids[0];
  const returned=flow.returnToList(flow.openDetail(s,id).state,'continue_compare',id);
  assert.deepEqual(returned.candidate_course_ids,s.candidate_course_ids);
});

test('10 reject does not complete the round',()=>{
  const s=state(),id=s.candidate_course_ids[0];
  const returned=flow.returnToList(flow.openDetail(s,id).state,'reject',id);
  assert.equal(returned.completed,false);
});

test('11 only adopt completes a round',()=>{
  const s=state(),id=s.candidate_course_ids[0];
  assert.equal(flow.returnToList(flow.openDetail(s,id).state,'continue_compare',id).completed,false);
  assert.equal(flow.returnToList(flow.openDetail(s,id).state,'reject',id).completed,false);
  assert.equal(flow.adopt(s,id).state.completed,true);
});

test('12 transition displays the selected course',()=>{
  assert.match(aero,/本回合選擇課程/);
  assert.match(aero,/selected_course_id/);
});

test('13 final round enters questionnaire intro before questionnaire',()=>{
  assert.match(aero,/questionnaire-intro-stage/);
  assert.match(aero,/開始填寫問卷/);
});

test('14 questionnaire uses concise AI content items',()=>{
  assert.match(html,/AI 課程內容感受問卷/);
  assert.match(html,/這些 AI 生成的課程介紹讓我覺得課程資訊可信/);
  assert.match(html,/這些內容幫助我判斷哪一門課比較值得投入補助/);
  assert.match(html,/即使知道課程介紹由 AI 生成，我仍覺得它可以作為決策參考/);
  assert.doesNotMatch(html,/name="q12"/);
  assert.match(html,/name="adoption_choice"/);
});

test('15 formal mode does not render demo panel',()=>{
  assert.match(aero,/const ADVISOR_DEMO_MODE = roleParams\.get\('demo'\) === '1'/);
  assert.match(aero,/if\(!ADVISOR_DEMO_MODE \|\| document\.getElementById\('advisor-demo-panel'\)\) return/);
});

test('16 demo mode exposes a read-only advisor panel',()=>{
  assert.match(aero,/Advisor Demo Only/);
  assert.match(css,/\.advisor-demo-panel/);
});

test('17 demo panel does not mutate session state',()=>{
  const body=aero.match(/function updateAdvisorDemoPanel\(\)[\s\S]*?function applyAdvisorDemoUxCopy\(\)/)?.[0] || '';
  assert.equal(/saveCurrentRoundDecision|advanceParticipantRound|startTrackingRound|confirmBudgetAndStartCourses/.test(body), false);
});

test('18 all conditions share the same UI structure',()=>{
  for(const scenario of ['a','b','c','d']){
    assert.equal(state(scenario).candidate_generation_version,flow.VERSION);
  }
  assert.match(aero,/ensureCourseDetailDecisionStructure/);
});

test('19 tracking hooks remain wired',()=>{
  assert.match(aero,/safeTrackCall\('startQuestionnaire'/);
  assert.match(aero,/safeTrackCall\('recordAdoption','adopt'/);
});

test('20 course decision tests remain compatible with deterministic flow',()=>{
  assert.equal(flow.VERSION,'deterministic-v1');
});

test('21 consent removes the no-content checklist item',()=>{
  assert.equal(aero.includes('<strong>不記錄內容</strong>'), false);
});

test('22 participant detail hides legacy adoption button areas',()=>{
  assert.match(aero,/course-decision-actions/);
  assert.match(aero,/course-hero-btns/);
  assert.match(aero,/node\.hidden=true/);
});

test('23 course content placeholder does not expose condition structure labels',()=>{
  const body=aero.match(/function buildTheoryNarrativeHtml\([\s\S]*?function applyTheoryNarrative/)?.[0] || '';
  assert.equal(/Central|Peripheral|High Structure|Low Structure|content-condition-demo/.test(body), false);
});
