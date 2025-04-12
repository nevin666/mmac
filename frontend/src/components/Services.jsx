import React from 'react';
import './Services.css';

const services = [
  {
    title: 'Symptom Checker',
    desc: 'Get instant AI‑powered insights into common symptoms.',
  },
  {
    title: 'Period Tracker',
    desc: 'Log your cycle, predict periods, and get reminders.',
  },
  {
    title: 'Remedies Library',
    desc: 'Browse home remedies with videos, steps, and precautions.',
  },
  {
    title: 'Self‑Care Challenges',
    desc: 'Daily prompts to build healthy habits.',
  },
  {
    title: 'Interactive Quizzes',
    desc: 'Test your knowledge on health topics and learn as you go.',
  },
];

export default function Services() {
  return (
    <section className="services-page">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.title} className="service-card">
            <h2>{s.title}</h2>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
