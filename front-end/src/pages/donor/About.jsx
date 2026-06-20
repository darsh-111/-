import { useTheme } from '../../contexts/ThemeContext';
import { useAdminData } from '../../contexts/AdminDataContext';
import AboutHero from './AboutHero';
import AboutVisionMission from './AboutVisionMission';
import AboutValues from './AboutValues';
import AboutJourney from './AboutJourney';
import AboutTeam from './AboutTeam';
import AboutLegal from './AboutLegal';

function About() {
    const { isDark, language } = useTheme();
    const { state } = useAdminData();
    const aboutUs = state.content?.aboutUs || {};
    const isRtl = language === 'ar';

    return (
        <div className="pb-12">
            <AboutHero isDark={isDark} aboutUs={aboutUs} />
            <div className="max-w-[1200px] mx-auto px-4 md:px-6 -mt-6 relative z-[2]">
                <AboutVisionMission isDark={isDark} aboutUs={aboutUs} />
                <AboutValues isDark={isDark} aboutUs={aboutUs} />
                <AboutJourney isDark={isDark} isRtl={isRtl} />
                <AboutTeam isDark={isDark} />
                <AboutLegal isDark={isDark} />
            </div>
        </div>
    );
}

export default About;
