import type { SummaryCardModel } from "../../types/inventory";

type SummaryCardProps = SummaryCardModel;

const SummaryCard = ({ title, value, change, tone }: SummaryCardProps) => {
    return (
        <article className={`summary-card tone-${tone}`}>
            <span>{title}</span>
            <strong>{value}</strong>
            <p>{change}</p>
        </article>
    );
};

export default SummaryCard;
