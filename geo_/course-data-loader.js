(function initAEROCourseDataLoader(global){
  'use strict';

  function parsePrice(value){
    const cleaned=String(value ?? '')
      .replace(/NT\$/gi,'')
      .replace(/NTD/gi,'')
      .replace(/TWD/gi,'')
      .replace(/[元,\s]/g,'');
    if(!cleaned) return null;
    const number=Number(cleaned);
    return Number.isFinite(number) && number>0 ? Math.round(number) : null;
  }

  function parseNumber(value){
    const cleaned=String(value ?? '').replace(/,/g,'').trim();
    if(!cleaned) return null;
    const token=cleaned.match(/-?\d+(?:\.\d+)?/)?.[0] || '';
    const number=Number(token || cleaned);
    return Number.isFinite(number) ? number : null;
  }

  function normalizeCourse(raw,index){
    const sourceRow=Number(raw?.source_row) || index + 2;
    const price=parsePrice(raw?.price ?? raw?.original_price);
    const name=String(raw?.course_name ?? raw?.title ?? '').trim();
    const id=String(raw?.course_id ?? raw?.id ?? '').trim() || `hahow-row-${sourceRow}`;
    if(!name) return { course:null, warning:{source_row:sourceRow, course_id:id, reason:'missing course_name'} };
    if(price===null) return { course:null, warning:{source_row:sourceRow, course_id:id, course_name:name, reason:'invalid price'} };

    const rating=parseNumber(raw?.rating ?? raw?.average_rating);
    const students=parseNumber(raw?.students ?? raw?.num_purchased);
    const duration=raw?.duration ?? raw?.total_hours ?? null;
    return {
      course:{
        course_id:id,
        course_name:name,
        price,
        rating,
        students:students===null ? null : Math.round(students),
        duration:duration===null || duration==='' ? null : String(duration),
        source_row:sourceRow,
      },
      warning:null,
    };
  }

  function toAeroCourse(course,index){
    return {
      id:course.course_id,
      title:course.course_name,
      price:course.price,
      total_hours:parseNumber(course.duration) ?? null,
      duration:course.duration,
      num_purchased:course.students,
      average_rating:course.rating,
      scenarioKey:['a','b','c','d'][index % 4],
      source_row:course.source_row,
      category:'hahow-business',
    };
  }

  function summarize(courses,warnings,meta={}){
    const prices=courses.map(course=>Number(course.price)).filter(price=>Number.isFinite(price) && price>0);
    return {
      source_file:meta.source_file || 'geo_/hahow_courses.xlsx',
      columns:Array.isArray(meta.columns) ? [...meta.columns] : [],
      valid_count:courses.length,
      invalid_count:warnings.length,
      min_price:prices.length ? Math.min(...prices) : null,
      max_price:prices.length ? Math.max(...prices) : null,
      warnings:[...warnings],
    };
  }

  function normalizePayload(payload){
    const rows=Array.isArray(payload?.courses) ? payload.courses : (Array.isArray(payload) ? payload : []);
    const normalized=[];
    const warnings=Array.isArray(payload?.warnings) ? [...payload.warnings] : [];
    rows.forEach((row,index)=>{
      const result=normalizeCourse(row,index);
      if(result.course) normalized.push(result.course);
      if(result.warning) warnings.push(result.warning);
    });
    const summary=summarize(normalized,warnings,payload || {});
    return {
      courses:normalized,
      aeroCourses:normalized.map(toAeroCourse),
      summary,
    };
  }

  async function loadCourseData({url='data/hahow_courses.json',fetchImpl=global.fetch}={}){
    if(typeof fetchImpl!=='function'){
      throw new Error('Course data loader requires fetch().');
    }
    const response=await fetchImpl(url,{cache:'no-store'});
    if(!response?.ok){
      throw new Error(`Course data request failed: ${response?.status || 'network'} ${response?.statusText || ''}`.trim());
    }
    const payload=await response.json();
    const normalized=normalizePayload(payload);
    if(!normalized.courses.length){
      throw new Error('Course data loaded but no valid priced courses were found.');
    }
    return normalized;
  }

  const api={parsePrice,parseNumber,normalizeCourse,normalizePayload,loadCourseData};
  global.AEROCourseDataLoader=api;
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
