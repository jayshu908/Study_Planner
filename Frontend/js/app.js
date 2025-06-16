/* ---------- DATE HEADING ---------- */
document.getElementById('todayHeading').insertAdjacentHTML(
  'beforeend',
  `<span style="font-size:.9rem;color:gray;margin-left:.4rem">(${new Date().toDateString()})</span>`
);

/* ---------- SIDEBAR NAV ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = {
  home:       document.getElementById('homeSection'),
  calendar:   document.getElementById('calendarSection'),
  progress:   document.getElementById('progressSection'),
  reminders:  document.getElementById('remindersSection'),
  settings:   document.getElementById('settingsSection'),
};
navLinks.forEach(l=>{
  l.addEventListener('click',e=>{
    e.preventDefault();
    const id = l.dataset.section;
    Object.values(sections).forEach(s=>s.hidden=true);
    sections[id].hidden=false;
    navLinks.forEach(n=>n.classList.remove('active'));
    l.classList.add('active');
    if(id==='progress') updateProgressBar();
  });
});

/* ---------- WEEKLY TIMETABLE ---------- */
const timetableBody = document.getElementById('timetableBody');
['08:00','10:00','12:00','14:00','16:00'].forEach(time=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${time}</td>${'<td></td>'.repeat(7)}`;
  timetableBody.appendChild(tr);
});

/* ---------- TASKS ---------- */
const taskInput=document.getElementById('taskInput');
const taskList =document.getElementById('taskList');
const tasksSummary=document.getElementById('tasksSummary');
let tasks=[];
function addTask(){
  const txt=taskInput.value.trim(); if(!txt)return;
  tasks.push({text:txt,done:false}); taskInput.value=''; renderTasks();
}
function toggle(i){tasks[i].done=!tasks[i].done; renderTasks();}
function clearTasks(){tasks=[]; renderTasks();}
function renderTasks(){
  taskList.innerHTML='';
  tasks.forEach((t,i)=>{
    const li=document.createElement('li');
    li.innerHTML=`<label><input type="checkbox" ${t.done?'checked':''} onchange="toggle(${i})"> ${t.text}</label>`;
    taskList.appendChild(li);
  });
  const done=tasks.filter(t=>t.done).length;
  tasksSummary.textContent=`${tasks.length} tasks (${done} completed)`;
  updateProgressBar();
}
window.addTask=addTask; window.toggle=toggle; window.clearTasks=clearTasks;

/* ---------- MINI TIMER ---------- */
let sec=1500, tick=null;
const widgetTime=document.getElementById('widgetTime');
const widgetBtn =document.getElementById('widgetBtn');
function fmt(s){return String(s).padStart(2,'0');}
function drawTime(){widgetTime.textContent=`${fmt(Math.floor(sec/60))}:${fmt(sec%60)}`;}
widgetBtn.onclick=()=>{
  if(tick){clearInterval(tick); tick=null; widgetBtn.innerHTML='<i class="fas fa-play"></i>'; return;}
  widgetBtn.innerHTML='<i class="fas fa-pause"></i>';
  tick=setInterval(()=>{
    if(--sec<0){clearInterval(tick); tick=null; sec=1500;}
    drawTime();
  },1000);
};
drawTime();

/* ---------- CALENDAR EVENTS ---------- */
const calList=document.getElementById('calList'); let calEvents=[];
window.addCalEvent=function(){
  const d=document.getElementById('calDate').value,
        t=document.getElementById('calText').value.trim();
  if(d && t){calEvents.push({d,t}); document.getElementById('calText').value=''; renderCal(); }
};
function renderCal(){
  calList.innerHTML=''; calEvents.forEach(e=>{
    const li=document.createElement('li'); li.textContent=`${e.d} — ${e.t}`; calList.appendChild(li);
  });
}

/* ---------- REMINDERS ---------- */
const remList=document.getElementById('remList'); let reminders=[];
window.addReminder=function(){
  const txt=document.getElementById('remInput').value.trim();
  if(!txt)return; reminders.push(txt); document.getElementById('remInput').value=''; renderRem();
};
function renderRem(){remList.innerHTML=''; reminders.forEach(r=>{const li=document.createElement('li'); li.textContent=r; remList.appendChild(li);});}

/* ---------- PROGRESS BAR ---------- */
function updateProgressBar(){
  const done=tasks.filter(t=>t.done).length,
        pct = tasks.length? Math.round((done/tasks.length)*100):0;
  document.getElementById('barFill').style.width=pct+'%';
}

/* ---------- DARK MODE DEMO ---------- */
document.getElementById('darkToggle').addEventListener('change',e=>{
  document.documentElement.style.filter=e.target.checked?'invert(1) hue-rotate(180deg)':'none';
});
