import{q as N,u as g,j as e,H as k,p as u,E as b,r as P,U as D,s as H,C as I}from"./index-fJhkIDAs.js";const q=N.article`

    border-bottom: 3px double var(--honey);
    padding: 3%;
    background: black;

    small {
        color: gray;
    }

    .hive-summary {
        display: flex;
        align-items: end;
        justify-content: space-between;

        .hive-card {
            zoom: .5;
        }
    }
    
    section {

        > span {
            color: gray;
        }

        div {
            display: flex;
            justify-content: space-between;        
        }

        .inspection-row {

            p {
                margin: 0;
                color: var(--yellow);

                strong {
                    color: white;
                }

                &.honey-prediction {
                    color: var(--yellow);

                    strong {
                        color: rgb(40, 203, 215);
                    }
                }
            }

            &.at-risk {
                p {
                    color: red;
                }
            }
        }
    }
`,E=({hive:o,prediction:p})=>{const{predictionData:x}=g(),{honeyPulls:t}=o,s=[...t].sort((i,r)=>new Date(i.datePulled)-new Date(r.datePulled))[0],m=[...s.inspections].sort((i,r)=>new Date(i.dateChecked)-new Date(r.dateChecked))[0],{dateChecked:w,hasTwistedLarvae:c,hasChalkbrood:a,varroaMiteCount:n,bias:d,hasEggs:l,hasLarvae:h}=m,v=c||a||n>3||d<3||!l||!h,{modelRunDate:y,predRunDate:C}=x,f=t.reduce((i,r)=>r.inspections.length+i,0);return e.jsxs(q,{children:[e.jsxs("div",{className:"hive-summary",children:[e.jsxs("section",{children:[e.jsxs("span",{children:[e.jsx("strong",{children:"No. Honey Pulls: "}),t.length]}),e.jsx("h3",{children:"Latest Round"}),e.jsx("div",{className:"inspection-row",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Start Date: "}),s.dateReset]})}),e.jsx("div",{className:"inspection-row",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Pull Date: "}),s.datePulled?s.datePulled:"n/a"]})}),e.jsx("div",{className:"inspection-row",children:s.weight?e.jsxs("p",{children:[e.jsx("strong",{children:"Honey Pull Weight (lbs): "}),s.weight.toFixed(4)]}):e.jsxs("p",{className:"honey-prediction",children:[e.jsx("strong",{children:"Predicted Honey Pull Weight (lbs)*: "}),p.toFixed(4)]})})]}),e.jsx(k,{...o})]}),!s.weight&&e.jsx("small",{children:`*Based on MLP Regressor user experience study run ${u(y)}, inspection data as of ${u(C)}, and pull date of today`}),e.jsx("hr",{}),e.jsxs("section",{children:[e.jsxs("span",{children:[e.jsx("strong",{children:"No. Inspections: "}),f]}),e.jsxs("div",{children:[e.jsx("h3",{children:"Latest Inspection"}),v&&e.jsx(b,{children:"At risk based on latest inspection"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Date: "}),w]}),e.jsxs("div",{className:c?"at-risk inspection-row":"inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Twisted Larvae Seen: "}),c?"Yes":"No"]}),c&&e.jsx("p",{children:"⚠️ Possible European Foulbrood or viral infection. Inspect further and consider treatment."})]}),e.jsxs("div",{className:a?"at-risk inspection-row":"inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Chalkbrood Seen: "}),a?"Yes":"No"]}),a&&e.jsx("p",{children:"⚠️ Chalkbrood detected. Improve hive ventilation and consider requeening if persistent."})]}),e.jsxs("div",{className:n<3?"inspection-row":"at-risk inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Varroa Mite Count: "}),n]}),n>3&&e.jsx("p",{className:"recommendation",children:"⚠️ High mite count! Consider immediate treatment to prevent colony collapse."}),n>0&&n<=3&&e.jsx("p",{children:"🔍 Monitor mite levels closely and prepare for treatment if they increase."})]}),e.jsxs("div",{className:d>=3?"inspection-row":"at-risk inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Brood in All Stages Count: "}),d]}),d<3&&e.jsx("p",{children:"⚠️ Low brood count. Check queen presence and colony health."})]}),e.jsxs("div",{className:l?"inspection-row":"at-risk inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Eggs Seen: "}),l?"Yes":"No"]}),l?e.jsx("p",{children:"✅ Eggs confirm the queen was active within the last 3 days."}):e.jsx("p",{children:"⚠️ No eggs detected. Check for queen presence or signs of a failing queen."})]}),e.jsxs("div",{className:h?"inspection-row":"at-risk inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Larvae Seen: "}),h?"Yes":"No"]}),!h&&e.jsx("p",{children:"⚠️ No larvae detected. If no eggs are seen either, consider requeening."})]})]})]})},S=()=>{const{user:o}=P.useContext(D),{hives:p,predictionData:x}=g(),t=p.filter(s=>s.userId===o.id),j=x.predicted;return e.jsxs(H,{children:[e.jsx("h2",{children:"Recommendations for My Hives"}),e.jsx(I,{children:t.map(s=>e.jsx(E,{hive:s,prediction:j[s.id]},s.id))})]})};export{S as default};
