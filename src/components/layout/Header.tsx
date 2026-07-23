type HeaderProps = {
    title: string;
    description: string;
};

const Header = ({ title, description }: HeaderProps) => {
    return (
        <header className="page-header">
            <div>
                <h2>{title}</h2>
                {description ? <p className="page-description">{description}</p> : null}
            </div>
        </header>
    );
};

export default Header;
