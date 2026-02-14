import Link from 'next/link';
import styles from './Header.module.css';
import CartIcon from './CartIcon';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Link href="/">
                        Mazri Canada
                    </Link>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/books">Books</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/authors">Authors</Link>
                        </li>
                        <li className={styles.navItem}>
                            <CartIcon />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
