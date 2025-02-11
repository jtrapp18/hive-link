import{q as c,r as o,v as i,w as u,j as e,L as d,n as p,s as x}from"./index-CfZXj0FF.js";const m=c.div`
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
`,h=()=>{const[t,r]=o.useState(null);if(o.useEffect(()=>{console.log("logging study results..."),i("exp_study").then(s=>{const n=u(s);r(n),console.log(n)})},[]),!t)return e.jsx(d,{});const{runDate:a,testMetrics:f,testResults:l}=t;return e.jsxs(m,{children:[e.jsx("p",{children:e.jsx("strong",{children:"Top impacts on honey production "})}),e.jsx("ol",{children:l.map(s=>e.jsx("li",{children:p(s.Feature)},s.Feature))}),e.jsx("p",{children:e.jsxs("small",{children:["Based on MLP Regressor user experience study run ",x(a)]})})]})};export{h as default};
