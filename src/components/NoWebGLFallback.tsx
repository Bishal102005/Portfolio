import React from 'react';
import { ME, INTRO, PROJ, SK, TOOLS, TL } from '@/lib/constants/portfolioData';

export const NoWebGLFallback: React.FC = () => {
  return (
    <main className="sr" id="sr">
      <h1>
        {ME.name}: {ME.role}
      </h1>
      {INTRO.map((t, i) => (
        <p key={i}>{t}</p>
      ))}

      <h2>Selected work</h2>
      {PROJ.map((p) => (
        <article key={p.t}>
          <h3>
            {p.t}: {p.sub} ({p.yr})
          </h3>
          <p><strong>Role:</strong> {p.role}</p>
          <p><strong>Challenge:</strong> {p.ch}</p>
          <p><strong>Approach:</strong> {p.ap}</p>
          <p><strong>Outcome:</strong> {p.out}</p>
          <p>
            <strong>Stack:</strong> {p.stack.join(', ')}
          </p>
        </article>
      ))}

      <h2>Skills</h2>
      <ul>
        {SK.map(([skill]) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <p>
        <strong>Tools:</strong> {TOOLS.join(', ')}
      </p>

      <h2>Journey</h2>
      {TL.map(([period, title, company, desc], i) => (
        <p key={i}>
          <b>{title}</b>, {company} ({period}). {desc}
        </p>
      ))}

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${ME.email}`}>{ME.email}</a>
      </p>
      {ME.links.map(([label, url]) => (
        <p key={label}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        </p>
      ))}
    </main>
  );
};
