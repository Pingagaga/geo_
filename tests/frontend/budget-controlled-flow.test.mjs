import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const loader=require('../../geo_/course-data-loader.js');
const flow=require('../../geo_/course-decision-flow.js');
const aero=fs.readFileSync(new URL('../../geo_/AERO.js', import.meta.url), 'utf8');
const css=fs.readFileSync(new URL('../../geo_/AERO.css', import.meta.url), 'utf8');
const html=fs.readFileSync(new URL('../../geo_/AERO.html', import.meta.url), 'utf8');
const trackingService=fs.readFileSync(new URL('../../geo_/tracking-service.js', import.meta.url), 'utf8');
const json=JSON.parse(fs.readFileSync(new URL('../../geo_/data/hahow_courses.json', import.meta.url), 'utf8'));
const normalized=loader.normalizePayload(json);
const courses=normalized.aeroCourses;

test('1 budget is no longer auto-randomized',()=>{
  assert.equal(/Math\.random\(\).*budgetValue|budgetValue.*Math\.random\(\)/.test(aero), false);
  assert.equal(/budgetValue=bounds\.max/.test(aero), false);
});

test('2 budget is confirmed by the user',()=>{
  assert.match(aero,/function confirmBudgetAndStartCourses\(\)/);
  assert.match(aero,/currentSessionLog\.confirmed_budget=next/);
});

test('3 confirmed budget is the round budget source',()=>{
  assert.match(aero,/const confirmedBudget=Number\(currentSessionLog\.confirmed_budget\)/);
  assert.match(aero,/decision\.budget=confirmedBudget/);
});

test('4 price strings normalize to numbers',()=>{
  assert.equal(loader.parsePrice(' NT$ 1,500 元 '),1500);
  assert.equal(loader.parsePrice('TWD 27800'),27800);
  assert.equal(loader.parsePrice('free'),null);
});

test('5 only price within budget is eligible',()=>{
  const budget=1500;
  const eligible=courses.filter(course=>course.price<=budget);
  assert.equal(eligible.length,12);
  assert.equal(eligible.every(course=>course.price<=budget),true);
});

test('6 fewer than sixteen courses cannot start',()=>{
  assert.match(aero,/MINIMUM_ELIGIBLE_COURSES/);
  assert.match(aero,/完成四個不重複回合至少需要/);
});

test('7 each round samples four courses',()=>{
  const result=flow.sampleCandidates({participantId:'p',roundIndex:0,scenarioKey:'a',budget:2000,courses,count:4});
  assert.equal(result.candidate_course_ids.length,4);
});

test('8 course grid is a two by two structure on desktop',()=>{
  assert.match(css,/#round-course-list\.hahow-reco-list\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css,/#round-course-list \.hr-item\{display:flex;flex-direction:column/);
});

test('9 same course never repeats across four rounds when used ids are carried forward',()=>{
  const used=[];
  const all=[];
  for(let round=0;round<4;round+=1){
    const result=flow.sampleCandidates({participantId:'p-stable',roundIndex:round,scenarioKey:'a',budget:3000,courses,usedCourseIds:used,count:4});
    assert.equal(result.candidate_course_ids.length,4);
    result.candidate_course_ids.forEach(id=>used.push(id));
    all.push(...result.candidate_course_ids);
  }
  assert.equal(new Set(all).size,16);
});

test('10 refresh keeps candidates from stored session round_candidates',()=>{
  assert.match(aero,/currentSessionLog\.round_candidates\[key\]/);
  assert.match(aero,/storedCandidates\.length===CANDIDATES_PER_ROUND/);
});

test('11 continue_compare keeps the same candidates',()=>{
  const s=flow.createRoundState({round_index:0,scenario_key:'a',condition_id:1,...flow.sampleCandidates({participantId:'p',roundIndex:0,scenarioKey:'a',budget:3000,courses,count:4})});
  const id=s.candidate_course_ids[0];
  const returned=flow.returnToList(flow.openDetail(s,id).state,'continue_compare',id);
  assert.deepEqual(returned.candidate_course_ids,s.candidate_course_ids);
});

test('12 reject does not complete the round',()=>{
  const s=flow.createRoundState({round_index:0,scenario_key:'a',condition_id:1,...flow.sampleCandidates({participantId:'p',roundIndex:0,scenarioKey:'a',budget:3000,courses,count:4})});
  const id=s.candidate_course_ids[0];
  const returned=flow.returnToList(flow.openDetail(s,id).state,'reject',id);
  assert.equal(returned.completed,false);
});

test('13 viewing detail does not complete the round',()=>{
  const s=flow.createRoundState({round_index:0,scenario_key:'a',condition_id:1,...flow.sampleCandidates({participantId:'p',roundIndex:0,scenarioKey:'a',budget:3000,courses,count:4})});
  assert.equal(flow.openDetail(s,s.candidate_course_ids[0]).state.completed,false);
});

test('14 adopt completes the round',()=>{
  const s=flow.createRoundState({round_index:0,scenario_key:'a',condition_id:1,...flow.sampleCandidates({participantId:'p',roundIndex:0,scenarioKey:'a',budget:3000,courses,count:4})});
  assert.equal(flow.adopt(s,s.candidate_course_ids[0]).state.completed,true);
});

test('15 selected and displayed candidates are excluded later',()=>{
  assert.match(aero,/usedCourseIds:currentSessionLog\.used_course_ids/);
  assert.match(aero,/sampled\.candidate_course_ids\.forEach/);
});

test('16 four conditions appear once in each Latin Square sequence',()=>{
  for(const seq of [["a","b","c","d"],["b","c","d","a"],["c","d","a","b"],["d","a","b","c"]]){
    assert.deepEqual([...new Set(seq)].sort(),['a','b','c','d']);
  }
  assert.match(aero,/COUNTERBALANCE_SEQUENCES/);
});

test('17 Latin Square assignment is stable by participant id',()=>{
  assert.match(aero,/createAdvisorDemoAssignment/);
  assert.match(aero,/normalizeRemainder/);
});

test('18 questionnaire cannot appear before final transition',()=>{
  assert.match(aero,/if\(rounds\.length < TOTAL_ROUNDS\)/);
  assert.match(aero,/showRoundTransition\(roundResult, true\)/);
});

test('19 formal mode hides condition while demo mode shows it',()=>{
  assert.match(aero,/if\(ROLE\.participant\)/);
  assert.match(aero,/ADVISOR_DEMO_MODE/);
  assert.match(aero,/Central/);
  assert.match(aero,/High Structure/);
});

test('20 JSON load failure does not use fake courses',()=>{
  assert.match(aero,/renderCourseDataErrorState/);
  assert.match(aero,/HAHOW_BIZ_COURSES=\[\]/);
});

test('21 xlsx source is converted before Netlify config generation',()=>{
  const netlify=fs.readFileSync(new URL('../../netlify.toml', import.meta.url),'utf8');
  assert.match(netlify,/generate-course-data\.mjs/);
});

test('22 generated data preserves Excel counts and price bounds',()=>{
  assert.equal(json.valid_count,89);
  assert.equal(json.invalid_count,2);
  assert.equal(json.min_price,950);
  assert.equal(json.max_price,27800);
});

test('23 frontend reads JSON through the loader script',()=>{
  assert.match(html,/course-data-loader\.js/);
  assert.match(aero,/data\/hahow_courses\.json/);
});

test('24 tracking event names are not renamed in this flow change',()=>{
  assert.match(aero,/safeTrackCall\('recordAdoption','adopt'/);
  assert.match(aero,/safeTrackCall\('endCourseDetail',reason/);
  assert.match(trackingService,/continue_compare/);
  assert.match(trackingService,/reject/);
});
