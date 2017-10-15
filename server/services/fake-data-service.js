
const fakeNames = ['John Doe', 'Kaiser Soze', 'Christina Jones', 'Lizette Chavez', 'Daniel Bloomberg', 'Christian L. Hoier', 'Joe Q. Watson', 'Sherlock Holmes', 'Katie Kessler', 'John Quincy', 'Rubert Hanson'];

const fakeGeneralDetails = [
    {
        jobTitle: 'Full stack auto mechanic',
        aboutYou: 'I love taking apart cars, building them and everything in between. Born with a screwdriver in my hand, I\'m always super motivated to learn new things and try them at work.'
    },
    {
        jobTitle: 'Brain Surgeon',
        aboutYou: 'Started medical school when I was 16, and finished best in my class. I strive to be the best at what I do, no matter what it is.'
    },
    {
        jobTitle: 'Criminal Lawyer',
        aboutYou: 'I\'m a very hard and dedicated worker. I got used to sleeping at the office since I work so much. I never give up and I don\'t believe in losing!'
    },
    {
        jobTitle: 'Part time Chuck Norris',
        aboutYou: 'Very strong and very capable. I\'m only looking for a part time job since working full time would be too much for any employer. In general I can do anything, so any job will fit.'
    },
    {
        jobTitle: 'Professional Wrestler',
        aboutYou: 'Mess with the best, prepare to die like the rest'
    },
    {
        jobTitle: 'Certified Medical Clown',
        aboutYou: 'Ever since I remember myself I loved making people laugh. Since my mom passed 12 years ago, I decided to do it professionaly and make children laugh to help them overcome their sickness. Children love me.'
    },
    {
        jobTitle: 'Chemical waste producer',
        aboutYou: 'It is what it is...'
    },
    {
        jobTitle: 'Master Illusionist',
        aboutYou: 'I create illusions. I can create illusions on anything and I can customize them for any event you need.'
    }
];

const fakeOnlinePresence = [
    { links: ['https://www.facebook.com/nicholas.cage.3979', 'https://twitter.com/NicolasCagest'] },
    { links: ['https://www.facebook.com/officialchucknorrispage/', 'https://twitter.com/chucknorris', 'https://www.instagram.com/chucknorris/?hl=en'] },
    { links: ['https://www.facebook.com/michaeljackson/', 'https://twitter.com/michaeljackson', 'https://www.instagram.com/michaeljackson/?hl=en'] },
    { links: ['https://twitter.com/StartupLJackson'] },
    { links: ['https://www.facebook.com/stevejobbes.apple', 'https://twitter.com/SJobsLegend'] },
    { links: ['https://www.facebook.com/DonaldTrump/', 'https://twitter.com/realDonaldTrump'] },
    { links: ['https://www.facebook.com/PresidentLincoln/'] },
    { links: ['https://www.instagram.com/alberteinstein/?hl=en'] },
    { links: ['https://twitter.com/KimKardashian', 'https://www.facebook.com/KimKardashian/'] }
];

const fakeWorkExperience = [
    {
        companyName: 'Facebook',
        companyWebsite: 'http://www.facebook.com',
        jobTitle: 'Head of recycling',
        period: {},
        summary: 'As the head of recycling, I designed and implemented many new ways to recycle the waste of all the facebook workers and turning it into renewable energy.',
        bullets: ['Implemented a system to recycle aluminum', 'Recycled all human waste']
    },
];

const fakeEducation = [
    {
        school: 'Carnegie Watermelon',
        degree: 'B.A.',
        major: 'Philosophy',
        period: {},
        summary: 'I\'m a philosopher, or as my dad calls it - "a professional BS-er". I like what I do, and what I do likes me. If that doesn\'t make any sense to you, then you need to study philosophy to understand.',
        bullets: ['Cum Laude', 'Average score of 99.9 on exams']
    },{
        school: 'U.I.T. Universal Institute of Technology',
        degree: 'Masters',
        major: 'Physics',
        period: {},
        summary: 'Studied physics at the universal institute of technology. I finished a full Masters degree in only two months. I know that\'s hard to believe but it\'s totally true, I swear.'
    }
];

const fakeProjects = [
    {
        projectName: 'SHA-256 Brute-force hack hardware chip',
        role: 'Lead designer and programmer of the project.',
        website: 'http://HackedSHA256HashCryptofunction.com',
        period: {},
        summary: 'YES! I have hacked the SHA256 algorithm using a piece of hardware I designed and built. This hacks the SHA256 algorithm in only a few seconds, it\'s truly amazing! It was also pretty easy to do, so I have no idea how no one succeeded doing this in the past already. I guess I\'m surrounded by idiots.',
        bullets: ['Fully programmed in C & Assembly', 'Chip design using AutoDesk tools', 'Supervised the manufacturing process in Shenzhen']
    },{
        projectName: 'A revolutionary waste disposal device on wheels',
        role: 'Head industrial designer',
        website: 'http://www.RevolutionizedWasteDisposal.com',
        period: {},
        summary: 'I was part of a team that engineered an amazing device that carries waste, and mobilizes it to the main waste facility in the area. It has the capacity to carry a few tons of waste, and reaches speeds of 90mph easily.',
        bullets: ['Designed and built in a single weekend', 'Won many awards for design and innovation']
    }
];

const fakeSkills = [
    ['Autodidact', 'Highly Motivated', 'Very Thorough', 'Well Educated'],
    ['Versatile', 'Valedictory', 'Valiant', 'Vagrant'],
    ['Charming', 'Calm', 'Calculated', 'Cavalier', 'Catalytic'],
    ['Machiavellian', 'Marvellous', 'Masculine', 'Mature', 'Meticulous'],
    ['Naive', 'Natural', 'Nonchalant', 'Noble', 'Nourishing'],
    ['Tactful', 'Tantalizing', 'Tedious', 'Thorough', 'Thirsty', 'Thoughtful', 'Thrilled'],
    ['Able', 'Abnormal', 'Accepting', 'Affectionate', 'Analytical', 'Argumentative', 'Assertive'],
    ['Passionate', 'Peaceful', 'Philanthropic', 'Pleasing', 'Polite', 'Persistent'],
    ['Obedient', 'Opinionated', 'Outgoing', 'Organized', 'Open']
];

// TODO: fill this out!
const fakeContactInfo = [];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomData(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

module.exports = {

    getFakeName() { return getRandomData(fakeNames); },
    getFakeGeneralDetails() { return getRandomData(fakeGeneralDetails); },
    getFakeWorkExperience() { return getRandomData(fakeWorkExperience); },
    getFakeOnlinePresence() { return getRandomData(fakeOnlinePresence); },
    getFakeEducation() { return getRandomData(fakeEducation); },
    getFakeSkills() { return getRandomData(fakeSkills); },
    getFakeProject() { return getRandomData(fakeProjects); },
    getFakeContactInfo() { return getRandomData(fakeContactInfo); }

};