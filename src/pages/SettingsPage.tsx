import SectionCard from "../components/common/SectionCard";
import { settingGroups } from "../data/mockData";

const SettingsPage = () => {
    return (
        <div className="page-stack">
            <div className="settings-grid">
                {settingGroups.map((group) => (
                    <SectionCard
                        key={group.title}
                        title={group.title}
                        description={group.description}
                    >
                        <ul className="setting-list">
                            {group.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </SectionCard>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;
