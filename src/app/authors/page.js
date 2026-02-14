import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { booksData } from '@/data/data';

export default function AuthorsPage() {
    // Group books by author
    const authorsMap = {};

    booksData.forEach(book => {
        if (!authorsMap[book.author]) {
            authorsMap[book.author] = [];
        }
        authorsMap[book.author].push(book);
    });

    const authors = Object.keys(authorsMap).sort();

    return (
        <div className="container">
            <h1 className="section-title" style={{ marginTop: '2rem' }}>Our Authors</h1>

            <div className={styles.authorsList}>
                {authors.map(author => (
                    <div key={author} className={styles.authorSection}>
                        <h2 className={styles.authorName}>{author}</h2>
                        <div className={styles.booksGrid}>
                            {authorsMap[author].map(book => (
                                <Link key={book.id} href={`/books/${book.id}`} className={styles.bookLink}>
                                    <div className={styles.bookCard}>
                                        <div className={styles.imageWrapper}>
                                            {book.coverImage ? (
                                                <Image
                                                    src={book.coverImage}
                                                    alt={book.title}
                                                    width={120}
                                                    height={180}
                                                    className={styles.bookImage}
                                                />
                                            ) : (
                                                <div className={styles.placeholderImage}>No Image</div>
                                            )}
                                        </div>
                                        <span className={styles.bookTitle}>{book.title}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
