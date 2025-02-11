import{q as c,r as n,s as i,t as u,j as e,L as d,m as p,o as m}from"./index-CX9BIEl1.js";const x=c.div`
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
`,h=()=>{const[t,r]=n.useState(null);if(n.useEffect(()=>{console.log("logging study results..."),i("exp_study").then(s=>{const o=u(s);r(o),console.log(o)})},[]),!t)return e.jsx(d,{});const{runDate:a,testMetrics:f,testResults:l}=t;return e.jsxs(x,{children:[e.jsx("p",{children:e.jsx("strong",{children:"Top impacts on honey production "})}),e.jsx("ol",{children:l.map(s=>e.jsx("li",{children:p(s.Feature)},s.Feature))}),e.jsx("p",{children:e.jsxs("small",{children:["Based on MLP Regressor user experience study run ",m(a)]})})]})};export{h as default};
