import{q as c,r as o,o as d,s as u,j as e,k as m,m as x}from"./index-ButMNUXy.js";import{C as p}from"./ClipLoader-DIeTHcs1.js";const n=c.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;

    li, p {
        color: gray;
    }

    li {
        column-width: 200px;
        margin: 0% 1%;
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
`,j=()=>{const[s,r]=o.useState(null);if(o.useEffect(()=>{console.log("logging study results..."),d("exp_study").then(t=>{const a=u(t);r(a)})},[]),!s)return e.jsx(n,{children:e.jsx(p,{color:"var(--bright-blue)"})});const{runDate:l,testMetrics:h,testResults:i}=s;return e.jsxs(n,{children:[e.jsx("p",{children:e.jsx("strong",{children:"Top impacts on honey production "})}),e.jsx("ol",{children:i.map(t=>e.jsx("li",{children:m(t.Feature)},t.Feature))}),e.jsx("p",{children:e.jsxs("small",{children:["Based on MLP Regressor user experience study run ",x(l)]})})]})};export{j as default};
