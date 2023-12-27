


import React from 'react';

const TeamMemberWithImage = ({ name, Uel_ID, imageUrl, description, specialClass }) => {
  return (
    <div className={`team-member ${specialClass}`}>
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="member-details">
        <h3>{name}</h3>
        <p className="member-description">{description}</p>
        <p className="member-id">{Uel_ID}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const teamMembers = [
    { id: 1, name: 'Sonil Mahato', Uel_ID: 'u2417206', imageUrl: '/images/1.jpg', description: 'Backend Development Assistant', specialClass: ' highlighted' },
    { id: 2, name: 'Resham Adhikari', Uel_ID: 'u2428505', imageUrl: '/images/222.jpg', description: 'Senior Backend Developer', specialClass: 'highlighted' },
    { id: 3, name: 'Saugat Tamang', Uel_ID: 'u2437412', imageUrl: '/images/u2437412.jpg', description: 'Full-Stack Development Coordinator (Frontend & Backend )', specialClass: 'highlighted' },
    { id: 4, name: 'Ramesh Bhatt', Uel_ID: 'u2425951', imageUrl: '/images/4.jpg', description: 'Frontend Development Assistant', specialClass: 'highlighted' },
    { id: 5, name: 'Aashutosh Prasad Yadav', Uel_ID: 'u24533025', imageUrl: '/images/5.jpg', description: 'Junior Backend Developer', specialClass: 'highlighted' },
  ];

  return (
    <div className="home">
      <h1>Welcome to Our Football League</h1>
      <h2>CN5006 (Web and Mobile Application Development)  Coursework_FootBall </h2>
      <h3>Team Members:</h3>
      <div className="team-members">
        {teamMembers.map((member) => (
          <TeamMemberWithImage
            key={member.id}
            name={member.name}
            Uel_ID={member.Uel_ID}
            imageUrl={member.imageUrl}
            description={member.description}
            specialClass={member.specialClass}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
