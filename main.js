let expr = "";
const expEl = document.getElementById('expression');
const resEl = document.getElementById('result');

function append(val){
  if(resEl.innerText === "0" && !"+-*/.%".includes(val)) expr = "";
  expr += val;
  expEl.innerText = expr.replace(/\*/g,'×').replace(/\//g,'÷');
  try{
    let safe = expr.replace(/%/g,'/100');
    let ans = Function('"use strict"; return ('+safe+')')();
    if(ans !== undefined) resEl.innerText = ans;
  }catch{}
}
function clearAll(){ expr=""; expEl.innerText=""; resEl.innerText="0"; }
function deleteLast(){ expr=expr.slice(0,-1); expEl.innerText=expr; if(!expr) resEl.innerText="0"; }
function calculate(){
  try{
    let safe = expr.replace(/%/g,'/100');
    expr = Function('"use strict"; return ('+safe+')')().toString();
    resEl.innerText = expr; expEl.innerText = "";
  }catch{ resEl.innerText = "Error"; }
}
document.addEventListener('keydown', e=>{
  if("0123456789+-*/.%".includes(e.key)) append(e.key);
  if(e.key==="Enter") calculate();
  if(e.key==="Backspace") deleteLast();
  if(e.key==="Escape") clearAll();
});