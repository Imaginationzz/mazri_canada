import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { booksData } from '@/data/data';

export default function Home() {
  // Get featured books or first 4 books
  const featuredBooks = booksData.filter(book => book.featured).slice(0, 4);
  const displayBooks = featuredBooks.length > 0 ? featuredBooks : booksData.slice(0, 4);

  return (
    <div>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <h1>Unveil the World of Knowledge</h1>
            <p>Discover a curated collection of books that inspire, educate, and entertain.</p>
            <p className={styles.arabicText}>نحن متخصصون في أرقى كتب الفكر العربي المعاصر</p>
            <Link href="/books" className="btn">
              Browse Collection
            </Link>
          </div>
        </div>
      </section>

      <section className={`container ${styles.featuredSection}`}>
        <h2 className="section-title">Featured Books</h2>
        <div className={styles.grid}>
          {displayBooks.map(book => (
            <div key={book.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {book.coverImage ? (
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={200}
                    height={300}
                    className={styles.bookImage}
                  />
                ) : (
                  <div className={styles.placeholderImage}>No Image</div>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3>{book.title}</h3>
                <p className={styles.author}>{book.author}</p>
                <p className={styles.price}>${book.price}</p>
                <Link href={`/books/${book.id}`} className={styles.viewLink}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.centerBtn}>
          <Link href="/books" className="btn btn-secondary">View All Books</Link>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutContent}>
            <h2 className="section-title">About Mazri Canada</h2>
            <p>
              Mazri Canada is dedicated to bringing you the finest selection of literature from around the globe.
              We believe in the power of words to bridge cultures and ignite minds.
              Whether you are looking for contemporary fiction, historical analysis, or children's books,
              we have something for every reader.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
