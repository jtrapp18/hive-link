import{q as i,r as o,o as c,s as u,j as e,k as d,m}from"./index-C9x1A7WP.js";import{C as p}from"./ClipLoader-CPx5lAX6.js";const x=i.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    li, p {
        color: gray;
    }

    ol {
        width: fit-content;
        column-count: 2;

        @media (min-width: 768px) {
        column-count: 3;
        }
    }

    small {
        font-style: italic;
    }
`,j=()=>{const[t,r]=o.useState(null);if(o.useEffect(()=>{console.log("logging study results..."),c("exp_study").then(s=>{const a=u(s);r(a)})},[]),!t)return e.jsx(p,{color:"var(--bright-blue)"});const{runDate:n,testMetrics:f,testResults:l}=t;return e.jsxs(x,{children:[e.jsx("p",{children:e.jsx("strong",{children:"Top impacts on honey production "})}),e.jsx("ol",{children:l.map(s=>e.jsx("li",{children:d(s.Feature)},s.Feature))}),e.jsx("p",{children:e.jsxs("small",{children:["Based on MLP Regressor user experience study run ",m(n)]})})]})};export{j as default};
