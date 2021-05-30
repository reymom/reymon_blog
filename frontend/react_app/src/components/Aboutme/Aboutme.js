import React from 'react';

import classes from './Aboutme.module.css';

const aboutme = () => {
    document.title = 'Reymon | About me';
    return (
        <div className={classes.Aboutme}>
            <h2>Professional Interests</h2>
            <p>
                Physicist, programmer and enthusiast of technology and knowledge in general.
                Writing makes you learn faster and deeper, so that’s my reason to be here creating this web page. 
                Sharing some of my projects, I want to focus on introducing both for technical and non technical public 
                complex systems, data science, blockchain, and a little bit of physics and maths inside of each of those.
            </p>
            <p>
                I studied Physics at the University of Barcelona. 
                Recently, I have taken a master called <b>Physics of Complex Systems</b>, 
                on which basically we studied the Complex Systems discipline, 
                which has a lot of potential in applying Physics to real world problems such as social, 
                economic and biological dynamics and networks.
                That mostly encodes my intellectual interests.
            </p>
            <h2>Memorization</h2>
            <p>
                I’m passionate about the learning process in general. 
                I could say that one of my principal hobbies is improving my memorization capabilities. 
                I have a set of mnemotechnic exercises integrated on my daily routine, which I develop, test, 
                train and improve myself.
            </p>
            <p>
                What I enjoy the most is the whole process of creating the method and codes and integrating into my daily life. 
                I focus on not only improve my memory but also on how to use it efficiently taking into account 
                my personality and emotions so to get the most of my mind.
                It helps me knowing my mind better, be more creative and task-efficient, 
                improve self-control, concentration and mental flexibility.
            </p>
            <h2>Languages</h2>
            <p>
                I love languages in general, and it is obviously a nice playground to practice learning skills. 
                I consider myself to be very lucky as to grew bilingual, speaking both Spanish and Catalan as a native.
                Like all our generation, I have grown up learning English as well, and recently approved the C1 level 
                (with almost an equivalent C2 grade). Moreover, I’m engaged with the following languages:
            </p>
            <ul>
                <li>
                    <b>German</b>. At the beginning of September, 2019, I set the goal of passing the Goethe-Zertifikat B2 in less than I year, 
                    so I took it the last summer. At present, I continue to learn it with the objective of taking the C1 in the next summer.
                </li>
                <li>
                    <b>Japanese</b>. Since I took the German exam, I began to learn Japanese as well. It is a perfect language to practise 
                    the memorization methods I just mentioned. I am testing and engaging with techniques in order to learn Kanjis, 
                    and I plan to take an exam (I don’t know yet if the JLPT N2 or the N3 one) by the summer as well.
                </li>
                <li>
                As I did two courses in the school of French, after the next summer, it will be my next target and study it again to take the C1 exam.
                </li>
            </ul>
            <h2>Sport</h2>
            <p>
                My big hobby is athletics. I train and compete professionally since I was fourteen, and 
                even today it helps me in many aspects, beyond the feeling of being physically healthy. 
                It has taught me to be patient, to focus on the long run and to work restlessly to achieve something. 
                And most importantly, it has forced me to learn how to organize time efficiently. 
                I also love the feeling involved in competition, the rush of adrenaline and the process of both 
                influencing and taking an advantage of the emotional responses to be the most efficient as possible.
            </p>
        </div>
    );
};

export default aboutme;
