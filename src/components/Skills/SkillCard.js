// SkillCard.jsx
import './SkillCard.css';

export default function SkillCard({ title, items }) {
  return (
    <div className="skill-card">
      <h3>{title}</h3>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
