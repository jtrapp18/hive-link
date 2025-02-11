import{q as a,s as i,t as c,j as e,L as u,m as d,p as m}from"./index-BO8aIUKG.js";import{useState as p,useEffect as x}from"react";import"react-dom";const f=a.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;

    li, p {
        color: gray;
    }

    ol {
        width: 100%;
        column-count: 3;
        column-gap: space-between;  
    }

    small {
        font-style: italic;
    }
`,T=()=>{const[t,n]=p(null);if(x(()=>{console.log("logging study results..."),i("exp_study").then(s=>{const o=c(s);n(o),console.log(o)})},[]),!t)return e.jsx(u,{});const{runDate:r,testMetrics:g,testResults:l}=t;return e.jsxs(f,{children:[e.jsx("p",{children:e.jsx("strong",{children:"Top impacts on honey production "})}),e.jsx("ol",{children:l.map(s=>e.jsx("li",{children:d(s.Feature)},s.Feature))}),e.jsx("p",{children:e.jsxs("small",{children:["Based on MLP Regressor user experience study run ",m(r)]})})]})};export{T as default};
