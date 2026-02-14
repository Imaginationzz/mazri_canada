import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { booksData } from '@/data/data';
import AddToCartButton from '@/components/AddToCartButton';

export function generateStaticParams() {
    return booksData.map((book) => ({
        id: book.id.toString(),
    }));
}

export default async function BookDetailPage({ params }) {
    const { id } = await params;
    const book = booksData.find((b) => b.id.toString() === id);

    if (!book) {
        notFound();
    }

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <div className={styles.imageSection}>
                    {book.coverImage ? (
                        <div className={styles.imageContainer}>
                            <Image
                                src={book.coverImage}
                                alt={book.title}
                                fill
                                className={styles.image}
                            />
                        </div>
                    ) : (
                        <div className={styles.placeholderImage}>No Image Available</div>
                    )}
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.header}>
                        <span className={styles.category}>{book.category}</span>
                        <h1 className={styles.title}>{book.title}</h1>
                        <div className={styles.authorSection}>
                            <h2 className={styles.author}>By {book.author}</h2>
                            <span className={styles.arabicLabel}>(بقلم {book.author})</span>
                        </div>
                    </div>

                    <div className={styles.priceSection}>
                        <span className={styles.price}>${book.price}</span>
                        {book.inStock ? (
                            <span className={styles.inStock}>In Stock / متوفر</span>
                        ) : (
                            <span className={styles.outOfStock}>Out of Stock / غير متوفر</span>
                        )}
                    </div>

                    <div className={styles.description}>
                        <h3>Description / الوصف</h3>
                        <p>{book.description || "No description available."}</p>
                    </div>

                    <div className={styles.action}>
                        <AddToCartButton book={book} />
                        <Link href="/books" className={styles.backLink}>
                            &larr; Back to Browse / رجوع
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
