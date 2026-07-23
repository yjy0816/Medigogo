import type { ReactNode } from "react";

type SectionCardProps = {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
};

const SectionCard = ({ title, description, actions, children }: SectionCardProps) => {
    const hasHeader = Boolean(title || description || actions);

    return (
        <section className="section-card">
            {hasHeader ? (
                <div className="section-card-header">
                    <div>
                        {title ? <h3>{title}</h3> : null}
                        {description ? <p>{description}</p> : null}
                    </div>
                    {actions ? <div className="section-card-actions">{actions}</div> : null}
                </div>
            ) : null}
            <div className="section-card-body">{children}</div>
        </section>
    );
};

export default SectionCard;
