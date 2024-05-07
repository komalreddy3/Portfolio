import React from 'react';
import "./stats.css"
function Stats() {
    return (
        <section className="stats section" id="stats">
            <h2 className="section__title"> Github Stats </h2>
            <span className="section__subtitle">My Github Activity Overview</span>
            <div className="stats__container container grid">
                <img
                    src="https://github-contributor-stats.vercel.app/api?username=komalreddy3&combine_all_yearly_contributions=true&limit=5&theme=graywhite&hide_border=true"
                    alt="GitHub Stats"/>
                <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=komalreddy3&hide=html&hide_title=true&hide_border=true&layout=compact&langs_count=6&exclude_repo=comp426,Redventures-Movie-Quotes&theme=graywhite"
                    alt="GitHub Stats"/>
                <img
                    src="https://github-readme-stats-sigma-five.vercel.app/api?username=komalreddy3&hide_title=true&hide_border=true&show_icons=true&include_all_commits=true&count_private=true&line_height=21&theme=graywhite"
                    alt="GitHub Stats"/>

            </div>
            <div className="hide__Mobile container grid">
                <img
                    src="https://github-readme-activity-graph.vercel.app/graph?username=komalreddy3&theme=react"
                    alt="GitHub Stats"/>
            </div>
        </section>
    );
}

export default Stats;
