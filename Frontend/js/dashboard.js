/* ===== top‑bar content ===== */
document.getElementById("todayDate").textContent = new Date().toDateString();
function openProfile(){ showAlert("Profile","Profile page coming soon"); }

/* ===== sidebar navigation ===== */
const navLinks=document.querySelectorAll(".nav-link");
const sections=[...document.querySelectorAll("[data-section-block]")];
navLinks.forEach(link=>{
  link.onclick=e=>{
    e.preventDefault();
    const target=link.dataset.section;
    sections.forEach(sec=>{
      sec.classList.toggle("hidden",sec.dataset.sectionBlock!==target);
    });
    navLinks.forEach(l=>l.classList.toggle("active",l===link));
    if(target==="progress") updateProgress();  // refresh %
  };
});

/* ===== timetable (static demo rows) ===== */
const tb=document.getElementById("timetableBody");
["08:00","10:00","12:00","14:00","16:00","18:00"].forEach(t=>{
  const tr=document.createElement("tr");
  tr.innerHTML=`<td>${t}</td>`+"<td></td>".repeat(7);
  tb.appendChild(tr);
});

/* ===== task manager ===== */
let tasks=[];
const input=document.getElementById("taskInput"),
      list=document.getElementById("taskList"),
      summary=document.getElementById("taskSummary");
function addTask(){
  const txt=input.value.trim(); if(!txt) return;
  tasks.push({txt,done:false}); input.value=""; renderTasks();
}
function clearTasks(){ tasks=[]; renderTasks(); }
function toggleTask(i){ tasks[i].done=!tasks[i].done; renderTasks(); }
function renderTasks(){
  list.innerHTML="";
  tasks.forEach((t,i)=>{
    const li=document.createElement("li");
    li.innerHTML=`<label><input type="checkbox" ${t.done?"checked":""}
                   onchange="toggleTask(${i})"> ${t.txt}</label>`;
    list.appendChild(li);
  });
  const done=tasks.filter(t=>t.done).length;
  summary.textContent=`${tasks.length} tasks (${done} completed)`;
  updateProgress();
}

/* ===== progress bar ===== */
function updateProgress(){
  const done=tasks.filter(t=>t.done).length;
  const pct=tasks.length?Math.round((done/tasks.length)*100):0;
  document.getElementById("progressFill").style.width=pct+"%";
  document.getElementById("progressText").textContent=pct+" %";
}

/* ===== reminders ===== */
let reminders=[];
function addReminder(){
  const text=document.getElementById("reminderInput").value.trim();
  if(!text) return;
  reminders.push(text); document.getElementById("reminderInput").value="";
  renderReminders();
}
function renderReminders(){
  const ul=document.getElementById("reminderList");
  ul.innerHTML=""; reminders.forEach(r=>{
    const li=document.createElement("li"); li.textContent=r; ul.appendChild(li);
  });
}

/* ===== calendar ===== */
let events=[];
function addCalendarEvent(){
  const date=document.getElementById("calDate").value,
        txt=document.getElementById("calText").value.trim();
  if(date && txt){ events.push({date,txt}); renderCalendar(); }
}
function renderCalendar(){
  const ul=document.getElementById("calendarEventList");
  ul.innerHTML=""; events.forEach(e=>{
    const li=document.createElement("li");
    li.textContent=`${e.date} — ${e.txt}`;
    ul.appendChild(li);
  });
}

/* ===== mini focus timer ===== */
let fwSec=25*60,fwInt=null;
const fwTime=document.getElementById("fwTime"),fwBtn=document.getElementById("fwStart");
fwBtn.onclick=()=>{
  if(fwInt){clearInterval(fwInt);fwInt=null;fwBtn.innerHTML='<i class="fas fa-play"></i>';return;}
  fwBtn.innerHTML='<i class="fas fa-pause"></i>';
  fwInt=setInterval(()=>{
    if(--fwSec<=0){clearInterval(fwInt);fwInt=null;fwSec=25*60;}
    const m=Math.floor(fwSec/60).toString().padStart(2,"0"),
          s=(fwSec%60).toString().padStart(2,"0");
    fwTime.textContent=`${m}:${s}`;
  },1000);
};

/* ===== modal alert ===== */
function showAlert(title,msg){
  document.getElementById("alertTitle").textContent=title;
  document.getElementById("alertMsg").textContent=msg;
  document.getElementById("alertModal").classList.remove("hidden");
}
function closeAlert(){ document.getElementById("alertModal").classList.add("hidden"); }
