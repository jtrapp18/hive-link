import{q as P,r as w,W as H,u as v,j as e,H as D,m as g,E as I,U as q,n as E,C as L}from"./index-ButMNUXy.js";const u=P.article`
    width: 100%;

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

    .inspection-heading {
        align-items: start;
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
            flex-direction: ${s=>s.isMobile?"column":"row"};

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
            
            .recommendation {
                border-bottom: .5px dashed red;
            }

            &.at-risk {
                p {
                    color: red;
                }
            }
        }
    }
`,R=({hive:s,prediction:x})=>{const{isMobile:m}=w.useContext(H),{predictionData:j}=v(),{honeyPulls:i}=s;if(i.length===0)return e.jsxs(u,{children:["No honey pull rounds have been recorded for Hive ",s.id]});const n=[...i].sort((r,a)=>new Date(r.datePulled)-new Date(a.datePulled))[0];if(n.inspections.length===0)return e.jsxs(u,{children:["No inspections have been logged for Hive ",s.id]});const y=[...n.inspections].sort((r,a)=>new Date(r.dateChecked)-new Date(a.dateChecked))[0],{dateChecked:N,hasTwistedLarvae:c,hasChalkbrood:d,varroaMiteCount:t,bias:l,hasEggs:h,hasLarvae:p}=y,f=c||d||t>3||l<3||!h||!p,{modelRunDate:C,predRunDate:b}=j,k=i.reduce((r,a)=>a.inspections.length+r,0);return e.jsxs(u,{isMobile:m,children:[e.jsxs("div",{className:"hive-summary",children:[e.jsxs("section",{children:[e.jsxs("span",{children:[e.jsx("strong",{children:"No. Honey Pulls: "}),i.length]}),e.jsx("h3",{children:"Latest Round"}),e.jsx("div",{className:"inspection-row",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Start Date: "}),n.dateReset]})}),e.jsx("div",{className:"inspection-row",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Pull Date: "}),n.datePulled?n.datePulled:"n/a"]})}),e.jsx("div",{className:"inspection-row",children:n.weight?e.jsxs("p",{children:[e.jsx("strong",{children:"Honey Pull Weight (lbs): "}),n.weight.toFixed(4)]}):e.jsxs("p",{className:"honey-prediction",children:[e.jsx("strong",{children:"Predicted Honey Pull Weight (lbs)*: "}),x.toFixed(4)]})})]}),e.jsx(D,{...s})]}),!n.weight&&e.jsx("small",{children:`*Based on MLP Regressor user experience study run ${g(C)}, inspection data as of ${g(b)}, and pull date of today`}),e.jsx("hr",{}),e.jsxs("section",{children:[e.jsxs("span",{children:[e.jsx("strong",{children:"No. Inspections: "}),k]}),e.jsxs("div",{className:"inspection-heading",children:[e.jsx("h3",{children:"Latest Inspection"}),f&&e.jsx(I,{children:"At risk based on latest inspection"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Date: "}),N]}),e.jsxs("div",{className:c?"at-risk inspection-row":"inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Twisted Larvae Seen: "}),c?"Yes":"No"]}),c&&e.jsx("p",{className:"recommendation",children:"⚠️ Possible European Foulbrood or viral infection. Inspect further and consider treatment."})]}),e.jsxs("div",{className:d?"at-risk inspection-row":"inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Chalkbrood Seen: "}),d?"Yes":"No"]}),d&&e.jsx("p",{className:"recommendation",children:"⚠️ Chalkbrood detected. Improve hive ventilation and consider requeening if persistent."})]}),e.jsxs("div",{className:t<3?"inspection-row":"at-risk inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Varroa Mite Count: "}),t]}),t>3&&e.jsx("p",{className:"recommendation",children:"⚠️ High mite count! Consider immediate treatment to prevent colony collapse."}),t>0&&t<=3&&e.jsx("p",{children:"🔍 Monitor mite levels closely and prepare for treatment if they increase."})]}),e.jsxs("div",{className:l>=3?"inspection-row":"at-risk inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Brood in All Stages Count: "}),l]}),l<3&&e.jsx("p",{className:"recommendation",children:"⚠️ Low brood count. Check queen presence and colony health."})]}),e.jsxs("div",{className:h?"inspection-row":"at-risk inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Eggs Seen: "}),h?"Yes":"No"]}),h?e.jsx("p",{className:"recommendation",children:"✅ Eggs confirm the queen was active within the last 3 days."}):e.jsx("p",{className:"recommendation",children:"⚠️ No eggs detected. Check for queen presence or signs of a failing queen."})]}),e.jsxs("div",{className:p?"inspection-row":"at-risk inspection-row",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Larvae Seen: "}),p?"Yes":"No"]}),!p&&e.jsx("p",{className:"recommendation",children:"⚠️ No larvae detected. If no eggs are seen either, consider requeening."})]})]})]})},W=()=>{const{user:s}=w.useContext(q),{hives:x,predictionData:m}=v(),j=x.filter(o=>o.userId===s.id),i=m.predicted;return e.jsxs(E,{children:[e.jsx("h2",{children:"Recommendations for My Hives"}),e.jsx(L,{children:j.map(o=>e.jsx(R,{hive:o,prediction:i[o.id]},o.id))})]})};export{W as default};
