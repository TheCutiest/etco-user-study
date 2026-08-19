
// ============================================================
// i18n
// ============================================================
const I18N = {
  zh: {
    eyebrow: "用户研究 · TEXT-TO-4D",
    title: "ETCO 人类评估",
    subtitle: "Part 1：单视频独立评分（稳定性）。Part 2：两两比较（prompt alignment / visual quality / geometry consistency / overall preference）。",
    welcomeHeading: "参与说明",
    welcomeIntro: "感谢参与本次视觉评估。在本次实验中，你将观看一系列由文本输入生成的 3D / 4D 物体视频。本次实验分为两个部分：",
    notice1Label: "Part 1 · 稳定性评估：",
    notice1Body: "每次只展示一个视频，请独立打分（不会成对比较）。",
    notice2Label: "Part 2 · 两两比较：",
    notice2Body: "每题展示同一 prompt 下的两个结果 A / B，请比较后作答。",
    noticeDimsLabel: "评估维度：",
    noticeDimsBody: "Prompt Alignment · Visual Quality · Geometry Consistency · Overall Quality / Preference",
    participantLabel: "Participant ID（可填姓名、昵称或任意代号，用于区分不同参与者）",
    participantPlaceholder: "例如：张三 / 小明 / Xinyan / P001",
    consentText: "我已阅读说明，并同意匿名记录本次评估结果。",
    startBtn: "开始评估",
    promptLabel: "文本提示",
    resultLabel: "结果",
    resultALabel: "结果 A",
    resultBLabel: "结果 B",
    prevBtn: "上一题",
    nextBtn: "下一题",
    finishPart1Btn: "完成 Part 1",
    submitBtn: "提交",
    transitionHeading: "Part 1 已完成",
    transitionBody: "接下来进入 Part 2：两两比较评估。每题会展示两个结果 A / B，请根据四个维度进行比较。",
    continueBtn: "开始 Part 2",
    finishHeading: "完成啦 🎉",
    finishBody: "你的回答已保存在当前浏览器中。点击下方按钮可以导出 CSV。感谢您的参与！请将导出的结果文件发送给作者管心妍（Xinyan Guan，xinyanguan015@gmail.com），您将获得 6.6 元微信红包和作者的感谢。",
    downloadBtn: "下载 CSV",
    restartBtn: "重新开始",
    alertParticipant: "请填写 Participant ID",
    alertConsent: "请先勾选同意参与",
    alertIncomplete: "请完成四个维度后再继续。",
    mediaMissingPrefix: "请把媒体文件放到：",
    noMedia: "暂无媒体",
    part1Progress: "PART 1 · 稳定性评估",
    part2Progress: "PART 2 · 两两比较",
    langToggle: "EN"
  },
  en: {
    eyebrow: "USER STUDY · TEXT-TO-4D",
    title: "ETCO Human Evaluation",
    subtitle: "Part 1: independent single-video rating (stability). Part 2: pairwise comparison (prompt alignment / visual quality / geometry consistency / overall preference).",
    welcomeHeading: "Instructions",
    welcomeIntro: "Thank you for taking part in this visual evaluation. In this study, you will view a series of 3D / 4D object videos generated from text prompts. The study has two parts:",
    notice1Label: "Part 1 · Stability Evaluation:",
    notice1Body: "Each trial shows a single video. Please rate it independently — you will not be comparing two results.",
    notice2Label: "Part 2 · Pairwise Comparison:",
    notice2Body: "Each trial shows two results, A and B, generated from the same prompt. Please compare them.",
    noticeDimsLabel: "Evaluation dimensions:",
    noticeDimsBody: "Prompt Alignment · Visual Quality · Geometry Consistency · Overall Quality / Preference",
    participantLabel: "Participant ID (your name, a nickname, or any label to identify you)",
    participantPlaceholder: "e.g. Alex / John / Xinyan / P001",
    consentText: "I have read the instructions and consent to my anonymized responses being recorded.",
    startBtn: "Start Evaluation",
    promptLabel: "TEXT PROMPT",
    resultLabel: "Result",
    resultALabel: "Result A",
    resultBLabel: "Result B",
    prevBtn: "Previous",
    nextBtn: "Next",
    finishPart1Btn: "Finish Part 1",
    submitBtn: "Submit",
    transitionHeading: "Part 1 Complete",
    transitionBody: "Next is Part 2: pairwise comparison. Each trial shows two results, A and B — please compare them on four dimensions.",
    continueBtn: "Start Part 2",
    finishHeading: "All Done 🎉",
    finishBody: "Your responses have been saved in this browser. Click below to export a CSV. Thank you for participating! Please send the exported result file to the author, Xinyan Guan (管心妍, xinyanguan015@gmail.com) — you'll receive a 6.6 RMB WeChat red packet and the author's thanks.",
    downloadBtn: "Download CSV",
    restartBtn: "Restart",
    alertParticipant: "Please enter a Participant ID",
    alertConsent: "Please check the consent box first",
    alertIncomplete: "Please answer all four dimensions before continuing.",
    mediaMissingPrefix: "Please place the media file at:",
    noMedia: "No media",
    part1Progress: "PART 1 · STABILITY EVALUATION",
    part2Progress: "PART 2 · PAIRWISE COMPARISON",
    langToggle: "中文"
  }
};

let lang = localStorage.getItem("etco_lang") || "zh";
const t = (key)=> I18N[lang][key];

function applyStaticText(){
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
  $("langToggle").textContent = t("langToggle");
}

// ============================================================
// Dimension definitions (titles stay in English in both languages —
// they are short technical terms used as-is in the paper/CSV).
// ============================================================

// Part 1 — absolute 1-5 rating, one dimension block per question.
const DIMENSIONS_STABILITY = [
  { key:"prompt_alignment", title:"Prompt Alignment",
    help:{ zh:"该视频与给定文本提示的语义是否一致？", en:"Does this video match the semantics of the given text prompt?" } },
  { key:"visual_quality", title:"Visual Quality",
    help:{ zh:"该视频整体是否清晰、自然、观感良好？", en:"Is the video overall clear, natural, and visually pleasing?" } },
  { key:"geometry_consistency", title:"Geometry Consistency",
    help:{ zh:"该视频中物体结构在多视角/运动过程中是否几何一致？", en:"Is the object's geometry consistent across views/motion in the video?" } },
  { key:"overall_quality", title:"Overall Quality",
    help:{ zh:"综合来看，你如何评价这个结果？", en:"Overall, how would you rate this result?" } }
];
const RATING_SCALE = {
  zh: [["1","1 分 · 很差"],["2","2 分 · 较差"],["3","3 分 · 一般"],["4","4 分 · 良好"],["5","5 分 · 优秀"]],
  en: [["1","1 · Very Poor"],["2","2 · Poor"],["3","3 · Fair"],["4","4 · Good"],["5","5 · Excellent"]]
};

// Part 2 — pairwise preference (existing scale, unchanged).
const DIMENSIONS_PAIRWISE = [
  { key:"prompt_alignment", title:"Prompt Alignment",
    help:{ zh:"哪个结果与给定文本提示的语义更一致？", en:"Which result better matches the semantics of the given text prompt?" } },
  { key:"visual_quality", title:"Visual Quality",
    help:{ zh:"哪个结果整体更清晰、自然、观感更好？", en:"Which result is overall clearer, more natural, and more visually pleasing?" } },
  { key:"geometry_consistency", title:"Geometry Consistency",
    help:{ zh:"哪个结果的物体结构与多视角/运动过程中的几何更一致？", en:"Which result has more consistent object geometry across views/motion?" } },
  { key:"overall_preference", title:"Overall Preference",
    help:{ zh:"综合来看，你更偏好哪个结果？", en:"Overall, which result do you prefer?" } }
];
const PREFERENCE_SCALE = {
  zh: [["A_strong","明显偏好 A"],["A","偏好 A"],["Tie","差不多"],["B","偏好 B"],["B_strong","明显偏好 B"]],
  en: [["A_strong","Strongly prefer A"],["A","Prefer A"],["Tie","About the same"],["B","Prefer B"],["B_strong","Strongly prefer B"]]
};

// ============================================================
// State
// ============================================================
let participant = "";

let part1Order = [];
let part1Current = 0;
let part1Answers = {};

let part2Order = [];
let part2Current = 0;
let part2Answers = {};
let part2Assignment = {}; // item.id -> boolean (true = A/B swapped for this participant)

let pendingDraft = null; // unsaved radio selections carried across a language toggle

const $ = (id)=>document.getElementById(id);

function seededShuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}

function persist(){
  localStorage.setItem(`etco_${participant}`, JSON.stringify({
    participant, part1Answers, part2Answers, part2Assignment
  }));
}

function renderMedia(el, path, type){
  el.innerHTML = "";
  if(!path){
    el.innerHTML = `<div class="placeholder">${t("noMedia")}</div>`;
    return;
  }
  if(type === "image"){
    const img = new Image();
    img.src = path;
    img.alt = "Study result";
    img.onerror = ()=> el.innerHTML = `<div class="placeholder">${t("mediaMissingPrefix")}<br>${path}</div>`;
    el.appendChild(img);
  }else{
    const v = document.createElement("video");
    v.src = path; v.controls = true; v.loop = true; v.muted = true; v.playsInline = true;
    v.onerror = ()=> el.innerHTML = `<div class="placeholder">${t("mediaMissingPrefix")}<br>${path}</div>`;
    el.appendChild(v);
  }
}

function currentDraft(dims){
  const draft = {};
  dims.forEach(dim=>{
    const checked = document.querySelector(`input[name="${dim.key}"]:checked`);
    if(checked) draft[dim.key] = checked.value;
  });
  return draft;
}

function renderScaleQuestions(root, dims, scale, item, savedRow){
  root.innerHTML = "";
  dims.forEach(dim=>{
    const block = document.createElement("div");
    block.className = "question";
    block.innerHTML = `
      <div class="q-title">${dim.title}</div>
      <div class="q-help">${dim.help[lang]}</div>
      <div class="options">
        ${scale.map(([value,label])=>`
          <div class="option">
            <input type="radio" id="${item.id}_${dim.key}_${value}" name="${dim.key}" value="${value}" ${savedRow[dim.key]===value?"checked":""}>
            <label for="${item.id}_${dim.key}_${value}">${label}</label>
          </div>`).join("")}
      </div>`;
    root.appendChild(block);
  });
}

function updateProgress(partLabel, index, total){
  $("partLabel").textContent = partLabel;
  $("progressText").textContent = `${index} / ${total}`;
  $("progressBar").style.width = total ? `${(index/total)*100}%` : "0%";
}

// ============================================================
// Language toggle
// ============================================================
function toggleLanguage(){
  if(!$("part1").classList.contains("hidden")){
    pendingDraft = currentDraft(DIMENSIONS_STABILITY);
  }else if(!$("part2").classList.contains("hidden")){
    pendingDraft = currentDraft(DIMENSIONS_PAIRWISE);
  }else{
    pendingDraft = null;
  }

  lang = lang === "zh" ? "en" : "zh";
  localStorage.setItem("etco_lang", lang);
  applyStaticText();

  if(!$("part1").classList.contains("hidden")) renderPart1Item();
  else if(!$("part2").classList.contains("hidden")) renderPart2Item();
  pendingDraft = null;
}

// ============================================================
// Study start
// ============================================================
function startStudy(){
  participant = $("participantId").value.trim();
  if(!participant){ alert(t("alertParticipant")); return; }
  if(!$("consent").checked){ alert(t("alertConsent")); return; }

  // Randomly sample 10 of the Part 1 items (order randomized) once for this session.
  part1Order = seededShuffle(STABILITY_ITEMS.map((_,i)=>i)).slice(0, 10);
  part1Current = 0;
  part1Answers = {};

  $("welcome").classList.add("hidden");
  $("part1").classList.remove("hidden");
  renderPart1Item();
}

// ============================================================
// PART 1 — Stability evaluation (single video, independent rating)
// ============================================================
function renderPart1Item(){
  const item = STABILITY_ITEMS[part1Order[part1Current]];
  $("promptText1").textContent = item.prompt;
  renderMedia($("media1"), item.media, item.mediaType);

  const saved = { ...(part1Answers[item.id] || {}), ...(pendingDraft || {}) };
  renderScaleQuestions($("questions1"), DIMENSIONS_STABILITY, RATING_SCALE[lang], item, saved);

  $("prevBtn1").disabled = part1Current === 0;
  $("prevBtn1").textContent = t("prevBtn");
  $("nextBtn1").textContent = part1Current === part1Order.length-1 ? t("finishPart1Btn") : t("nextBtn");
  updateProgress(t("part1Progress"), part1Current+1, part1Order.length);
}

function savePart1Current(){
  const item = STABILITY_ITEMS[part1Order[part1Current]];
  const row = part1Answers[item.id] || {};
  let complete = true;
  DIMENSIONS_STABILITY.forEach(dim=>{
    const checked = document.querySelector(`input[name="${dim.key}"]:checked`);
    if(!checked) complete = false;
    else row[dim.key] = checked.value;
  });
  if(!complete){
    alert(t("alertIncomplete"));
    return false;
  }
  row.item_id = item.id;
  row.case_id = item.caseId;
  row.prompt = item.prompt;
  row.method = item.method;
  row.presentation_order = part1Current + 1;
  row.timestamp = new Date().toISOString();
  part1Answers[item.id] = row;
  persist();
  return true;
}

function nextPart1(){
  if(!savePart1Current()) return;
  if(part1Current === part1Order.length-1){
    $("part1").classList.add("hidden");
    $("transition").classList.remove("hidden");
    updateProgress(t("part1Progress"), part1Order.length, part1Order.length);
    return;
  }
  part1Current++;
  renderPart1Item();
  window.scrollTo({top:0,behavior:"smooth"});
}
function prevPart1(){
  savePart1Current();
  if(part1Current>0){ part1Current--; renderPart1Item(); window.scrollTo({top:0,behavior:"smooth"}); }
}

// ============================================================
// Transition -> PART 2
// ============================================================
function startPart2(){
  // Randomize A/B side assignment once per participant, stable thereafter.
  part2Assignment = {};
  STUDY_ITEMS.forEach(item=>{
    part2Assignment[item.id] = Math.random() < 0.5; // true = swapped (Result A shows item.B)
  });
  part2Order = seededShuffle(STUDY_ITEMS.map((_,i)=>i));
  part2Current = 0;
  part2Answers = {};
  persist();

  $("transition").classList.add("hidden");
  $("part2").classList.remove("hidden");
  renderPart2Item();
}

// ============================================================
// PART 2 — Pairwise comparison (existing behavior + A/B randomization)
// ============================================================
function getPart2Display(item){
  const swapped = !!part2Assignment[item.id];
  return {
    swapped,
    mediaA: swapped ? item.B : item.A,
    mediaB: swapped ? item.A : item.B,
    methodA: swapped ? item.methodB : item.methodA,
    methodB: swapped ? item.methodA : item.methodB
  };
}

function renderPart2Item(){
  const item = STUDY_ITEMS[part2Order[part2Current]];
  const disp = getPart2Display(item);

  $("promptText2").textContent = item.prompt;
  $("tagA").textContent = "";
  $("tagB").textContent = "";
  renderMedia($("mediaA"), disp.mediaA, item.mediaType);
  renderMedia($("mediaB"), disp.mediaB, item.mediaType);

  const saved = { ...(part2Answers[item.id] || {}), ...(pendingDraft || {}) };
  renderScaleQuestions($("questions2"), DIMENSIONS_PAIRWISE, PREFERENCE_SCALE[lang], item, saved);

  $("prevBtn2").disabled = part2Current === 0;
  $("prevBtn2").textContent = t("prevBtn");
  $("nextBtn2").textContent = part2Current === part2Order.length-1 ? t("submitBtn") : t("nextBtn");
  updateProgress(t("part2Progress"), part2Current+1, part2Order.length);
}

function savePart2Current(){
  const item = STUDY_ITEMS[part2Order[part2Current]];
  const disp = getPart2Display(item);
  const row = part2Answers[item.id] || {};
  let complete = true;
  DIMENSIONS_PAIRWISE.forEach(dim=>{
    const checked = document.querySelector(`input[name="${dim.key}"]:checked`);
    if(!checked) complete = false;
    else row[dim.key] = checked.value;
  });
  if(!complete){
    alert(t("alertIncomplete"));
    return false;
  }
  row.item_id = item.id;
  row.prompt = item.prompt;
  row.method_A = disp.methodA;
  row.method_B = disp.methodB;
  row.presentation_order = disp.swapped ? "swapped" : "unswapped";
  row.timestamp = new Date().toISOString();
  part2Answers[item.id] = row;
  persist();
  return true;
}

function nextPart2(){
  if(!savePart2Current()) return;
  if(part2Current === part2Order.length-1){
    $("part2").classList.add("hidden");
    $("finish").classList.remove("hidden");
    updateProgress(t("part2Progress"), part2Order.length, part2Order.length);
    return;
  }
  part2Current++;
  renderPart2Item();
  window.scrollTo({top:0,behavior:"smooth"});
}
function prevPart2(){
  savePart2Current();
  if(part2Current>0){ part2Current--; renderPart2Item(); window.scrollTo({top:0,behavior:"smooth"}); }
}

// ============================================================
// CSV export (both parts, single file)
// ============================================================
function downloadCSV(){
  const headers = [
    "participant_id","part","item_id","case_id","prompt","method",
    "method_A","method_B","presentation_order",
    "prompt_alignment","visual_quality","geometry_consistency",
    "overall_quality","overall_preference","timestamp"
  ];

  const rows = [];
  Object.values(part1Answers).forEach(r=> rows.push([
    participant,"stability",r.item_id,r.case_id,r.prompt,r.method,
    "","",r.presentation_order,
    r.prompt_alignment,r.visual_quality,r.geometry_consistency,
    r.overall_quality,"",r.timestamp
  ]));
  Object.values(part2Answers).forEach(r=> rows.push([
    participant,"pairwise",r.item_id,"",r.prompt,"",
    r.method_A,r.method_B,r.presentation_order,
    r.prompt_alignment,r.visual_quality,r.geometry_consistency,
    "",r.overall_preference,r.timestamp
  ]));

  const esc = x => `"${String(x??"").replaceAll('"','""')}"`;
  const csv = [headers.join(","),...rows.map(r=>r.map(esc).join(","))].join("\n");
  const blob = new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download=`ETCO_userstudy_${participant}.csv`; a.click();
  URL.revokeObjectURL(url);
}
function restart(){
  location.reload();
}

$("startBtn").addEventListener("click",startStudy);
$("nextBtn1").addEventListener("click",nextPart1);
$("prevBtn1").addEventListener("click",prevPart1);
$("continueBtn").addEventListener("click",startPart2);
$("nextBtn2").addEventListener("click",nextPart2);
$("prevBtn2").addEventListener("click",prevPart2);
$("downloadBtn").addEventListener("click",downloadCSV);
$("restartBtn").addEventListener("click",restart);
$("langToggle").addEventListener("click",toggleLanguage);

applyStaticText();
