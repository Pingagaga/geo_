(function initAEROCourseDecision(global){
  'use strict';
  const VERSION='deterministic-v1';
  function clone(value){return JSON.parse(JSON.stringify(value));}
  function hash(text){let h=2166136261;for(const ch of String(text)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
  function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
  function shuffle(items,seed){const out=[...items],random=rng(hash(seed));for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
  function sampleCandidates({participantId,roundIndex,scenarioKey,budget,courses,adoptedCourseIds=[],usedCourseIds=[],count=4}){
    const blocked=new Set([...adoptedCourseIds,...usedCourseIds].map(String));
    const eligible=(courses||[]).filter(c=>Number(c.price)<=Number(budget)&&!blocked.has(String(c.id)));
    const seedKey=`${participantId}|${roundIndex}`;
    const categories=new Map();
    for(const course of eligible){const category=String(course.category||course.topic||'').trim();if(!category)continue;if(!categories.has(category))categories.set(category,[]);categories.get(category).push(course);}
    let ordered=[];
    if(categories.size>1){
      const groups=shuffle([...categories.entries()],`${seedKey}|categories`).map(([key,value])=>shuffle(value,`${seedKey}|${key}`));
      while(ordered.length<eligible.length){let added=false;for(const group of groups){if(group.length){ordered.push(group.shift());added=true;}}if(!added)break;}
    }else ordered=shuffle(eligible,seedKey);
    const seen=new Set(),candidates=[];
    for(const course of ordered){const id=String(course.id);if(seen.has(id))continue;seen.add(id);candidates.push(course);if(candidates.length>=count)break;}
    return {eligible_course_ids:eligible.map(c=>String(c.id)),candidate_course_ids:candidates.map(c=>String(c.id)),candidate_seed:seedKey,candidate_generation_version:VERSION};
  }
  function createRoundState(input){return{
    round_index:Number(input.round_index),scenario_key:input.scenario_key,condition_id:input.condition_id??null,
    eligible_course_ids:[...(input.eligible_course_ids||[])],candidate_course_ids:[...(input.candidate_course_ids||[])],
    candidate_seed:input.candidate_seed,candidate_generation_version:input.candidate_generation_version||VERSION,
    viewed_course_ids:[],rejected_course_ids:[],selected_course_id:null,actual_adoption_action:null,adoption_timestamp:null,
    current_view:'list',active_detail_course_id:null,detail_entry_method:null,detail_opened_at:null,detail_open_counts:{},started:false,completed:false,
  };}
  function openDetail(state,courseId,{entryMethod='course_list',restore=false}={}){
    const id=String(courseId);if(!state.candidate_course_ids.includes(id)||state.completed)return{ok:false,state};
    const next=clone(state);next.current_view='detail';next.active_detail_course_id=id;next.detail_entry_method=restore?'session_restore':entryMethod;next.detail_opened_at=new Date().toISOString();
    if(!next.viewed_course_ids.includes(id))next.viewed_course_ids.push(id);
    const previous=next.detail_open_counts[id]||0;if(!restore)next.detail_open_counts[id]=previous+1;
    return{ok:true,reopen:!restore&&previous>0,state:next};
  }
  function returnToList(state,action,courseId){const next=clone(state),id=String(courseId||next.active_detail_course_id||'');next.current_view='list';next.active_detail_course_id=null;next.detail_entry_method=null;next.detail_opened_at=null;if(action==='reject'&&id&&!next.rejected_course_ids.includes(id))next.rejected_course_ids.push(id);if(action==='continue_compare'||action==='reject')next.actual_adoption_action=action;return next;}
  function adopt(state,courseId,adoptedIds=[]){const id=String(courseId),blocked=new Set(adoptedIds.map(String));if(state.completed||!state.candidate_course_ids.includes(id)||state.rejected_course_ids.includes(id)||blocked.has(id))return{ok:false,state};const next=clone(state);next.selected_course_id=id;next.actual_adoption_action='adopt';next.adoption_timestamp=new Date().toISOString();next.completed=true;next.current_view='detail';return{ok:true,state:next};}
  const api={VERSION,hash,shuffle,sampleCandidates,createRoundState,openDetail,returnToList,adopt};
  global.AEROCourseDecisionFlow=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
