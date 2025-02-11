import{q as c,r as o,t as i,v as u,j as e,L as d,m as p,p as m}from"./index-fJhkIDAs.js";const x=c.div`
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
`,h=()=>{const[t,r]=o.useState(null);if(o.useEffect(()=>{console.log("logging study results..."),i("exp_study").then(s=>{const n=u(s);r(n),console.log(n)})},[]),!t)return e.jsx(d,{});const{runDate:a,testMetrics:f,testResults:l}=t;return e.jsxs(x,{children:[e.jsx("p",{children:e.jsx("strong",{children:"Top impacts on honey production "})}),e.jsx("ol",{children:l.map(s=>e.jsx("li",{children:p(s.Feature)},s.Feature))}),e.jsx("p",{children:e.jsxs("small",{children:["Based on MLP Regressor user experience study run ",m(a)]})})]})};export{h as default};
